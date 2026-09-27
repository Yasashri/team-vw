// One-time migration of existing public copy into the editable catalog.
const ts = require('typescript')
const fs = require('fs')
const path = require('path')
const catalog = { copy: {}, sections: {} }
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : e.name.endsWith('.tsx') ? [path.join(dir,e.name)] : []) }
const editableProps = new Set(['title','description','intro','eyebrow','placeholder','alt','aria-label','href','src'])
const editableKeys = new Set(['title','text','label','summary','requirements'])
for (const file of [...files('src/pages'), ...files('src/components')]) {
  let source = fs.readFileSync(file, 'utf8')
  const group = path.basename(file,'.tsx')
  // Resolve collections through the live content store.
  const names = []
  source = source.replace(/import \{ ([^}]+) \} from ['"][^'"]*\/data\/[^'"]+['"]\r?\n/g, (_, list) => { names.push(...list.split(',').map(s => s.trim())); return '' })
  if (names.length) {
    source = source.replace(/(export default function [^{]+\{\n?)/, `$1\n  const { ${names.join(', ')} } = useSiteData()\n`)
    if (group === 'LabLife') { source = source.replace(/^const life = .*\r?\n/m, ''); source = source.replace('const { newsItems } = useSiteData()', "const { newsItems } = useSiteData()\n  const life = newsItems.filter((item) => item.category === 'lab-life')") }
    // Changing collections must invalidate memoized filtering.
    if (group === 'People') source = source.replace('}, [query])', '}, [query, people])')
    if (group === 'Publications') source = source.replace('}, [query, year, topic])', '}, [query, year, topic, publications])')
    if (group === 'News') source = source.replace('[year, category])', '[year, category, newsItems])')
  }
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const edits = []; let count = 0, sections = 0
  function add(node, value, label, kind = 'text', jsx = false) {
    const key = `${group}.${String(++count).padStart(3,'0')}`
    catalog.copy[key] = {group, label: `${label}: ${value.slice(0,70)}`, kind, value}
    edits.push({start:node.getStart(tree),end:node.end,text: `${jsx ? '{' : ''}contentText(${JSON.stringify(key)})${jsx ? '}' : ''}`})
  }
  function visit(node) {
    if (ts.isJsxText(node) && node.text.trim()) {
      // Preserve leading/trailing inline whitespace while collapsing source indentation.
      const value = node.text.replace(/\s+/g, ' ')
      const key = `${group}.${String(++count).padStart(3,'0')}`
      catalog.copy[key] = {group,label:`Text: ${value.trim().slice(0,70)}`,kind:'text',value}
      edits.push({start:node.pos,end:node.end,text:`{contentText(${JSON.stringify(key)})}`})
      return
    }
    if (ts.isJsxAttribute(node) && editableProps.has(node.name.getText(tree)) && node.initializer && ts.isStringLiteral(node.initializer) && node.initializer.text) {
      const name = node.name.getText(tree)
      add(node.initializer, node.initializer.text, name, name === 'src' && !node.initializer.text.includes('maps') ? 'image' : name === 'href' || name === 'src' ? 'link' : 'text', true)
      return
    }
    if (ts.isPropertyAssignment(node) && editableKeys.has(node.name.getText(tree))) {
      if (ts.isStringLiteral(node.initializer)) { add(node.initializer,node.initializer.text,node.name.getText(tree)); return }
      if (ts.isArrayLiteralExpression(node.initializer)) for (const child of node.initializer.elements) if (ts.isStringLiteral(child)) add(child,child.text,node.name.getText(tree))
    }
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(tree) === 'section') {
      const key = `${group}.section-${++sections}`
      const title = node.getText(tree).match(/(?:title|eyebrow)="([^"]+)"/)?.[1] || `${group} section ${sections}`
      catalog.sections[key] = title
      edits.push({start:node.openingElement.end-1,end:node.openingElement.end-1,text:` hidden={!sectionVisible(${JSON.stringify(key)})}`})
      edits.push({start:node.closingElement.pos,end:node.closingElement.pos,text:`<ContentGallery sectionId=${JSON.stringify(key)} />`})
    }
    ts.forEachChild(node,visit)
  }
  visit(tree)
  edits.sort((a,b) => b.start-a.start).forEach(edit => { source=source.slice(0,edit.start)+edit.text+source.slice(edit.end) })
  // Module-level display arrays must read current copy on every render.
  const moving = { Header:['primary','peopleLinks'], JoinUs:['opportunities'], Alumni:['filters'], ScientificHero:['nodes'] }[group] || []
  for (const name of moving) {
    const start = source.indexOf(`const ${name} = `) >= 0 ? source.indexOf(`const ${name} = `) : source.indexOf(`const ${name}:`)
    if (start < 0) continue
    const end = source.indexOf('\n]',start)+2
    const block = source.slice(start,end)
    source = source.slice(0,start)+source.slice(end)
    source = source.replace(/(export default function [^{]+\{\n?)/, `$1\n  ${block}\n`)
  }
  const prefix = file.includes(`${path.sep}pages${path.sep}`) ? '../' : '../../'
  const imports = [...(names.length ? ['useSiteData'] : []), ...(count ? ['contentText'] : []), ...(sections ? ['sectionVisible'] : [])]
  if (imports.length) source=`import { ${imports.join(', ')} } from '${prefix}content/store'\n`+source
  if (sections) source=`import ContentGallery from '${prefix}content/ContentGallery'\n`+source
  fs.writeFileSync(file,source)
}
fs.writeFileSync('src/content/catalog.json',JSON.stringify(catalog,null,2)+'\n')
console.log(`Extracted ${Object.keys(catalog.copy).length} text/image fields and ${Object.keys(catalog.sections).length} sections.`)
