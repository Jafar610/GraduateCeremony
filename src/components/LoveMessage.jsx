import { useEffect, useRef, useState } from 'react'
import './LoveMessage.css'
import { soundFX } from '../utils/soundEffects'

const messages = [
  {
    icon: '💌',
    title: 'The First Spark',
    quote: 'From the very first moment I met you, I knew you were someone extraordinarily special.',
    delay: 0,
  },
  {
    icon: '🌸',
    title: 'Watching You Grow',
    quote:
      'Watching you push through long study hours, challenge yourself, and excel has been my greatest privilege.',
    delay: 150,
  },
  {
    icon: '✨',
    title: 'Endless Inspiration',
    quote:
      'You inspire me every single day — your intelligence, your elegance, and your golden heart.',
    delay: 300,
  },
  {
    icon: '❤️',
    title: 'My Forever Choice',
    quote: 'I love you more than words could ever measure, and today I celebrate you with all my heart.',
    delay: 450,
  },
]

function MessageCard({ icon, title, quote, delay, visible }) {
  const [likes, setLikes] = useState(0)

  const handleCardClick = () => {
    soundFX.playHeartPop()
    setLikes((prev) => prev + 1)
  }

  return (
    <div
      className={`msg-card ${visible ? 'msg-card--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleCardClick}
    >
      <div className="msg-header">
        <span className="msg-icon">{icon}</span>
        <span className="msg-card-title">{title}</span>
      </div>
      <p className="msg-quote">&ldquo;{quote}&rdquo;</p>

      <div className="card-footer">
        <span className="card-heart-btn">
          ❤️ <span className="like-count">{likes > 0 ? likes : ''}</span>
        </span>
        <span className="tap-hint">Tap card</span>
      </div>
    </div>
  )
}

export default function LoveMessage() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="love-section" ref={sectionRef} id="love-message">
      <div className="love-inner">
        <p className={`section-eyebrow ${visible ? 'fade-up' : ''}`}>A letter from my heart</p>
        <h2 className={`section-title love-title ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '100ms' }}>
          My Dearest Love 💕
        </h2>
        <div className="divider" />

        <div className="messages-grid">
          {messages.map((m) => (
            <MessageCard key={m.title} {...m} visible={visible} />
          ))}
        </div>

        <div className={`love-closing ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '600ms' }}>
          <div className="closing-seal">💌</div>
          <p className="love-closing-text">
            &ldquo;Every single page of your journey is remarkable, and I am honored to be by your side for every step ahead.&rdquo;
          </p>
          <p className="love-closing-sig">— Forever Yours ❤️</p>
        </div>
      </div>
    </section>
  )
}

