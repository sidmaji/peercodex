'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Dashboard() {
    const { user } = useAuth()

    const stats = [
        { title: 'Active Projects', value: '3', icon: '📂', color: 'bg-blue-500' },
        { title: 'Forum Posts', value: '12', icon: '💬', color: 'bg-green-500' },
        { title: 'Mentoring Sessions', value: '5', icon: '🎓', color: 'bg-purple-500' },
        { title: 'Marketplace Items', value: '2', icon: '🛒', color: 'bg-orange-500' },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0]}!</h1>
                <p className="text-gray-400">Here's what's happening in your academic journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-dark-200 rounded-lg p-6 border border-dark-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>{stat.icon}</div>
                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                        </div>
                        <h3 className="text-gray-300 font-medium">{stat.title}</h3>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-300">You joined the "CS Study Group" forum</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-300">New message from your mentor</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-300">Project "Web App" was updated</span>
                        </div>
                    </div>
                </div>

                <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
                    <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="text-white font-medium">Study Session</h3>
                            <p className="text-gray-400 text-sm">Tomorrow at 3:00 PM</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="text-white font-medium">Mentoring Call</h3>
                            <p className="text-gray-400 text-sm">Friday at 4:30 PM</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-white font-medium">Project Review</h3>
                            <p className="text-gray-400 text-sm">Next Monday at 10:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
