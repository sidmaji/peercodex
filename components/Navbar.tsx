'use client'

import AuthModal from '@/components/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/lib/firebase'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar: React.FC = () => {
    const { user } = useAuth()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <>
            <nav className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-full max-w-4xl mx-auto px-4 md:px-6 z-50">
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 shadow-2xl backdrop-saturate-150">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">PC</span>
                            </div>
                            <Link href="/" className="text-gray-900 font-semibold text-lg drop-shadow-sm">
                                PeerCodex
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link href="#features" className="text-gray-800 hover:text-gray-900 transition-colors drop-shadow-sm">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-gray-800 hover:text-gray-900 transition-colors drop-shadow-sm">
                                How it Works
                            </Link>
                            <Link href="#pricing" className="text-gray-800 hover:text-gray-900 transition-colors drop-shadow-sm">
                                Pricing
                            </Link>
                            <Link href="#contact" className="text-gray-800 hover:text-gray-900 transition-colors drop-shadow-sm">
                                Contact
                            </Link>
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
                                    <button onClick={handleSignOut} className="text-gray-800 hover:text-gray-900 transition-colors hidden md:block drop-shadow-sm">
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowSignInModal(true)}
                                        className="text-gray-800 hover:text-gray-900 transition-colors px-3 md:px-4 py-2 text-sm md:text-base drop-shadow-sm"
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
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-800 p-1 drop-shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden mt-4 pt-4 border-t border-white/30">
                            <div className="flex flex-col space-y-3">
                                <Link href="#features" className="text-gray-800 hover:text-gray-900 transition-colors text-center py-2 drop-shadow-sm">
                                    Features
                                </Link>
                                <Link href="#how-it-works" className="text-gray-800 hover:text-gray-900 transition-colors text-center py-2 drop-shadow-sm">
                                    How it Works
                                </Link>
                                <Link href="#pricing" className="text-gray-800 hover:text-gray-900 transition-colors text-center py-2 drop-shadow-sm">
                                    Pricing
                                </Link>
                                <Link href="#contact" className="text-gray-800 hover:text-gray-900 transition-colors text-center py-2 drop-shadow-sm">
                                    Contact
                                </Link>
                                {user && (
                                    <button onClick={handleSignOut} className="text-gray-800 hover:text-gray-900 transition-colors text-center py-2 drop-shadow-sm">
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
