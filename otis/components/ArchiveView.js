export default function ArchiveView() {
  return (
    <div className="pt-12 pb-4 flex flex-col items-center">
      {/* SVG illustration: fading card stack */}
      <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
        {/* Back card (faded) */}
        <rect
          x="38" y="32" width="72" height="52" rx="3"
          fill="#f5c518" fillOpacity="0.22"
          stroke="#1a1714" strokeWidth="3" strokeOpacity="0.2"
        />
        {/* Middle card */}
        <rect
          x="26" y="22" width="72" height="52" rx="3"
          fill="#f5c518" fillOpacity="0.5"
          stroke="#1a1714" strokeWidth="3" strokeOpacity="0.45"
        />
        {/* Front card */}
        <rect
          x="14" y="12" width="72" height="52" rx="3"
          fill="#f5c518"
          stroke="#1a1714" strokeWidth="3"
        />
        {/* Content lines on front card */}
        <line x1="24" y1="28" x2="56" y2="28" stroke="#1a1714" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35" />
        <line x1="24" y1="38" x2="66" y2="38" stroke="#1a1714" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.25" />
        <line x1="24" y1="48" x2="60" y2="48" stroke="#1a1714" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.25" />
        {/* Disappearing dots trailing right */}
        <circle cx="100" cy="38" r="3.5" fill="#1a1714" fillOpacity="0.28" />
        <circle cx="114" cy="35" r="2.5" fill="#1a1714" fillOpacity="0.18" />
        <circle cx="126" cy="32" r="1.8" fill="#1a1714" fillOpacity="0.1" />
        <circle cx="103" cy="48" r="2.8" fill="#1a1714" fillOpacity="0.2" />
        <circle cx="116" cy="51" r="2" fill="#1a1714" fillOpacity="0.12" />
      </svg>

      <h2 className="font-sans font-bold text-ink text-2xl mt-6 text-center leading-tight">
        Yesterday&apos;s picks are gone.
      </h2>
      <p className="font-mono text-sm mt-2 text-center" style={{ color: 'rgba(26,23,20,0.55)' }}>
        That&apos;s the point.
      </p>

      {/* Note card */}
      <div
        className="mt-8 bg-white border-[3px] border-ink p-4 w-full"
        style={{ boxShadow: '4px 4px 0 #1a1714' }}
      >
        <p className="font-mono text-xs text-ink leading-relaxed">
          Otis doesn&apos;t keep a catalog. Every pick is made fresh, for today, and then it&apos;s
          gone. If you didn&apos;t listen, that&apos;s okay. Tomorrow there will be three more.
        </p>
      </div>

      <button
        onClick={() => { localStorage.clear(); window.location.reload() }}
        className="mt-12 font-mono text-xs underline"
        style={{ color: 'rgba(26,23,20,0.3)' }}
      >
        reset onboarding
      </button>
    </div>
  )
}
