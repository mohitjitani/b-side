'use client'
import { useState, useEffect } from 'react'
import Onboarding from '../components/Onboarding'
import TodayView from '../components/TodayView'
import RightNowView from '../components/RightNowView'
import ArchiveView from '../components/ArchiveView'

const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'rightnow', label: 'Right Now' },
  { id: 'archive', label: 'Archive' },
]

export default function Page() {
  const [onboarded, setOnboarded] = useState(null)
  const [activeTab, setActiveTab] = useState('today')

  useEffect(() => {
    setOnboarded(localStorage.getItem('otis_onboarded') === 'true')
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('otis_onboarded', 'true')
    setOnboarded(true)
  }

  if (onboarded === null) {
    return <div className="min-h-screen bg-paper" />
  }

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-md mx-auto px-4">
          {activeTab === 'today' && <TodayView />}
          {activeTab === 'rightnow' && <RightNowView />}
          {activeTab === 'archive' && <ArchiveView />}
        </div>
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 bg-white"
        style={{ borderTop: '3px solid #1a1714' }}
      >
        <div className="max-w-md mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-4 font-sans font-semibold text-sm relative flex items-center justify-center"
              style={{ color: activeTab === tab.id ? '#1a1714' : 'rgba(26,23,20,0.38)' }}
            >
              {activeTab === tab.id && (
                <span
                  className="absolute"
                  style={{
                    top: 6,
                    bottom: 6,
                    left: 8,
                    right: 8,
                    borderRadius: 999,
                    backgroundColor: '#f5c518',
                    border: '2px solid #1a1714',
                    zIndex: 0,
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
