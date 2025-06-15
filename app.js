class PeerCodexApp {
    constructor() {
        this.appContainer = document.getElementById('app')
        this.currentRoute = ''
        this.init()
    }

    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]') || e.target.closest('[data-route]')) {
                e.preventDefault()
                const link = e.target.closest('[data-route]')
                const route = link.getAttribute('data-route')
                this.navigate(route)
            }
        })

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const route = e.state?.route || 'dashboard'
            this.loadRoute(route, false)
        })

        // Load initial route
        const initialRoute = window.location.pathname.slice(1) || 'dashboard'
        this.navigate(initialRoute, true)
    }

    navigate(route, replaceState = false) {
        if (replaceState) {
            window.history.replaceState({ route }, '', `/${route}`)
        } else {
            window.history.pushState({ route }, '', `/${route}`)
        }
        this.loadRoute(route)
    }

    loadRoute(route, updateHistory = true) {
        // Update active navigation
        this.updateActiveNav(route)

        // Close mobile menu
        document.getElementById('drawer-toggle').checked = false

        // Load route content with animation
        this.appContainer.style.opacity = '0'
        this.appContainer.style.transform = 'translateY(10px)'

        setTimeout(() => {
            this.appContainer.innerHTML = this.getRouteContent(route)
            this.appContainer.style.opacity = '1'
            this.appContainer.style.transform = 'translateY(0)'
            this.currentRoute = route
        }, 150)
    }

    updateActiveNav(route) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.remove('active')
        })

        // Add active class to current route
        const activeLink = document.querySelector(`[data-route="${route}"]`)
        if (activeLink) {
            activeLink.classList.add('active')
        }
    }

    getRouteContent(route) {
        switch (route) {
            case 'dashboard':
                return this.getDashboardContent()
            case 'marketplace':
                return this.getMarketplaceContent()
            case 'forum':
                return this.getForumContent()
            case 'mentor':
                return this.getMentorContent()
            case 'profile':
                return this.getProfileContent()
            default:
                return this.getDashboardContent()
        }
    }

    getDashboardContent() {
        return `
            <div class="fade-in">
                <!-- Welcome Banner -->
                <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8 border border-primary/20">
                    <h1 class="text-3xl font-bold text-base-content mb-2">Welcome back, Alex! 👋</h1>
                    <p class="text-base-content/70 text-lg">Ready to collaborate and learn with your peers today?</p>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="stats shadow-sm bg-base-100 border border-base-200">
                        <div class="stat">
                            <div class="stat-figure text-secondary">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                            <div class="stat-title">Items Listed</div>
                            <div class="stat-value text-secondary">3</div>
                            <div class="stat-desc">2 textbooks, 1 notes</div>
                        </div>
                    </div>

                    <div class="stats shadow-sm bg-base-100 border border-base-200">
                        <div class="stat">
                            <div class="stat-figure text-accent">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path>
                                </svg>
                            </div>
                            <div class="stat-title">Forum Posts</div>
                            <div class="stat-value text-accent">5</div>
                            <div class="stat-desc">Active discussions</div>
                        </div>
                    </div>

                    <div class="stats shadow-sm bg-base-100 border border-base-200">
                        <div class="stat">
                            <div class="stat-figure text-primary">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                </svg>
                            </div>
                            <div class="stat-title">Mentorships</div>
                            <div class="stat-value text-primary">2</div>
                            <div class="stat-desc">1 mentor, 1 mentee</div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="card bg-base-100 shadow-sm border border-base-200">
                        <div class="card-body">
                            <h2 class="card-title text-lg">Recent Activity</h2>
                            <div class="space-y-4">
                                <div class="flex items-center space-x-3 p-3 bg-base-200/50 rounded-lg">
                                    <div class="w-2 h-2 bg-success rounded-full"></div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">Calculus Textbook sold</p>
                                        <p class="text-xs text-base-content/60">2 hours ago</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3 p-3 bg-base-200/50 rounded-lg">
                                    <div class="w-2 h-2 bg-info rounded-full"></div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">New forum reply</p>
                                        <p class="text-xs text-base-content/60">1 day ago</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3 p-3 bg-base-200/50 rounded-lg">
                                    <div class="w-2 h-2 bg-warning rounded-full"></div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">Mentorship session scheduled</p>
                                        <p class="text-xs text-base-content/60">3 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-sm border border-base-200">
                        <div class="card-body">
                            <h2 class="card-title text-lg">Quick Actions</h2>
                            <div class="space-y-3">
                                <button class="btn btn-primary btn-outline w-full justify-start" onclick="app.navigate('marketplace')">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    List New Item
                                </button>
                                <button class="btn btn-secondary btn-outline w-full justify-start" onclick="app.navigate('forum')">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Create Forum Post
                                </button>
                                <button class="btn btn-accent btn-outline w-full justify-start" onclick="app.navigate('mentor')">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Find Mentor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    getMarketplaceContent() {
        const items = [
            { title: 'Calculus: Early Transcendentals', price: '$85', category: 'Textbook', condition: 'Like New', seller: 'Sarah M.' },
            { title: 'Organic Chemistry Notes', price: '$25', category: 'Notes', condition: 'Excellent', seller: 'Mike R.' },
            { title: 'Physics Lab Manual', price: '$40', category: 'Manual', condition: 'Good', seller: 'Emma L.' },
            { title: 'Data Structures & Algorithms', price: '$70', category: 'Textbook', condition: 'Very Good', seller: 'David K.' },
            { title: 'Psychology Study Guide', price: '$15', category: 'Study Guide', condition: 'Good', seller: 'Lisa T.' },
            { title: 'Linear Algebra Solutions', price: '$30', category: 'Solutions', condition: 'Like New', seller: 'John D.' },
        ]

        return `
            <div class="fade-in">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-base-content mb-2">Marketplace</h1>
                        <p class="text-base-content/70">Buy and sell textbooks, notes, and study materials</p>
                    </div>
                    <div class="mt-4 lg:mt-0">
                        <button class="btn btn-primary">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            List Item
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${items
                        .map(
                            (item) => `
                        <div class="card bg-base-100 shadow-sm border border-base-200 card-hover">
                            <div class="card-body">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="badge badge-secondary badge-sm">${item.category}</div>
                                    <div class="text-2xl font-bold text-primary">${item.price}</div>
                                </div>
                                <h2 class="card-title text-lg mb-2">${item.title}</h2>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-base-content/60">Condition:</span>
                                        <span class="font-medium">${item.condition}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-base-content/60">Seller:</span>
                                        <span class="font-medium">${item.seller}</span>
                                    </div>
                                </div>
                                <div class="card-actions justify-end mt-4">
                                    <button class="btn btn-primary btn-sm">Contact Seller</button>
                                </div>
                            </div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `
    }

    getForumContent() {
        const posts = [
            {
                title: 'Looking for co-founder for EdTech startup',
                tags: ['Startup', 'EdTech', 'Co-founder'],
                author: 'Alex Chen',
                replies: 12,
                time: '2 hours ago',
            },
            {
                title: 'Study group for Machine Learning final',
                tags: ['Study Group', 'ML', 'Final Exam'],
                author: 'Maria Rodriguez',
                replies: 8,
                time: '4 hours ago',
            },
            {
                title: 'Hackathon team formation - Need backend dev',
                tags: ['Hackathon', 'Backend', 'Team'],
                author: 'James Wilson',
                replies: 15,
                time: '1 day ago',
            },
            {
                title: 'Research partner wanted for AI ethics project',
                tags: ['Research', 'AI', 'Ethics'],
                author: 'Sophie Kim',
                replies: 6,
                time: '2 days ago',
            },
            {
                title: 'Mobile app development collaboration',
                tags: ['Mobile', 'App Dev', 'Collaboration'],
                author: 'Ryan Brown',
                replies: 9,
                time: '3 days ago',
            },
        ]

        return `
            <div class="fade-in">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-base-content mb-2">Forum</h1>
                        <p class="text-base-content/70">Share ideas, find collaborators, and build amazing projects</p>
                    </div>
                    <div class="mt-4 lg:mt-0">
                        <button class="btn btn-primary">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            New Post
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    ${posts
                        .map(
                            (post) => `
                        <div class="card bg-base-100 shadow-sm border border-base-200 card-hover">
                            <div class="card-body">
                                <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                    <div class="flex-1">
                                        <h2 class="card-title text-lg mb-3">${post.title}</h2>
                                        <div class="flex flex-wrap gap-2 mb-3">
                                            ${post.tags
                                                .map(
                                                    (tag) => `
                                                <div class="badge badge-outline badge-sm">${tag}</div>
                                            `
                                                )
                                                .join('')}
                                        </div>
                                        <div class="flex items-center text-sm text-base-content/60">
                                            <span>by ${post.author}</span>
                                            <span class="mx-2">•</span>
                                            <span>${post.time}</span>
                                            <span class="mx-2">•</span>
                                            <span>${post.replies} replies</span>
                                        </div>
                                    </div>
                                    <div class="mt-4 lg:mt-0 lg:ml-4">
                                        <button class="btn btn-primary btn-sm">Join Discussion</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `
    }

    getMentorContent() {
        const mentors = [
            {
                name: 'Dr. Sarah Johnson',
                subject: 'Computer Science',
                availability: 'Mon, Wed, Fri',
                rating: '4.9',
                sessions: '50+',
                expertise: ['Algorithms', 'Data Structures', 'System Design'],
            },
            {
                name: 'Prof. Michael Chen',
                subject: 'Mathematics',
                availability: 'Tue, Thu',
                rating: '4.8',
                sessions: '30+',
                expertise: ['Calculus', 'Linear Algebra', 'Statistics'],
            },
            {
                name: 'Emma Rodriguez',
                subject: 'Physics',
                availability: 'Mon, Tue, Sat',
                rating: '4.9',
                sessions: '25+',
                expertise: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
            },
            {
                name: 'David Kim',
                subject: 'Chemistry',
                availability: 'Wed, Thu, Sun',
                rating: '4.7',
                sessions: '40+',
                expertise: ['Organic Chemistry', 'Biochemistry', 'Lab Techniques'],
            },
        ]

        return `
            <div class="fade-in">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-base-content mb-2">Mentorship</h1>
                        <p class="text-base-content/70">Connect with experienced mentors and grow your skills</p>
                    </div>
                    <div class="mt-4 lg:mt-0 space-x-2">
                        <button class="btn btn-secondary btn-outline">Become a Mentor</button>
                        <button class="btn btn-primary">Find Mentor</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${mentors
                        .map(
                            (mentor) => `
                        <div class="card bg-base-100 shadow-sm border border-base-200 card-hover">
                            <div class="card-body">
                                <div class="flex items-start space-x-4">
                                    <div class="avatar">
                                        <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span class="text-2xl font-bold text-primary">${mentor.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <h2 class="card-title text-lg">${mentor.name}</h2>
                                        <p class="text-primary font-medium">${mentor.subject}</p>
                                        <div class="flex items-center space-x-4 mt-2 text-sm text-base-content/60">
                                            <div class="flex items-center space-x-1">
                                                <svg class="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                                <span>${mentor.rating}</span>
                                            </div>
                                            <span>•</span>
                                            <span>${mentor.sessions} sessions</span>
                                        </div>
                                        <div class="mt-3">
                                            <p class="text-sm text-base-content/60 mb-2">Available: ${mentor.availability}</p>
                                            <div class="flex flex-wrap gap-1">
                                                ${mentor.expertise
                                                    .map(
                                                        (skill) => `
                                                    <div class="badge badge-secondary badge-xs">${skill}</div>
                                                `
                                                    )
                                                    .join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-actions justify-end mt-4">
                                    <button class="btn btn-primary btn-sm">Book Session</button>
                                </div>
                            </div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `
    }

    getProfileContent() {
        return `
            <div class="fade-in">
                <h1 class="text-3xl font-bold text-base-content mb-8">Profile</h1>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Profile Info -->
                    <div class="lg:col-span-1">
                        <div class="card bg-base-100 shadow-sm border border-base-200">
                            <div class="card-body text-center">
                                <div class="avatar mb-4">
                                    <div class="w-24 h-24 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                                        <span class="text-4xl font-bold text-primary">A</span>
                                    </div>
                                </div>
                                <h2 class="text-2xl font-bold">Alex Student</h2>
                                <p class="text-base-content/60 mb-4">Computer Science Major</p>
                                <div class="stats stats-vertical shadow-sm bg-base-200/50">
                                    <div class="stat">
                                        <div class="stat-title text-xs">Member Since</div>
                                        <div class="stat-value text-lg">Jan 2024</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-title text-xs">Rating</div>
                                        <div class="stat-value text-lg">4.9 ⭐</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-title text-xs">Transactions</div>
                                        <div class="stat-value text-lg">23</div>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm mt-4 w-full">Edit Profile</button>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Details -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Personal Information -->
                        <div class="card bg-base-100 shadow-sm border border-base-200">
                            <div class="card-body">
                                <h3 class="card-title mb-4">Personal Information</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Full Name</span>
                                        </label>
                                        <input type="text" value="Alex Student" class="input input-bordered" readonly>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Email</span>
                                        </label>
                                        <input type="email" value="alex.student@university.edu" class="input input-bordered" readonly>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Major</span>
                                        </label>
                                        <input type="text" value="Computer Science" class="input input-bordered" readonly>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Year</span>
                                        </label>
                                        <input type="text" value="Junior" class="input input-bordered" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Activity Summary -->
                        <div class="card bg-base-100 shadow-sm border border-base-200">
                            <div class="card-body">
                                <h3 class="card-title mb-4">Activity Summary</h3>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                </svg>
                                            </div>
                                            <span class="font-medium">Marketplace Items</span>
                                        </div>
                                        <span class="text-lg font-bold text-primary">12</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                                                <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path>
                                                </svg>
                                            </div>
                                            <span class="font-medium">Forum Posts</span>
                                        </div>
                                        <span class="text-lg font-bold text-secondary">8</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                                <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                                </svg>
                                            </div>
                                            <span class="font-medium">Mentorship Sessions</span>
                                        </div>
                                        <span class="text-lg font-bold text-accent">15</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

// Initialize the app
const app = new PeerCodexApp()
