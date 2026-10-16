/* Rosa dos ventos decorativa, inspirada na identidade da Cartografia de Saberes. */
export default function CompassRose({ size = 96, className = '' }) {
  const navy = '#24375c'
  const gold = '#b8863b'
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="78" fill="none" stroke={gold} strokeWidth="5" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={navy} strokeWidth="1.5" />
      {Array.from({ length: 32 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="24"
          x2="100"
          y2={i % 4 === 0 ? 34 : 29}
          stroke={navy}
          strokeWidth="1.2"
          transform={`rotate(${i * 11.25} 100 100)`}
        />
      ))}
      {/* pontas secundárias */}
      {[45, 135, 225, 315].map((r) => (
        <g key={r} transform={`rotate(${r} 100 100)`}>
          <path d="M100 100 L92 100 L100 42 Z" fill={gold} />
          <path d="M100 100 L108 100 L100 42 Z" fill="#8a6326" />
        </g>
      ))}
      {/* pontas principais */}
      {[0, 90, 180, 270].map((r) => (
        <g key={r} transform={`rotate(${r} 100 100)`}>
          <path d="M100 100 L89 100 L100 8 Z" fill={navy} />
          <path d="M100 100 L111 100 L100 8 Z" fill="#3d5686" />
        </g>
      ))}
      <circle cx="100" cy="100" r="15" fill="#f3e3c2" stroke={gold} strokeWidth="4" />
      <circle cx="100" cy="100" r="7" fill="#6b3f22" />
    </svg>
  )
}
