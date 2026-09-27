import ContentGallery from '../content/ContentGallery'
import { contentText, sectionVisible } from '../content/store'
import { ArrowLeft, FlaskConical } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
export default function NotFound() { return <><SEO title={contentText("NotFound.001")} description={contentText("NotFound.002")} path="/404"/><section className="not-found" hidden={!sectionVisible("NotFound.section-1")}><div><FlaskConical/><span className="eyebrow eyebrow-light">{contentText("NotFound.003")}</span><h1>{contentText("NotFound.004")}</h1><p>{contentText("NotFound.005")}</p><Link className="button button-accent" to="/"><ArrowLeft size={17}/>{contentText("NotFound.006")}</Link></div><ContentGallery sectionId="NotFound.section-1" /></section></> }
