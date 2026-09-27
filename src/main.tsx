import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initializeContent } from './content/store'
import './styles/admin.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/responsive.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<div className="route-fallback">Loading website…</div>)
void initializeContent().then(() => root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
))
