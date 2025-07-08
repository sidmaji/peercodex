'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Profile() {
    const { user } = useAuth()

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
                <p className="text-gray-400">Manage your account and preferences.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName || ''}
                                    className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ''}
                                    disabled
                                    className="w-full bg-dark-400 border border-dark-400 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">Save Changes</button>
                    </div>
                </div>

                <div>
                    <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{user?.displayName || user?.email?.split('@')[0]}</h3>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Member since</span>
                                <span className="text-white">Nov 2024</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Projects</span>
                                <span className="text-white">3</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Forum posts</span>
                                <span className="text-white">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
