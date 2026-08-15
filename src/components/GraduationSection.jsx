import { useEffect, useRef, useState } from 'react'
import './GraduationSection.css'
import { triggerConfetti } from '../utils/confetti'
import { soundFX } from '../utils/soundEffects'

const achievements = [
  { icon: '📚', label: '1,460+ Days of Effort' },
  { icon: '🌟', label: 'Endless Dreams Pursued' },
  { icon: '🎓', label: 'Degree Earned' },
  { icon: '🚀', label: 'Infinite Future Ahead' },
]

export default function GraduationSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCelebrate = (e) => {
    soundFX.playYesChime()
    const rect = e.currentTarget.getBoundingClientRect()
    triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
    setCelebrated(true)
    setTimeout(() => setCelebrated(false), 2000)
  }

  return (
    <section className="grad-section" ref={sectionRef} id="graduation">
      <div className="grad-confetti" aria-hidden="true">
        {['🎊', '✨', '🎉', '⭐', '🌟', '🎊', '✨', '🎉'].map((e, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${8 + i * 12}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${1 + (i % 3) * 0.4}rem`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="grad-inner">
        <div className={`grad-badge ${visible ? 'badge-pop' : ''}`}>
          <span className="grad-badge-icon">🎓</span>
        </div>

        <h2 className={`grad-title ${visible ? 'fade-up' : ''}`}>
          You Did It!
        </h2>
        <p className={`grad-subtitle ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '150ms' }}>
          Congratulations, Official Graduate! 🎉
        </p>
        <div className="divider" />

        <p className={`grad-message ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '250ms' }}>
          All those late night study sessions, the perseverance through tough exams, and the unwavering dedication —
          they all culminate right here in this victorious moment. You faced every obstacle with poise and determination,
          and today the world celebrates what I always knew:
          <strong> you are extraordinary.</strong>
        </p>

        <div className="achievements-row">
          {achievements.map((a, i) => (
            <div
              key={a.label}
              className={`achievement-item ${visible ? 'fade-up' : ''}`}
              style={{ transitionDelay: `${350 + i * 100}ms` }}
            >
              <span className="achievement-icon">{a.icon}</span>
              <span className="achievement-label">{a.label}</span>
            </div>
          ))}
        </div>

        <div className="celebrate-btn-wrap">
          <button
            className={`btn-celebrate ${celebrated ? 'celebrated' : ''}`}
            onClick={handleCelebrate}
          >
            <span className="celebrate-icon">🎓</span>
            <span>{celebrated ? 'WOOHOO! 🎉🎓' : 'Throw Cap &amp; Celebrate! 🎉'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

