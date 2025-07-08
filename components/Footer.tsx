import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4 block">
                            PeerCodex
                        </Link>
                        <p className="text-neutral-300 mb-6 max-w-md">Connecting Frisco ISD students through collaborative learning and peer support.</p>
                        <p className="text-sm text-neutral-500">© 2024 PeerCodex. Made for Frisco ISD students.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="text-neutral-300 hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                                    Community Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
