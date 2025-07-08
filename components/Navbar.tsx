'use client'

import AuthModal from '@/components/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/lib/firebase'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
    const { user } = useAuth()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <>
            <nav className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-full max-w-4xl mx-auto px-4 md:px-6 z-50">
                <div
                    className={`backdrop-blur-xl border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 shadow-2xl backdrop-saturate-150 transition-all duration-300 ${
                        scrolled ? 'bg-white/90 border-gray-200' : 'bg-white/20 border-white/30'
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">PC</span>
                            </div>
                            <Link href="/" className={`font-semibold text-lg drop-shadow-sm transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                PeerCodex
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <button
                                onClick={() => scrollToSection('features')}
                                className={`transition-colors drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                            >
                                Features
                            </button>
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className={`transition-colors drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                            >
                                How it Works
                            </button>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className={`transition-colors drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`transition-colors drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                            >
                                Contact
                            </button>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-3">
                            {user ? (
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <Link
                                        href="/dashboard"
                                        className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base shadow-lg"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className={`transition-colors hidden md:block drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowSignInModal(true)}
                                        className={`transition-colors px-3 md:px-4 py-2 text-sm md:text-base drop-shadow-sm ${
                                            scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
                                        }`}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setShowSignUpModal(true)}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base shadow-lg"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-1 drop-shadow-sm ${scrolled ? 'text-gray-700' : 'text-white/80'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className={`lg:hidden mt-4 pt-4 border-t transition-colors ${scrolled ? 'border-gray-200' : 'border-white/30'}`}>
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => {
                                        scrollToSection('features')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`transition-colors text-center py-2 drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                >
                                    Features
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection('how-it-works')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`transition-colors text-center py-2 drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                >
                                    How it Works
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection('pricing')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`transition-colors text-center py-2 drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                >
                                    Pricing
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection('contact')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`transition-colors text-center py-2 drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                >
                                    Contact
                                </button>
                                {user && (
                                    <button
                                        onClick={handleSignOut}
                                        className={`transition-colors text-center py-2 drop-shadow-sm ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
                                    >
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <AuthModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} mode="signin" />
            <AuthModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} mode="signup" />
        </>
    )
}

export default Navbar
