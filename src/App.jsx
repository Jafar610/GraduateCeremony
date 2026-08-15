import { useState, useEffect, useRef } from 'react'
import './styles/main.css'
import SurprisePage from './components/SurprisePage'
import MainPage from './components/MainPage'
import { soundFX } from './utils/soundEffects'

// Interactive Floating & Sparkle Canvas Background
function InteractiveParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Floating background particles
    const hearts = ['❤️', '💖', '✨', '🌸', '💝', '⭐']
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 14 + Math.random() * 18,
      symbol: hearts[Math.floor(Math.random() * hearts.length)],
      speedY: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: 0.2 + Math.random() * 0.5,
    }))

    // Mouse sparkles trail
    const sparkles = []
    const handleMouseMove = (e) => {
      if (Math.random() < 0.35) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          size: 6 + Math.random() * 12,
          color: Math.random() < 0.5 ? '#ff80aa' : '#f5d98b',
          alpha: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background floating items
      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += p.speedX
        if (p.y < -30) {
          p.y = canvas.height + 30
          p.x = Math.random() * canvas.width
        }

        ctx.globalAlpha = p.opacity
        ctx.font = `${p.size}px sans-serif`
        ctx.fillText(p.symbol, p.x, p.y)
      })

      // Draw mouse trail sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.x += s.vx
        s.y += s.vy
        s.alpha -= 0.03
        if (s.alpha <= 0) {
          sparkles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

function FloatingAudioWidget({ isPlaying, togglePlay }) {
  return (
    <div className="audio-widget" onClick={togglePlay} title={isPlaying ? 'Pause Music' : 'Play Music'}>
      <button className={`audio-btn ${isPlaying ? 'playing' : ''}`}>
        <span className="audio-icon">{isPlaying ? '🎵' : '🔇'}</span>
        <div className="sound-wave">
          <span className="wave-bar bar-1"></span>
          <span className="wave-bar bar-2"></span>
          <span className="wave-bar bar-3"></span>
        </div>
      </button>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('surprise') // 'surprise' | 'main'
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    soundFX.init()
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.volume = 0.35
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const navigateToMain = () => {
    soundFX.playYesChime()
    setIsTransitioning(true)

    // Attempt to start music on YES click
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.35
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }

    setTimeout(() => {
      setPage('main')
      setIsTransitioning(false)
    }, 600)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <InteractiveParticleCanvas />
      <FloatingAudioWidget isPlaying={isPlaying} togglePlay={toggleMusic} />

      {/* Background music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'scale(0.97) translateY(-10px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {page === 'surprise' ? (
          <SurprisePage onYes={navigateToMain} />
        ) : (
          <MainPage />
        )}
      </div>
    </div>
  )
}

export default App

