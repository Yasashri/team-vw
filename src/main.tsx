import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import RouteFallback from './components/ui/RouteFallback'
import { initializeContent } from './content/store'
import './styles/admin.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/responsive.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<RouteFallback />)
const minimumLoadingTime = new Promise<void>((resolve) => window.setTimeout(resolve, 4000))
void Promise.all([initializeContent(), minimumLoadingTime]).then(() => root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
))
