'use client'
import { useState, useEffect, useRef } from 'react'

const GENRES = ['electronic', 'jazz', 'ambient', 'hip-hop', 'post-rock', 'experimental', 'soul', 'UK bass']
const ACCENTS = ['#3d7df5', '#f5614a', '#f5c518']

const FEED_POOL = [
  "Listening to a 2003 Brazilian funk mix on YouTube...",
  "Reading the comments on a Bandcamp release from 2018...",
  "Comparing this to your top tracks from March...",
  "Almost picked this one but it felt too obvious...",
  "The Pitchfork review is wrong. Checking other sources.",
  "4,200 Bandcamp sales in 72 hours. That's unusual.",
  "Your 11pm–1am listening patterns are interesting. Hold on.",
  "Cross-referencing a 2009 Wire magazine list...",
  "Someone in a forum called this 'too challenging.' Good sign.",
  "Scanning last.fm scrobbles from artists you played twice...",
  "This label released three quiet masterpieces. Nobody noticed.",
  "Found a live recording from 2014. Checking if it holds up.",
  "There's a version of this with 40 fewer plays. Using that one.",
  "Running it against your late-night listening window.",
  "Two degrees from something you loved in January.",
  "Following a thread: Detroit → Rotterdam → this.",
  "Checking if the producer has other credits worth noting.",
  "The Resident Advisor score is irrelevant here. Moving on.",
]

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function makeInitialFeed() {
  const now = new Date()
  return [
    { id: 0, text: FEED_POOL[0], accent: '#3d7df5', time: formatTime(now) },
    { id: 1, text: FEED_POOL[1], accent: '#f5c518', time: formatTime(now) },
    { id: 2, text: FEED_POOL[4], accent: '#f5614a', time: formatTime(now) },
    { id: 3, text: FEED_POOL[6], accent: '#3d7df5', time: formatTime(now) },
  ]
}

export default function RightNowView() {
  const [genre] = useState(() => GENRES[Math.floor(Math.random() * GENRES.length)])
  const [minutes, setMinutes] = useState(14)
  const [feed, setFeed] = useState(makeInitialFeed)
  const nextIdRef = useRef(4)
  const poolIdxRef = useRef(7)
  const lastTextRef = useRef('')
  const feedEndRef = useRef(null)

  useEffect(() => {
    const tick = setInterval(() => setMinutes(m => m + 1), 60000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    let timeout
    const schedule = () => {
      timeout = setTimeout(() => {
        let text
        let tries = 0
        do {
          text = FEED_POOL[poolIdxRef.current % FEED_POOL.length]
          poolIdxRef.current++
          tries++
        } while (text === lastTextRef.current && tries < FEED_POOL.length)
        lastTextRef.current = text

        const accent = ACCENTS[Math.floor(Math.random() * ACCENTS.length)]
        const id = nextIdRef.current++
        setFeed(prev => [...prev, { id, text, accent, time: formatTime(new Date()) }])
        schedule()
      }, 3000 + Math.random() * 2000)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [feed])

  return (
    <div className="pt-8 pb-4">
      {/* Status pill */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white border-[3px] border-ink mb-6 fade-up"
        style={{ boxShadow: '4px 4px 0 #1a1714' }}
      >
        <span
          className="w-3 h-3 rounded-full flex-shrink-0 pulse-dot"
          style={{ backgroundColor: '#f5614a' }}
        />
        <span className="font-mono text-xs text-ink">
          Otis is exploring ·{' '}
          <span style={{ color: '#3d7df5' }}>{genre}</span>{' '}
          · {minutes} min deep
        </span>
      </div>

      {/* Live feed */}
      <div className="flex flex-col gap-2">
        {feed.map((entry, i) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 bg-white border-[2px] border-ink px-3 py-2.5 fade-up"
            style={{ animationDelay: i < 4 ? `${i * 0.1}s` : '0s' }}
          >
            <span
              className="flex-shrink-0 rounded-sm"
              style={{
                width: 14,
                height: 14,
                backgroundColor: entry.accent,
                border: '1.5px solid #1a1714',
              }}
            />
            <span className="font-mono text-xs text-ink flex-1 leading-snug">{entry.text}</span>
            <span className="font-mono text-xs flex-shrink-0" style={{ color: 'rgba(26,23,20,0.38)' }}>
              {entry.time}
            </span>
          </div>
        ))}
        <div ref={feedEndRef} />
      </div>

      {/* Footer */}
      <p className="font-mono text-xs text-center mt-8" style={{ color: 'rgba(26,23,20,0.38)' }}>
        Otis runs continuously. You don&apos;t have to be here.
      </p>
    </div>
  )
}
