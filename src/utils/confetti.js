// Lightweight Canvas Confetti Engine

export function triggerConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#ff80aa', '#e75480', '#c9386a', '#d4a853', '#f5d98b', '#ffffff', '#ff6b9d']
  const shapes = ['circle', 'rect', 'heart']

  const particles = Array.from({ length: 90 }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 6 + Math.random() * 12
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
      gravity: 0.25,
    }
  })

  let animationFrame
  const startTime = Date.now()

  function render() {
    const elapsed = Date.now() - startTime
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let alive = false

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.vx *= 0.98
      p.rotation += p.rSpeed
      p.opacity -= 0.012

      if (p.opacity > 0) {
        alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5)
        } else {
          // Heart shape
          ctx.font = `${p.size * 1.5}px sans-serif`
          ctx.fillText('❤️', -p.size / 2, p.size / 2)
        }

        ctx.restore()
      }
    })

    if (alive && elapsed < 3500) {
      animationFrame = requestAnimationFrame(render)
    } else {
      cancelAnimationFrame(animationFrame)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
    }
  }

  render()
}
