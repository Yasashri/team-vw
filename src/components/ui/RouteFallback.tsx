import { contentText } from '../../content/store'
export default function RouteFallback() { return <div className="route-fallback" aria-live="polite"><span className="route-fallback-mark">{contentText("RouteFallback.001")}</span></div> }
