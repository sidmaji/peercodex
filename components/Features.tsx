import React from 'react'

const Features: React.FC = () => {
    const features = [
        {
            title: 'Project Collaboration',
            description: 'Find like-minded teammates for academic projects, research initiatives, and startup ideas. Build something amazing together.',
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
        },
        {
            title: 'Student Marketplace',
            description: 'Buy and sell textbooks, study notes, and school supplies in a trusted peer-to-peer marketplace designed for students.',
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2H3m4 10v6a1 1 0 001 1h1a1 1 0 001-1v-6m-4 0h6" />
                </svg>
            ),
        },
        {
            title: 'Peer Mentoring',
            description: 'Get help from upperclassmen or offer your expertise to younger students. Learn and teach based on your class levels.',
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
        },
    ]

    return (
        <section id="features" className="py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Powerful Features</h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to connect, collaborate, and succeed with your peers</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
