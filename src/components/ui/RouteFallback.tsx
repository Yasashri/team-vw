import { contentText } from '../../content/store'
export default function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-label="Loading website">
      <div className="catalysis-loader" aria-hidden="true">
        <div className="catalysis-loader-atom">
          <svg viewBox="0 0 240 240" fill="none">
            {[0, 60, 120].map((angle, index) => (
              <g key={angle} transform={`rotate(${angle} 120 120)`}>
                <ellipse cx="120" cy="120" rx="103" ry="43" className="catalysis-loader-orbit" />
                <g transform="translate(120 120) scale(1 .4175)">
                  <g className={`catalysis-loader-electron catalysis-loader-electron-${index}`}>
                    <ellipse cx="103" cy="0" rx="5" ry="12" fill="currentColor" />
                  </g>
                </g>
              </g>
            ))}
          </svg>
          <span className="catalysis-loader-core">{contentText('RouteFallback.001')}</span>
        </div>
      </div>
    </div>
  )
}
