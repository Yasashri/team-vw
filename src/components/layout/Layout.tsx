import { contentText } from '../../content/store'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import ScrollToTop from './ScrollToTop'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  return (
    <>
      <a className="skip-link" href={contentText("Layout.001")}>{contentText("Layout.002")}</a>
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <BackToTop />
    </>
  )
}
