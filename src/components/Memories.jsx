import { useEffect, useRef, useState } from 'react'
import './Memories.css'
import { soundFX } from '../utils/soundEffects'

const initialPhotos = [
  {
    id: 1,
    src: '/memory1.png',
    caption: 'A love written in golden sunsets',
    emoji: '🌅',
    likes: 12,
  },
  {
    id: 2,
    src: '/memory2.png',
    caption: 'Walking through our blooming garden',
    emoji: '🌸',
    likes: 19,
  },
  {
    id: 3,
    src: '/memory3.png',
    caption: 'The day you conquered it all',
    emoji: '🎓',
    likes: 28,
  },
  {
    id: 4,
    src: '/memory4.png',
    caption: 'Under a thousand glowing stars',
    emoji: '⭐',
    likes: 15,
  },
  {
    id: 5,
    src: '/memory5.png',
    caption: 'Our favorite moments together',
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
        <p className={`section-eyebrow ${visible ? 'fade-up' : ''}`}>Our Story in Pictures</p>
        <h2 className={`memories-title ${visible ? 'fade-up' : ''}`} style={{ transitionDelay: '100ms' }}>
          Beautiful Memories 🌸
        </h2>
        <p className="memories-subtitle">Click any photo to open full gallery preview</p>
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
                    title="Love this photo"
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
      {activePhotoIdx !== null && (
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
        </div>
      )}
    </section>
  )
}

