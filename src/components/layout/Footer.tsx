import { useSiteData, contentText } from '../../content/store'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {

  const { site } = useSiteData()
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand footer-logo" to="/">{site.logoImage ? <img className="brand-image" src={site.logoImage} alt="" /> : <span className="brand-mark">{contentText("Footer.001")}</span>}<span className="brand-copy"><strong>{contentText("Footer.002")}</strong><small>{contentText("Footer.003")}</small></span></Link>
          <p>{contentText("Footer.004")}</p>
        </div>
        <div><h3>{contentText("Footer.005")}</h3><Link to="/research">{contentText("Footer.006")}</Link><Link to="/people">{contentText("Footer.007")}</Link><Link to="/publications">{contentText("Footer.008")}</Link><Link to="/news">{contentText("Footer.009")}</Link></div>
        <div><h3>{contentText("Footer.010")}</h3><Link to="/join-us#postdoc">{contentText("Footer.011")}</Link><Link to="/join-us#phd">{contentText("Footer.012")}</Link><Link to="/join-us#masters">{contentText("Footer.013")}</Link><Link to="/join-us#internships">{contentText("Footer.014")}</Link></div>
        <div><h3>{contentText("Footer.015")}</h3><a href={`mailto:${site.email}`}><Mail size={14}/>{site.email}</a><a href={site.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={14}/>{contentText("Footer.016")}</a><a href={site.chemistryUrl} target="_blank" rel="noopener noreferrer">{contentText("Footer.017")}<ArrowUpRight size={13}/></a></div>
      </div>
      <div className="shell footer-bottom"><span>{contentText("Footer.018")}{new Date().getFullYear()}{contentText("Footer.019")}</span><span>{contentText("Footer.020")}</span></div>
    </footer>
  )
}
