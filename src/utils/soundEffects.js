// Web Audio API Sound Effects Synthesizer (No external assets required)

class SoundFX {
  constructor() {
    this.ctx = null
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Playful pop/boing when NO button dodges
  playDodgeSound() {
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime

      // Pitch glide up quickly (boing effect)
      osc.frequency.setValueAtTime(300 + Math.random() * 200, now)
      osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 300, now + 0.12)

      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.12)
    } catch {
      // Ignore audio context errors if blocked
    }
  }

  // Soft romantic chime on YES click
  playYesChime() {
    try {
      this.init()
      if (!this.ctx) return

      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6 (Arpeggio)
      const now = this.ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)

        gain.gain.setValueAtTime(0.2, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.6)
      })
    } catch {
      // Ignore audio errors
    }
  }

  // Heart pop sound
  playHeartPop() {
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime

      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundFX()
