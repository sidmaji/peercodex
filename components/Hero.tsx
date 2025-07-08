'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import React, { useState } from 'react'
import AuthModal from './AuthModal'

const Hero: React.FC = () => {
    const { user } = useAuth()
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <>
            <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-1/4 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 md:pt-0">
                    {/* Logo */}
                    <div className="mb-6 md:mb-8 animate-fade-in">
                        <div className="w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
                            <span className="text-white font-bold text-lg md:text-2xl">PC</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 text-white animate-slide-up">PeerCodex</h1>

                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 md:mb-4 animate-slide-up delay-200">
                        Connect, collaborate, and grow with ambitious high school students.
                    </p>

                    <p className="text-sm md:text-lg text-white/70 mb-8 md:mb-12 animate-slide-up delay-300">Projects • Marketplace • Mentoring • Ideas</p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-slide-up delay-500">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <button
                                onClick={() => setShowSignUpModal(true)}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                            >
                                Get Started Today
                            </button>
                        )}

                        <button
                            onClick={() => scrollToSection('features')}
                            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <AuthModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} mode="signup" />
        </>
    )
}

export default Hero
