import { useEffect, useRef, useState } from 'react'
import './GraduationSection.css'
import { triggerConfetti } from '../utils/confetti'
import { soundFX } from '../utils/soundEffects'



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
          ተሳካልሽ! 🎓✨
        </h2>
        <p className={`grad-subtitle ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '150ms' }}>
          የፋሽን ዲዛይን ምሩቅ በመሆንሽ እንኳን ደስ አለሽ!
        </p>
        <div className="divider" />

        <p className={`grad-message ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '250ms' }}>
          ፈጠራሽ፣ ትጋትሽ እና ምናብሽ ወደዚህ ውብ ቀን አድርሰውሻል። በቀጣይ ጉዞሽ የት እንደምትደርሺ ለማየት በጣም ጓጉቻለሁ።
        </p>



        <div className="celebrate-btn-wrap">
          <button
            className={`btn-celebrate ${celebrated ? 'celebrated' : ''}`}
            onClick={handleCelebrate}
          >
            <span className="celebrate-icon">🎓</span>
            <span>{celebrated ? 'እንኳን ደስ አለሽ የኔዋ ቆንጅዬ ንግስት!!! 🎉🎓' : 'ቆብሽን ጥለሽ አክብሪ! 🎉'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

