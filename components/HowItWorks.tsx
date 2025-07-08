import React from 'react'

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: '1',
            title: 'Sign Up',
            description: 'Create your account and set up your profile with your interests and academic level.',
        },
        {
            number: '2',
            title: 'Connect',
            description: 'Find peers with similar interests or complementary skills for your projects and goals.',
        },
        {
            number: '3',
            title: 'Collaborate',
            description: 'Work together on projects, share resources, and grow your network of ambitious peers.',
        },
    ]

    return (
        <section id="how-it-works" className="py-16 md:py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">How It Works</h2>
                    <p className="text-lg md:text-xl text-gray-600">Get started in three simple steps</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <span className="text-white font-bold text-lg md:text-2xl">{step.number}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
