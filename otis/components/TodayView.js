'use client'
import { useState } from 'react'
import OtisCharacter from './OtisCharacter'

const PICKS = [
  {
    id: 1,
    badge: '#1',
    track: 'Lone',
    artist: 'Floating Points',
    album: 'Promises',
    year: 2021,
    accent: '#3d7df5',
    query: 'Floating Points Promises',
    foundVia: 'Found via a late-night NTS session, 2:17am Wednesday',
    reason:
      "You've had Caribou's Suddenly on repeat since February — the way it folds warmth into abstraction. Sam Shepherd is doing something parallel here: jazz musicians recorded in a single room, no overdubs, processed until the piano sounds like it's breathing underwater. The Pharoah Sanders collab on this record made it a moment, but this track is the quiet one nobody talks about. That's usually the right one.",
  },
  {
    id: 2,
    badge: '#2',
    track: 'No Weapon',
    artist: 'Burial',
    album: 'Kindred EP',
    year: 2012,
    accent: '#f5614a',
    query: 'Burial Kindred EP',
    foundVia: 'Found via a Resident Advisor mix, 4am Tuesday',
    reason:
      "Your listening logs show a pattern: 11pm to 1am, you reach for something with negative space. This is Burial at his most architectural — the sub-bass enters around the 3-minute mark and the room changes. It came out between Untrue and his recent stuff, when he was still anonymous, and it has a grief in it that his later work talks around rather than through. I almost picked something more recent. I didn't.",
  },
  {
    id: 3,
    badge: '#3',
    track: 'Volta',
    artist: 'Arca',
    album: 'Arca',
    year: 2017,
    accent: '#f5c518',
    query: 'Arca Volta 2017',
    foundVia: 'Found while cross-referencing your Björk plays, Monday evening',
    reason:
      "You played Björk's Vulnicura four times last month — that's not background listening, that's processing something. Arca produced that record, and this is from her debut self-titled, where she's speaking for herself. The track starts like a field recording and becomes something devotional by the end. The production on your recent favorites sits in similar emotional territory: things that feel both mechanical and tender at the same time.",
  },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
}

function getDateLine() {
  return new Date()
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    .toUpperCase()
}

function ArtworkTile({ accent }) {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        flexShrink: 0,
        position: 'relative',
        backgroundColor: accent,
        border: '2px solid #1a1714',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 52%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: '#1a1714',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: accent,
          }}
        />
      </div>
    </div>
  )
}

function PickCard({ pick, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="bg-white border-[3px] border-ink overflow-hidden fade-up"
      style={{ boxShadow: '4px 4px 0 #1a1714', animationDelay: `${index * 0.14}s` }}
    >
      {/* Accent band */}
      <div style={{ height: 8, backgroundColor: pick.accent }} />

      <div className="p-4">
        {/* Header: artwork + info + badge */}
        <div className="flex gap-3 items-start mb-4">
          <ArtworkTile accent={pick.accent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-sans font-bold text-ink text-base leading-tight">{pick.track}</p>
                <p className="font-sans text-sm text-ink mt-0.5" style={{ opacity: 0.75 }}>
                  {pick.artist}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'rgba(26,23,20,0.55)' }}>
                  {pick.album} · {pick.year}
                </p>
              </div>
              <span
                className="font-mono font-bold text-xs flex-shrink-0 px-2 py-1 border-[2px] border-ink"
                style={{ backgroundColor: pick.accent }}
              >
                {pick.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Reason text */}
        <div className="mb-3">
          <p
            className="font-mono text-xs text-ink leading-relaxed"
            style={
              expanded
                ? {}
                : {
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }
            }
          >
            {pick.reason}
          </p>
          <button
            onClick={() => setExpanded(e => !e)}
            className="font-mono text-xs mt-1 underline"
            style={{ color: 'rgba(26,23,20,0.5)' }}
          >
            {expanded ? 'read less' : 'read more'}
          </button>
        </div>

        {/* Found via */}
        <p className="font-mono text-xs mb-4" style={{ color: 'rgba(26,23,20,0.45)' }}>
          ◷ {pick.foundVia}
        </p>

        {/* Listen button */}
        <a
          href={`https://open.spotify.com/search/${encodeURIComponent(pick.query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-center font-sans font-bold text-sm border-[3px] border-ink text-ink"
          style={{ backgroundColor: pick.accent, boxShadow: '3px 3px 0 #1a1714' }}
        >
          Listen on Spotify
        </a>
      </div>
    </div>
  )
}

export default function TodayView() {
  return (
    <div className="pt-8 pb-4">
      {/* Character + speech bubble */}
      <div className="flex flex-col items-center mb-8">
        <OtisCharacter size={80} speaking />

        {/* Speech bubble */}
        <div className="relative mt-5 w-full max-w-xs">
          {/* Tail outer (black) */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '12px solid #1a1714',
            }}
          />
          {/* Tail inner (white) */}
          <div
            style={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '10px solid white',
              zIndex: 1,
            }}
          />
          <div
            className="bg-white border-[3px] border-ink px-4 py-3 text-center"
            style={{ boxShadow: '4px 4px 0 #1a1714', position: 'relative', zIndex: 0 }}
          >
            <p className="font-sans font-semibold text-ink text-sm">
              {getGreeting()}. I found{' '}
              <span style={{ color: '#f5614a' }}>3 things</span>{' '}
              for you today.
            </p>
          </div>
        </div>

        <p className="font-mono text-xs mt-3 tracking-widest" style={{ color: 'rgba(26,23,20,0.45)' }}>
          {getDateLine()}
        </p>
      </div>

      {/* Pick cards */}
      <div className="flex flex-col gap-6">
        {PICKS.map((pick, i) => (
          <PickCard key={pick.id} pick={pick} index={i} />
        ))}
      </div>

      {/* Footer */}
      <p className="font-mono text-xs text-center mt-8" style={{ color: 'rgba(26,23,20,0.38)' }}>
        These picks disappear at midnight. That&apos;s the point.
      </p>
    </div>
  )
}
