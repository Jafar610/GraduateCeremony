import { useState, useRef, useCallback, useEffect } from 'react'
import './SurprisePage.css'
import { soundFX } from '../utils/soundEffects'
import { triggerConfetti } from '../utils/confetti'

const noMessages = [
  'አይ 😅',
  'እርግጠኛ ነሽ? 😏',
  "በእውነት አይ ልትይ ነው? 😂",
  'ሞከርሽ... ግን አይሆንም! 😌❤️',
  "እሺ... አዎ ልትይ እንደምትፈልጊ አውቃለሁ 😘",
  'የ\'አይ\' ቁልፉ ተስፋ ቆርጧል 😂❤️',
]

export default function SurprisePage({ onYes }) {
  const [noPos, setNoPos] = useState({ x: null, y: null })
  const [hoverCount, setHoverCount] = useState(0)
  const [noLabel, setNoLabel] = useState(noMessages[0])
  const [yesHovered, setYesHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    // Entrance animation
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const getRandomPos = useCallback(() => {
    const margin = 90
    const vw = window.innerWidth - margin * 2
    const vh = window.innerHeight - margin * 2
    return {
      x: margin + Math.random() * vw,
      y: margin + Math.random() * vh,
    }
  }, [])

  const handleNoHover = useCallback((e) => {
    soundFX.playDodgeSound()
    const newCount = hoverCount + 1
    setHoverCount(newCount)
    setNoPos(getRandomPos())
    const msgIndex = Math.min(newCount, noMessages.length - 1)
    setNoLabel(noMessages[msgIndex])
  }, [hoverCount, getRandomPos])

  const handleYesClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
    onYes()
  }

  // YES button grows as hoverCount increases!
  const yesScale = Math.min(1 + hoverCount * 0.08, 1.45)

  return (
    <div className="surprise-page">
      {/* Decorative ambient glowing spheres */}
      <div className="deco-circle deco-1" />
      <div className="deco-circle deco-2" />
      <div className="deco-circle deco-3" />

      <div className={`surprise-card ${visible ? 'visible' : ''}`}>
        {/* Glowing badge */}
        <div className="card-badge-header">
          <span className="sparkle-tag">✨ ሚስጥራዊ ስጦታ</span>
        </div>

        {/* Top emoji pulse */}
        <div className="heart-icon-wrapper">
          <div className="heart-icon" aria-hidden="true">💝</div>
          <div className="heart-glow-ring" />
        </div>

        <h1 className="surprise-title">
          ለትንሽ አስገራሚ ስጦታ ዝግጁ ነሽ?
          <span className="title-emoji"> 🥰</span>
        </h1>

        <p className="surprise-subtitle">
          ለአንቺ ብቻ የሆነ አንድ ነገር አዘጋጅቻለሁ...
        </p>

        <div className="buttons-container">
          {/* YES button */}
          <button
            id="yes-btn"
            className={`btn btn-yes ${yesHovered ? 'btn-yes--hovered' : ''}`}
            onClick={handleYesClick}
            onMouseEnter={() => setYesHovered(true)}
            onMouseLeave={() => setYesHovered(false)}
            style={{
              transform: `scale(${yesScale})`,
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="btn-icon">❤️</span>
            አዎ!
          </button>

          {/* NO button – moves away on hover */}
          <button
            id="no-btn"
            ref={btnRef}
            className="btn btn-no"
            style={
              noPos.x !== null
                ? {
                    position: 'fixed',
                    left: noPos.x,
                    top: noPos.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                  }
                : {}
            }
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
          >
            {noLabel}
          </button>
        </div>

        {hoverCount > 0 && (
          <div className="hover-hint-container">
            <p className="hover-hint">
              {hoverCount < 3
                ? `ትንሽ ቀረሽ... ሞክሪ! 😄 ('አዎ' እያደገ ነው! ❤️)`
                : `ማምለጥ አይቻልም! ፍቅር ሁልጊዜ ያሸንፋል 💕`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

