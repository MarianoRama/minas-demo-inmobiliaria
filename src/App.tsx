import { DemoBanner } from './components/DemoBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Properties } from './components/Properties'
import { SellRentSection } from './components/SellRentSection'
import { WhatsAppButton } from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <Properties />
        <SellRentSection />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
