'use client'

import { resetPassword, signInWithEmail, signUpWithEmail } from '@/lib/firebase'
import React, { useState } from 'react'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    mode: 'signin' | 'signup'
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showResetPassword, setShowResetPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            if (mode === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match')
                }
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters')
                }

                await signUpWithEmail(formData.email, formData.password, formData.name)
                setSuccess('Account created! Please check your email to verify your account before signing in.')
            } else {
                await signInWithEmail(formData.email, formData.password)
                onClose()
            }
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await resetPassword(formData.email)
            setSuccess('Password reset email sent! Check your inbox.')
            setShowResetPassword(false)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{showResetPassword ? 'Reset Password' : mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                        ×
                    </button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}

                {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}</div>}

                {showResetPassword ? (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your.name@k12.friscoisd.org"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Reset Email'}
                        </button>

                        <button type="button" onClick={() => setShowResetPassword(false)} className="w-full text-blue-600 hover:text-blue-700 transition-colors">
                            Back to Sign In
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your.name@k12.friscoisd.org"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {mode === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                        </button>

                        {mode === 'signin' && (
                            <button type="button" onClick={() => setShowResetPassword(true)} className="w-full text-blue-600 hover:text-blue-700 transition-colors">
                                Forgot Password?
                            </button>
                        )}
                    </form>
                )}

                <p className="text-sm text-gray-500 mt-6 text-center">Only @k12.friscoisd.org emails are allowed</p>
            </div>
        </div>
    )
}

export default AuthModal
