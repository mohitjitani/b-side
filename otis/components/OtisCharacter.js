'use client'
import { useState, useEffect } from 'react'

export default function OtisCharacter({ size = 80, speaking = false }) {
  const [eyesClosed, setEyesClosed] = useState(false)

  useEffect(() => {
    let timeout
    const scheduleBlink = () => {
      const delay = 2200 + Math.random() * 2800
      timeout = setTimeout(() => {
        setEyesClosed(true)
        setTimeout(() => {
          setEyesClosed(false)
          scheduleBlink()
        }, 130)
      }, delay)
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  const eyeRY = eyesClosed ? 0.6 : 5.2

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block', overflow: 'visible' }}
      className="blob-pulse"
    >
      {/* Main blob body */}
      <path
        d="M50,9 C73,5 91,20 92,43 C93,66 79,87 59,92 C43,97 21,90 11,73 C1,57 5,31 18,19 C28,9 39,11 50,9 Z"
        fill="#f5c518"
        stroke="#1a1714"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Left cheek */}
      <circle cx="26" cy="57" r="7" fill="#f5614a" opacity="0.6" />
      {/* Right cheek */}
      <circle cx="74" cy="57" r="7" fill="#f5614a" opacity="0.6" />

      {/* Left eye */}
      <ellipse cx="36" cy="43" rx="5.5" ry={eyeRY} fill="#1a1714" />
      {!eyesClosed && <circle cx="38.5" cy="40.5" r="1.8" fill="white" />}

      {/* Right eye */}
      <ellipse cx="64" cy="43" rx="5.5" ry={eyeRY} fill="#1a1714" />
      {!eyesClosed && <circle cx="66.5" cy="40.5" r="1.8" fill="white" />}

      {/* Mouth */}
      {speaking ? (
        <ellipse cx="50" cy="69" rx="7" ry="4.5" fill="#1a1714" />
      ) : (
        <path
          d="M 42,66 Q 50,73 58,66"
          stroke="#1a1714"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
