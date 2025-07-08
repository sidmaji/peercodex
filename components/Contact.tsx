'use client'

import React, { useState } from 'react'
import AuthModal from './AuthModal'

const Contact: React.FC = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    return (
        <>
            <section id="contact" className="py-16 md:py-24 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">Have questions about PeerCodex? We'd love to hear from you!</p>

                    <div className="grid sm:grid-cols-2 gap-8 max-w-lg mx-auto mb-12">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-white text-xl">📧</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                            <p className="text-gray-300 text-sm">hello@peercodex.com</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-white text-xl">💬</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Join our Discord</h3>
                            <p className="text-gray-300 text-sm">Coming Soon!</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey Today</h3>
                        <button
                            onClick={() => setShowSignUpModal(true)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            <AuthModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} mode="signup" />
        </>
    )
}

export default Contact
