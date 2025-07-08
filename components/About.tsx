import React from 'react'

const About: React.FC = () => {
    return (
        <section id="about" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Built for Frisco ISD Students</h2>
                        <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                            PeerCodex was created specifically for the Frisco ISD community. We understand the unique challenges students face and have designed our platform to foster meaningful
                            connections and academic growth.
                        </p>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            Whether you're looking for study partners, project collaborators, or mentorship opportunities, PeerCodex provides a safe and structured environment to connect with your
                            peers.
                        </p>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                                <div className="text-neutral-600">Active Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary-600 mb-2">50+</div>
                                <div className="text-neutral-600">Study Groups</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-accent-600 mb-2">100+</div>
                                <div className="text-neutral-600">Projects Shared</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100 shadow-lg">
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Why Choose PeerCodex?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                    <span className="text-neutral-700">Exclusive to Frisco ISD students</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                                    <span className="text-neutral-700">Safe and moderated environment</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                                    <span className="text-neutral-700">Academic-focused collaboration</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                    <span className="text-neutral-700">Peer-to-peer learning opportunities</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
