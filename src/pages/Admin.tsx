import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { optimizeImage } from '../content/images'
import { contentCatalog, getContent, getDefaults, getStartupWarning, saveContent, templates, validateContent, type WebsiteContent } from '../content/store'

type Value = string | number | boolean | Value[] | { [key: string]: Value }
type FieldPath = (string | number)[]
type FieldProps = { value: Value; path: FieldPath; label: string; change: (path: FieldPath, value: Value) => void; report: (message: string) => void }
const title = (value: string) => value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase())
const categoryOptions: Record<string,string[]> = { people: ['pi','postdoc','phd','masters','undergraduate','administration'], alumni: ['phd','masters','undergraduate'], newsItems: ['publication','award','conference','team','recruitment','lab-life'] }

function Field({ value, path, label, change, report }: FieldProps) {
  const [uploading, setUploading] = useState(false)
  const uploadInProgress = useRef(false)
  const key = String(path.at(-1))
  const parent = String(path.at(-2))
  const isCopy = path[0] === 'copy'
  const meta = isCopy ? contentCatalog.copy[key as keyof typeof contentCatalog.copy] : undefined
  const image = /^(image|src|logoImage|favicon|socialImage)$/.test(key) || parent === 'images' || meta?.kind === 'image'
  const upload = async (files: FileList | null, multiple = false) => {
    if (!files?.length || uploadInProgress.current) return
    uploadInProgress.current = true
    setUploading(true)
    try {
      const selected = Array.from(files)
      const converted: Awaited<ReturnType<typeof optimizeImage>>[] = []
      // Limit conversion to one decoded bitmap at a time for large galleries.
      for (const [index,file] of selected.entries()) {
        report(`Converting image ${index + 1} of ${selected.length} to WebP…`)
        converted.push(await optimizeImage(file))
      }
      const images = converted.map(item => item.src)
      change(path, multiple ? [...(value as Value[]), ...images.map(src => path[0] === 'sections' ? {src,alt:'',caption:''} : src)] : images[0])
      const before = converted.reduce((total,item) => total + item.originalBytes,0)
      const after = converted.reduce((total,item) => total + item.optimizedBytes,0)
      const saving = before > after ? ` ${Math.round((1 - after / before) * 100)}% smaller.` : ''
      report(`${images.length} still WebP image${images.length > 1 ? 's' : ''} added (${Math.ceil(after / 1024)} KB).${saving} Save changes to keep them.`)
    } catch (error) { report(error instanceof Error ? error.message : 'Image upload failed.') }
    finally { uploadInProgress.current = false; setUploading(false) }
  }
  if (Array.isArray(value)) {
    const add = () => {
      let next: Value = ''
      if (path.length === 1 && path[0] in templates) {
        next = structuredClone(templates[path[0] as keyof typeof templates]) as unknown as Value
        const record = next as Record<string,Value>
        const id = `new-${crypto.randomUUID().slice(0,8)}`
        if ('id' in record) record.id = id
        if ('slug' in record) record.slug = id
      } else if (key === 'links') next = {label:'',url:''}
      else if (key === 'images' && path[0] === 'sections') next = {src:'',alt:'',caption:''}
      change(path,[...value,next])
    }
    return <fieldset className="admin-array" disabled={uploading}><legend>{label} <small>{value.length} items</small></legend>
      {value.map((item,index) => <details className="admin-item" key={index} open={typeof item !== 'object'}><summary>{typeof item === 'object' && !Array.isArray(item) ? String(item.name || item.title || item.caption || item.label || `Item ${index+1}`) : `${label} ${index+1}`}</summary><div className="admin-item-content"><div className="admin-item-actions"><button type="button" disabled={index===0} onClick={() => {const next=[...value]; [next[index-1],next[index]]=[next[index],next[index-1]]; change(path,next)}} aria-label={`Move ${label} ${index+1} up`}>Move up</button><button type="button" disabled={index===value.length-1} onClick={() => {const next=[...value]; [next[index+1],next[index]]=[next[index],next[index+1]]; change(path,next)}}>Move down</button><button type="button" className="admin-danger" onClick={() => change(path,value.filter((_,i)=>i!==index))}>Remove</button></div><Field value={item} path={[...path,index]} label={`${label} ${index+1}`} change={change} report={report}/></div></details>)}
      <div className="admin-inline"><button type="button" onClick={add}>+ Add {path.length===1 ? 'record' : 'item'}</button>{key === 'images' && <label className="admin-upload">Upload multiple images<input type="file" disabled={uploading} multiple accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={event => {void upload(event.target.files,true); event.target.value=''}}/></label>}</div>
    </fieldset>
  }
  if (typeof value === 'object' && value !== null) return <div className="admin-fields">{Object.entries(value).map(([field,child]) => <Field key={field} value={child} path={[...path,field]} label={title(field)} change={change} report={report}/>)}</div>
  if (typeof value === 'boolean') return <label className="admin-checkbox"><input type="checkbox" checked={value} onChange={event => change(path,event.target.checked)}/>{label}</label>
  if (key === 'category' && categoryOptions[String(path[0])]) return <label className="admin-field">{label}<select value={String(value)} onChange={event => change(path,event.target.value)}>{categoryOptions[String(path[0])].map(option=><option key={option}>{option}</option>)}</select></label>
  if (image) return <fieldset className="admin-field admin-image-field" disabled={uploading}><label>{label}<input value={String(value).startsWith('data:') ? '' : String(value)} placeholder={String(value).startsWith('data:') ? 'Uploaded image saved in draft' : '/images/photo.jpg or https://…'} onChange={event=>change(path,event.target.value)}/></label>{value && <img className="admin-image-preview" src={String(value)} alt="Selected image preview"/>}<div className="admin-inline"><label className="admin-upload">Choose image<input type="file" disabled={uploading} accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={event=>{void upload(event.target.files); event.target.value=''}}/></label><button type="button" onClick={()=>change(path,'')}>Clear image</button></div><small>Automatic WebP · up to 2400 px · still images</small></fieldset>
  return <label className="admin-field">{label}{typeof value === 'number' ? <input type="number" value={value} onChange={event=>change(path,event.target.valueAsNumber)}/> : path[0]==='appearance' ? <input type="color" value={String(value)} onChange={event=>change(path,event.target.value)}/> : <textarea rows={String(value).length > 150 ? 4 : 2} value={String(value)} onChange={event=>change(path,event.target.value)} spellCheck={!/id|slug|url|href/i.test(key)}/>}</label>
}

const tabs = [ ['copy','Page text & images'], ['sections','Sections & galleries'], ['people','People'], ['alumni','Alumni'], ['researchAreas','Research'], ['publications','Publications'], ['newsItems','News & lab life'], ['site','Site & contact'], ['appearance','Appearance'], ['categoryLabels','People labels'], ['newsCategoryLabels','News labels'], ['backups','Backups & publishing'] ]

export default function Admin() {
  const [draft,setDraft] = useState<WebsiteContent>(()=>structuredClone(getContent()))
  const [tab,setTab] = useState('copy')
  const [group,setGroup] = useState('Home')
  const [query,setQuery] = useState('')
  const [dirty,setDirty] = useState(false)
  const [busy,setBusy] = useState(false)
  const [message,setMessage] = useState(getStartupWarning())
  const importRef = useRef<HTMLInputElement>(null)
  useEffect(()=>{const handler=(event:BeforeUnloadEvent)=>{if(dirty){event.preventDefault(); event.returnValue=''}};window.addEventListener('beforeunload',handler);return()=>window.removeEventListener('beforeunload',handler)},[dirty])
  useEffect(()=>{document.title='Website Admin | Team VW'},[])
  const change = (path:FieldPath,value:Value) => {setDraft(current=>{const next=structuredClone(current);let target=next as unknown as Record<string,unknown>;for(const part of path.slice(0,-1)) target=target[part] as Record<string,unknown>;target[path.at(-1)!]=value;return next});setDirty(true);setMessage('')}
  const save = async () => {setBusy(true);try{const saved=await saveContent(draft);setDraft(structuredClone(saved));setDirty(false);setMessage('Saved to this browser. The website now uses your changes.')}catch(error){setMessage(error instanceof Error ? error.message : 'Save failed. Your draft is still here.')}finally{setBusy(false)}}
  const download = () => {try{validateContent(draft);const url=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='website-content.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('Backup exported, including uploaded images.')}catch(error){setMessage(error instanceof Error ? error.message : 'Export failed.')}}
  const importFile = async (file?:File) => {if(!file)return;try{if(file.size>100*1024*1024)throw new Error('Backup must be smaller than 100 MB.');const value:unknown=JSON.parse(await file.text());validateContent(value);setDraft(structuredClone(value));setDirty(true);setMessage('Backup loaded into the draft. Review it, then save to apply.')}catch(error){setMessage(error instanceof Error ? error.message : 'Invalid backup.')}}
  const groups=Array.from(new Set(Object.values(contentCatalog.copy).map(item=>item.group))).sort()
  return <div className="admin-shell"><aside className="admin-sidebar"><Link to="/" className="admin-brand" onClick={event=>{if(dirty&&!window.confirm('Leave without saving this draft?'))event.preventDefault()}}>VW <span>Website studio</span></Link><p>Content, images, and settings</p><nav aria-label="Admin sections">{tabs.map(([id,label])=><button key={id} className={tab===id?'active':''} onClick={()=>{setTab(id);setQuery('')}}>{label}</button>)}</nav><small>Local browser database<br/>No API or server account</small></aside><main className="admin-main"><header className="admin-toolbar"><div><span className="admin-eyebrow">TEAM VW / ADMIN</span><h1>{tabs.find(([id])=>id===tab)?.[1]}</h1><p>{dirty?'Unsaved draft':draft.savedAt ? `Saved ${new Date(draft.savedAt).toLocaleString()}` : 'Using original website content'}</p></div><div className="admin-inline"><a href="/" target="_blank" rel="noreferrer">View website ↗</a><button disabled={!dirty||busy} onClick={()=>{if(window.confirm('Discard unsaved changes?')){setDraft(structuredClone(getContent()));setDirty(false);setMessage('Draft discarded.')}}}>Discard draft</button><button className="admin-save" disabled={!dirty||busy} onClick={()=>void save()}>{busy?'Saving…':'Save changes'}</button></div></header>
      <div className="admin-notice">Changes are stored in this browser on this website address. To update the hosted site for everyone, export the content file and rebuild with it. This local editor has no server login.</div>
      {message&&<div className="admin-message" role="status">{message}</div>}
      <div className="admin-panel">
      {tab==='copy' ? <><div className="admin-filters"><label>Page or component<select value={group} onChange={event=>setGroup(event.target.value)}>{groups.map(item=><option key={item}>{item}</option>)}</select></label><label>Find text<input type="search" placeholder="Search this page…" value={query} onChange={event=>setQuery(event.target.value)}/></label></div><p>Edit headings, descriptions, buttons, metadata, links, and existing images. Shared components apply across pages.</p>{Object.entries(contentCatalog.copy).filter(([key,meta])=>meta.group===group&&`${meta.label} ${draft.copy[key]}`.toLowerCase().includes(query.toLowerCase())).map(([key,meta])=><Field key={key} path={['copy',key]} value={draft.copy[key]} label={meta.label} change={change} report={setMessage}/>)}</> : tab==='sections' ? <><p>Hide or show sections and add ordered image galleries with captions and alternative text. Shared component sections apply wherever that component appears.</p>{Object.entries(draft.sections).map(([key,section])=><details className="admin-item" key={key}><summary>{section.label} <small>{key} · {section.visible?'Visible':'Hidden'} · {section.images.length} images</small></summary><div className="admin-item-content"><Field path={['sections',key]} value={section as unknown as Value} label={section.label} change={change} report={setMessage}/></div></details>)}</> : tab==='backups' ? <div className="admin-backups"><h2>Keep a portable backup</h2><p>Export includes all text, records, settings, and uploaded images. Clearing browser data removes local edits, so keep a backup somewhere safe.</p><div className="admin-inline"><button onClick={download}>Export content file</button><button onClick={()=>importRef.current?.click()}>Import backup</button><input ref={importRef} hidden type="file" accept="application/json,.json" onChange={event=>{void importFile(event.target.files?.[0]);event.target.value=''}}/></div><h2>Publish without an API</h2><ol><li>Save and export your content file.</li><li>Replace <code>public/website-content.json</code> in the project with the exported file.</li><li>Run <code>npm run build</code> and deploy the updated build.</li></ol><p>New visitors load the published file. A browser with its own saved edits keeps those local edits; import the published file there to replace them.</p><h2>Restore the original content</h2><p>This replaces your draft only. Save to apply, or discard to cancel.</p><button className="admin-danger" onClick={()=>{if(window.confirm('Replace this draft with the original website content?')){setDraft(getDefaults());setDirty(true);setMessage('Original content loaded into draft. Save to apply.')}}}>Restore original content</button></div> : <Field path={[tab]} value={draft[tab as keyof WebsiteContent] as unknown as Value} label={tabs.find(([id])=>id===tab)?.[1]??tab} change={change} report={setMessage}/>}
      </div>
    </main></div>
}
