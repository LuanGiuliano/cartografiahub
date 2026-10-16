/* Ícones SVG inline (sem dependências externas) no traço "cartográfico". */

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M15.5 8.5 13.4 13.4 8.5 15.5l2.1-4.9z" fill="currentColor" fillOpacity=".18" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5" strokeDasharray="2 2.2" />
    </>
  ),
  ear: (
    <>
      <path d="M6 8.5a6 6 0 1 1 12 0c0 3.5-3 4.5-3 7.5a3.5 3.5 0 0 1-6.6 1.6" />
      <path d="M15 8.5a3 3 0 0 0-6 0" />
      <path d="M12 11.5v.5" />
    </>
  ),
  scroll: (
    <>
      <path d="M8 21h11a2 2 0 0 0 2-2v-1H10v1a2 2 0 0 1-4 0V5a2 2 0 0 0-2-2" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4a2 2 0 0 1 2 2" />
      <path d="M10 8h6M10 12h6" />
    </>
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" fill="currentColor" fillOpacity=".18" />
      <circle cx="12" cy="13" r="4" />
      <circle cx="18" cy="10" r=".6" fill="currentColor" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4L15 6.5z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" fill="currentColor" fillOpacity=".18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
}

export default function Icon({ name, size = 28, ...rest }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...rest}>
      {paths[name]}
    </svg>
  )
}
