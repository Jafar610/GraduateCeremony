import { useEffect, useRef, useState } from 'react'
import './FinalMessage.css'
import { triggerConfetti } from '../utils/confetti'
import { soundFX } from '../utils/soundEffects'

export default function FinalMessage() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [heartPop, setHeartPop] = useState(false)
  const [loveCount, setLoveCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => setHeartPop(true), 800)
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSendLove = (e) => {
    soundFX.playYesChime()
    setLoveCount((prev) => prev + 1)
    const rect = e.currentTarget.getBoundingClientRect()
    triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <section className="final-section" ref={sectionRef} id="final-message">
      {/* Starfield */}
      <div className="starfield" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              fontSize: `${0.6 + Math.random() * 0.8}rem`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="final-inner">
        <div className={`final-heart-big ${heartPop ? 'heart-pop' : ''}`} aria-hidden="true">
          ❤️
        </div>

        <h2 className={`final-title ${visible ? 'fade-up' : ''}`}>
          አንድ ተጨማሪ ነገር... ❤️
        </h2>

        <div className="final-divider" />

        <blockquote className={`final-quote ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '200ms' }}>
          <p>
            &ldquo;ልነግርሽ የምችላቸው ብዙ ነገሮች አሉ፤ ግን ሶስት ቃላት ብቻ ስሜቴን ለመግለጽ በቂ አይደሉም።&rdquo;
          </p>
        </blockquote>

        <p className={`final-body ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '350ms' }}>
          ለአለም አንቺ ምርቃቷን ያጠናቀቀች እና ተስፋ ያላት የፋሽን ዲዛይነር ነሽ።<br /><br />
          ለእኔ ግን...<br />
          አለሜን የበለጠ ውብ የምታደርጊው ሰው ነሽ።<br /><br />
          በአንቺ እኮራለሁ። በአንቺ አምናለሁ። ህልሞችሽን ስትከተዪ ሁሌም ከጎንሽ እሆናለሁ።<br /><br />
          ከሁሉም በላይ... እወድሻለሁ። ❤️<br /><br />
          እንኳን ደስ አለሽ የኔዋ ቆንጅዬ። 🎓❤️<br />
          ውብ ጉዞሽ አሁን ጀምሯል...
        </p>

        <div className={`final-signature ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '500ms' }}>
          <p className="sig-text">የኔዋ ቆንጅዬ ንግስት ❤️</p>
          <p className="sig-forever">ሁሌም እወድሻለው! ❤️</p>
        </div>

        <div className="send-love-wrap">
          <button className="btn-send-love" onClick={handleSendLove}>
            <span>እዚህ ጫኚ ❤️</span>
            {loveCount > 0 && <span className="love-badge">{loveCount}</span>}
          </button>
        </div>

        <div className={`final-hearts-row ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '650ms' }}>
          {['❤️', '💕', '💗', '💖', '💝'].map((h, i) => (
            <span
              key={i}
              className="final-heart-row-item"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

