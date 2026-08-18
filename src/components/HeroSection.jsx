import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const heroPhrases = [
  'እንኳን ደስ አለሽ የኔዋ! 🎓❤️',
  'በአንቺ በጣም እኮራለሁ',
  'ህልሞችሽን እውን አድርገሻል',
  'ለዘላለም አብረን እንሆናለን',
]

function RotatingTypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = heroPhrases[phraseIdx]
    let timer

    if (!isDeleting) {
      if (displayed.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length + 1))
        }, 75)
      } else {
        // Pause at full text before deleting
        timer = setTimeout(() => setIsDeleting(true), 2500)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length - 1))
        }, 40)
      } else {
        setIsDeleting(false)
        setPhraseIdx((prev) => (prev + 1) % heroPhrases.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayed, isDeleting, phraseIdx])

  return (
    <span>
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  )
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero-section" ref={sectionRef} id="hero">
      {/* Background image overlay */}
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className={`hero-content ${visible ? 'visible' : ''}`}>
        <div className="hero-cap-wrapper">
          <div className="hero-cap" aria-hidden="true">🎓</div>
          <div className="hero-cap-glow" />
        </div>

        <h1 className="hero-title">
          <RotatingTypingText />
          <span className="hero-emoji-heart"> ❤️</span>
        </h1>

        <div className="hero-milestones">
          <span className="milestone-pill">🎓 የ2026 ምሩቅ</span>
          <span className="milestone-pill">💖 እስከ ዘላለም እና ከዚያም በላይ</span>
          <span className="milestone-pill">✨ ሙሉ በሙሉ የተወደድሽ</span>
        </div>

        <p className="hero-tagline">
          አውቃለሁ ትንሽ ረፍዶ ሊሆን ይችላል ገን አረሳሁትም እሺ፤ እንኳን ድስ አለሽ የኔዋ ኮንጅዬ ንግስት።
        </p>

        <a href="#love-message" className="hero-scroll-hint" aria-label="ወደ ታች ውረጅ">
          <span className="scroll-arrow">↓</span>
        </a>
      </div>
    </section>
  )
}

