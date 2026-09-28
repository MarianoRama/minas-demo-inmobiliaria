import { AdminApp } from './admin/AdminApp'
import { DemoBanner } from './components/DemoBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LogoStrip } from './components/LogoStrip'
import { Properties } from './components/Properties'
import { SellRentSection } from './components/SellRentSection'
import { Testimonios } from './components/Testimonios'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Zonas } from './components/Zonas'
import { DatosProvider } from './data/store'
import { useHashRoute } from './hooks/useHashRoute'

function Sitio() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <Properties />
        <Zonas />
        <Testimonios />
        <SellRentSection />
        <LogoStrip />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  const ruta = useHashRoute()
  const esAdmin = ruta.startsWith('/admin')

  return <DatosProvider>{esAdmin ? <AdminApp /> : <Sitio />}</DatosProvider>
}

export default App
