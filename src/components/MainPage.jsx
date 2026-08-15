import HeroSection from './HeroSection'
import LoveMessage from './LoveMessage'
import GraduationSection from './GraduationSection'
import Memories from './Memories'
import FinalMessage from './FinalMessage'
import './MainPage.css'

export default function MainPage() {
  return (
    <main className="main-page" id="main-content">
      <HeroSection />
      <LoveMessage />
      <GraduationSection />
      <Memories />
      <FinalMessage />
    </main>
  )
}
