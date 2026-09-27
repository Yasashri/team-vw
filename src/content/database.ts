const DB_NAME = 'team-vw-content'
const STORE = 'website'

export function openContentDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE)
    request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); resolve(request.result) }
    request.onerror = () => reject(request.error ?? new Error('Browser database is unavailable.'))
    request.onblocked = () => reject(new Error('Close other website tabs and try again.'))
  })
}

export async function readContent(): Promise<unknown> {
  const db = await openContentDatabase()
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const request = tx.objectStore(STORE).get('content')
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } finally { db.close() }
}

export async function writeContent(value: { savedAt: string }, expectedSavedAt: string): Promise<void> {
  const db = await openContentDatabase()
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      const store = tx.objectStore(STORE)
      const request = store.get('content')
      let conflict = false
      request.onsuccess = () => {
        if (request.result && request.result.savedAt !== expectedSavedAt) { conflict = true; tx.abort(); return }
        store.put(value, 'content')
      }
      tx.oncomplete = () => resolve()
      tx.onabort = () => reject(new Error(conflict ? 'Content changed in another tab. Export your draft, then reload before saving.' : 'Could not save. Browser storage may be full or unavailable. Export a backup and try again.'))
      tx.onerror = () => reject(tx.error ?? new Error('Could not save to the browser database.'))
    })
  } finally { db.close() }
}
