import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Memories.css'
import { soundFX } from '../utils/soundEffects'
import img1 from "../assets/img/img1.jpg"
import img2 from "../assets/img/img2.jpg"
import img3 from "../assets/img/img3.jpg"
import img4 from "../assets/img/img4.jpg"
import img5 from "../assets/img/img5.jpg"
import img6 from "../assets/img/img6.jpg"

const initialPhotos = [
  {
    id: 1,
    src: img1,
    caption: 'ከአንቺ ያየሁት ደስ የሚል ፍገግታ፤ ሁሌም ደስተኛ ሁኚልኝ። ❤️',
    emoji: '🌅',
    likes: 100,
  },
  {
    id: 2,
    src: img2,
    caption: 'ቤተሰብ ሲኮራብሽ ማየት እንዴት ደስ ይላል።',
    emoji: '🌸',
    likes: 19,
  },
  {
    id: 3,
    src: img3,
    caption: 'የስኬትሽ ቀን',
    emoji: '🎓',
    likes: 28,
  },
  {
    id: 4,
    src: img4,
    caption: 'ከ ቤተሰብ ጋር ደስ የሚል ጊዜ ❤️',
    emoji: '⭐',
    likes: 15,
  },
  {
    id: 5,
    src: img5,
    caption: 'የደስታ ጊዜያት',
    emoji: '🥂',
    likes: 24,
  },
  {
    id: 6,
    src: img6,
    caption: 'የደስታ ጊዜያት',
    emoji: '🥂',
    likes: 24,
  },
]

export default function Memories() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [photos, setPhotos] = useState(initialPhotos)
  const [activePhotoIdx, setActivePhotoIdx] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhotoIdx(null)
      if (e.key === 'ArrowRight' && activePhotoIdx !== null) {
        setActivePhotoIdx((prev) => (prev + 1) % photos.length)
      }
      if (e.key === 'ArrowLeft' && activePhotoIdx !== null) {
        setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoIdx, photos.length])

  const handleLike = (e, id) => {
    e.stopPropagation()
    soundFX.playHeartPop()
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    )
  }

  return (
    <section className="memories-section" ref={sectionRef} id="memories">
      <div className="memories-inner">
        <p className={`section-eyebrow ${visible ? 'fade-up' : ''}`}>ታሪካችን በምስል</p>
        <h2 className={`memories-title ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '100ms' }}>
          የእኛ ትንንሽ ትዝታዎች ❤️
        </h2>
        <p className="memories-subtitle">ሙሉ ምስሉን ለማየት ማንኛውንም ፎቶ ጫኚ</p>
        <div className="divider" />

        <div className="memories-grid">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`memory-card ${visible ? 'memory-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={() => setActivePhotoIdx(i)}
            >
              <div className="memory-img-wrap">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="memory-img"
                  loading="lazy"
                />
                <div className="memory-overlay">
                  <span className="memory-emoji">{photo.emoji}</span>
                  <p className="memory-caption">{photo.caption}</p>

                  <button
                    className="memory-like-btn"
                    onClick={(e) => handleLike(e, photo.id)}
                    title="ይህን ፎቶ ወደድኩት"
                  >
                    ❤️ {photo.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhotoIdx !== null && createPortal(
        <div className="lightbox-overlay" onClick={() => setActivePhotoIdx(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActivePhotoIdx(null)}>
              ✕
            </button>

            <button
              className="lightbox-nav nav-prev"
              onClick={() => setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)}
            >
              ❮
            </button>

            <div className="lightbox-body">
              <img
                src={photos[activePhotoIdx].src}
                alt={photos[activePhotoIdx].caption}
                className="lightbox-img"
              />
              <div className="lightbox-caption-bar">
                <span className="lightbox-emoji">{photos[activePhotoIdx].emoji}</span>
                <p className="lightbox-text">{photos[activePhotoIdx].caption}</p>

                <button
                  className="lightbox-heart-btn"
                  onClick={(e) => handleLike(e, photos[activePhotoIdx].id)}
                >
                  ❤️ {photos[activePhotoIdx].likes}
                </button>
              </div>
            </div>

            <button
              className="lightbox-nav nav-next"
              onClick={() => setActivePhotoIdx((prev) => (prev + 1) % photos.length)}
            >
              ❯
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

