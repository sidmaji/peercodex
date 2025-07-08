import Contact from '@/components/Contact'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Pricing from '@/components/Pricing'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <Contact />
        </main>
    )
}
