const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename,'utf8')
  const output = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText
  module._compile(output,filename)
}
const {getDefaults,validateContent,safeUrl}=require('../src/content/store.ts')
const defaults=getDefaults()
validateContent(defaults)
assert.ok(Object.keys(defaults.copy).length > 300)
assert.ok(Object.keys(defaults.sections).length > 20)
const restored=JSON.parse(JSON.stringify(defaults))
restored.copy['Home.005']='Edited title'
restored.sections['Home.section-2'].images=[{src:'/one.jpg',alt:'One',caption:'First'},{src:'/two.jpg',alt:'Two',caption:'Second'}]
validateContent(restored)
assert.equal(getDefaults().sections['Home.section-2'].images.length,0,'Defaults must not mutate')
for(const mutate of [
  doc=>{doc.people[1].id=doc.people[0].id},
  doc=>{doc.people[0].slug='../admin'},
  doc=>{doc.people[0].category='invalid'},
  doc=>{doc.newsItems[0].year=NaN},
  doc=>{doc.newsItems[0].images=['data:image/svg+xml;base64,AAAA']},
  doc=>{doc.copy['Home.003']='javascript:alert(1)'},
  doc=>{doc.people[0].links=[{label:'Bad',url:'javascript:alert(1)'}]},
  doc=>{doc.sections['Home.section-2'].images=[{src:'/photo.png'}]},
  doc=>{delete doc.copy['Home.003']},
  doc=>{doc.appearance.navy='transparent'},
]){const doc=getDefaults();mutate(doc);assert.throws(()=>validateContent(doc))}
assert.ok(safeUrl('data:image/png;base64,AAAA',true))
assert.ok(safeUrl('/images/picture.svg',true))
assert.equal(safeUrl('//untrusted.example/image.png',true),false)
assert.equal(safeUrl('java\nscript:alert(1)'),false)
console.log('Content validation: defaults, portable galleries, schema errors, duplicate IDs, categories, years, unsafe URLs, and image formats passed.')
