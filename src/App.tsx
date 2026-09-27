import { lazy, Suspense, useEffect } from 'react'
import { useContent } from './content/store'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RouteFallback from './components/ui/RouteFallback'

const Home = lazy(() => import('./pages/Home'))
const Research = lazy(() => import('./pages/Research'))
const People = lazy(() => import('./pages/People'))
const PersonProfile = lazy(() => import('./pages/PersonProfile'))
const Alumni = lazy(() => import('./pages/Alumni'))
const LabLife = lazy(() => import('./pages/LabLife'))
const Publications = lazy(() => import('./pages/Publications'))
const News = lazy(() => import('./pages/News'))
const NewsArticle = lazy(() => import('./pages/NewsArticle'))
const JoinUs = lazy(() => import('./pages/JoinUs'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Admin = lazy(() => import('./pages/Admin'))

export default function App() {
  const content = useContent()
  useEffect(() => {
    document.documentElement.style.setProperty('--navy', content.appearance.navy)
    document.documentElement.style.setProperty('--cyan', content.appearance.accent)
    document.documentElement.style.setProperty('--solar', content.appearance.gold)
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (icon) icon.href = content.site.favicon
  }, [content])
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route element={<Layout key={content.savedAt} />}>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/alumni" element={<Alumni />} />
          <Route path="/people/:slug" element={<PersonProfile />} />
          <Route path="/lab-life" element={<LabLife />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
