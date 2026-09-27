import { contentText, useContent } from '../../content/store'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'




export default function Header() {
  const { site } = useContent()

  const peopleLinks = [
  { label: contentText("Header.006"), to: '/people' },
  { label: contentText("Header.007"), to: '/people/alumni' },
  { label: contentText("Header.008"), to: '/lab-life' },
]

  const primary = [
  { label: contentText("Header.001"), to: '/' },
  { label: contentText("Header.002"), to: '/research' },
  { label: contentText("Header.003"), to: '/publications' },
  { label: contentText("Header.004"), to: '/news' },
  { label: contentText("Header.005"), to: '/contact' },
]
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [peopleOpen, setPeopleOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const home = location.pathname === '/'

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28)
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => { setMobileOpen(false); setPeopleOpen(false) }, [location.pathname])

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setPeopleOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const solid = scrolled || !home || mobileOpen

  return (
    <header className={`site-header ${solid ? 'header-solid' : 'header-transparent'}`}>
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label={contentText("Header.009")}>
          {site.logoImage ? <img className="brand-image" src={site.logoImage} alt="" /> : <span className="brand-mark">{contentText("Header.010")}</span>}
          <span className="brand-copy"><strong>{contentText("Header.011")}</strong><small>{contentText("Header.012")}</small></span>
        </Link>

        <nav className="desktop-nav" aria-label={contentText("Header.013")}>
          {primary.slice(0, 2).map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
          <div className="people-menu" ref={dropdownRef}>
            <button className={`nav-dropdown-trigger ${location.pathname.startsWith('/people') || location.pathname === '/lab-life' ? 'active' : ''}`} onClick={() => setPeopleOpen((value) => !value)} aria-expanded={peopleOpen} aria-haspopup="menu">{contentText("Header.014")}<ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {peopleOpen && (
                <motion.div className="nav-dropdown" role="menu" initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .16 }}>
                  {peopleLinks.map((item) => <Link role="menuitem" key={item.to} to={item.to}>{item.label}</Link>)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {primary.slice(2).map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
          <Link className="nav-cta" to="/join-us">{contentText("Header.015")}</Link>
        </nav>

        <button className="menu-button" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav className="mobile-nav" aria-label={contentText("Header.016")} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .24 }}>
            <div className="shell mobile-nav-inner">
              {primary.slice(0, 2).map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
              <span className="mobile-nav-label">{contentText("Header.017")}</span>
              {peopleLinks.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
              {primary.slice(2).map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
              <Link className="button button-accent" to="/join-us">{contentText("Header.018")}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
