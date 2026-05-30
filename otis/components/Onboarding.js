'use client'
import { useState, useEffect } from 'react'
import OtisCharacter from './OtisCharacter'

const STEPS = [
  {
    lines: ["Hi. I'm Otis.", "I listen to a lot of music.", "Probably too much."],
    button: 'Continue',
    buttonColor: '#3d7df5',
  },
  {
    lines: [
      "Every day I find three things for you.",
      "Not playlists. Not trending. Three specific things I think you'll like, with a reason.",
      "At midnight, they're gone.",
    ],
    button: 'That sounds right',
    buttonColor: '#f5614a',
  },
  {
    lines: [
      "Last thing.",
      "I need to know what you've been listening to. It's how I know what to look for.",
      "Connect Spotify and I'll do the rest.",
    ],
    button: null,
    buttonColor: '#f5c518',
  },
]

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [linesVisible, setLinesVisible] = useState([])
  const [spotifyConnected, setSpotifyConnected] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  const currentStep = STEPS[step]

  useEffect(() => {
    setLinesVisible([])
    const timeouts = currentStep.lines.map((_, i) =>
      setTimeout(() => setLinesVisible(prev => [...prev, i]), 300 + i * 550)
    )
    return () => timeouts.forEach(clearTimeout)
  }, [step, currentStep.lines])

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  const handleSpotifyConnect = () => {
    setSpotifyConnected(true)
    setTimeout(() => {
      setFadingOut(true)
      setTimeout(onComplete, 650)
    }, 900)
  }

  return (
    <div
      className="min-h-screen bg-paper flex flex-col items-center justify-center px-6"
      style={{ transition: 'opacity 0.65s ease-out', opacity: fadingOut ? 0 : 1 }}
    >
      <div className="max-w-sm w-full flex flex-col items-center gap-8">

        {/* Step indicator */}
        <div className="flex gap-2 items-center">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full border-2 border-ink transition-all duration-350"
              style={{
                width: i === step ? 32 : 12,
                backgroundColor: i === step ? '#f5c518' : 'transparent',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Character */}
        <OtisCharacter size={96} speaking={false} />

        {/* Lines */}
        <div className="flex flex-col items-center gap-4 w-full text-center" style={{ minHeight: 128 }}>
          {currentStep.lines.map((line, i) => (
            <p
              key={`${step}-${i}`}
              className="font-mono text-lg text-ink leading-snug"
              style={{
                opacity: linesVisible.includes(i) ? 1 : 0,
                transform: linesVisible.includes(i) ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 w-full">
          {step < 2 ? (
            <button
              onClick={handleNext}
              className="w-full py-4 font-sans font-bold text-base text-ink border-[3px] border-ink"
              style={{
                backgroundColor: currentStep.buttonColor,
                boxShadow: '4px 4px 0 #1a1714',
              }}
            >
              {currentStep.button}
            </button>
          ) : (
            <>
              <button
                onClick={handleSpotifyConnect}
                className="w-full py-4 font-sans font-bold text-base text-ink border-[3px] border-ink"
                style={{
                  backgroundColor: spotifyConnected ? '#22c55e' : '#f5614a',
                  boxShadow: spotifyConnected ? 'none' : '4px 4px 0 #1a1714',
                  transform: spotifyConnected ? 'translate(4px, 4px)' : 'none',
                  transition: 'background-color 0.3s ease, box-shadow 0.2s ease, transform 0.2s ease',
                }}
              >
                {spotifyConnected ? 'Connected ✓' : 'Connect Spotify'}
              </button>
              <p className="font-mono text-xs text-center" style={{ color: 'rgba(26,23,20,0.5)' }}>
                Your data stays local. I don&apos;t share anything.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
