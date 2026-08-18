import { useEffect, useRef, useState } from 'react'
import './LoveMessage.css'
import { soundFX } from '../utils/soundEffects'

const messages = [
  {
    icon: '😊',
    title: 'ፈገግታሽ',
    quote: 'ፈገግታሽ ተራ ቀንን እንኳን ልዩ እንዲሆን ያደርገዋል።',
    delay: 0,
  },
  {
    icon: '✨',
    title: 'ጥንካሬሽ',
    quote: 'ምንም እንኳን ነገሮች አስቸጋሪ ቢሆኑም ወደፊት መሄድሽን አትተዪም።',
    delay: 150,
  },
  {
    icon: '❤️',
    title: 'ልብሽ',
    quote: 'ደግነትሽ ከውበትሽ በላይ የሚያስደንቀኝ ነው።',
    delay: 300,
  },
  {
    icon: '🌙',
    title: 'ህልሞችሽ',
    quote: 'ህልሞችሽን ለማሳካት ስትጥሪ ማየት ደስ ይለኛል።',
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
        <span className="tap-hint">ካርዱን ንኪው</span>
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
        <p className={`section-eyebrow ${visible ? 'fade-up' : ''}`}>ከልቤ የምነግርሽ ትንሽ ነገር 💌</p>
        <h2 className={`section-title love-title ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '100ms' }}>
          እኔ ዘንድ ለምን ልዩ እንደሆንሽ ታውቂያለሽ? ❤️
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
            &ldquo;የህይወትሽን እያንዳንዱን ጉዞ ከ አንቺ ጋ ባሳልፍ ደስ ይለኝ ነበር፤ በቀጣይ ጉዞሽ ሁሉ በሃሳብ ከጎንሽ ነኝ።&rdquo;
          </p>
          <p className="love-closing-sig">— የአንቺ የ ወደፊት ባል ❤️</p>
        </div>
      </div>
    </section>
  )
}

