'use client'

import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/lib/firebase'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar: React.FC = () => {
    const pathname = usePathname()
    const { user } = useAuth()

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Marketplace', href: '/marketplace', icon: '🛒' },
        { name: 'Forum', href: '/forum', icon: '💬' },
        { name: 'Mentoring', href: '/mentoring', icon: '🎓' },
        { name: 'Profile', href: '/profile', icon: '👤' },
    ]

    return (
        <div className="flex flex-col h-full bg-dark-200 border-r border-dark-300">
            <div className="flex items-center justify-center h-16 border-b border-dark-300">
                <Link href="/" className="text-xl font-bold text-white">
                    PeerCodex
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive ? 'bg-accent-100 text-white' : 'text-gray-300 hover:bg-dark-300 hover:text-white'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-dark-300">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors">
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Sidebar
