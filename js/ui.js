class UIManager {
    constructor() {
        this.isLoggedIn = false
        this.sidebarOpen = true
        this.bindEvents()
        this.initScrollAnimations()
    }

    bindEvents() {
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => this.toggleSidebar())

        // Login modal triggers
        document.getElementById('nav-login-btn')?.addEventListener('click', () => this.showLoginModal())

        // Signup modal triggers
        document.getElementById('login-btn')?.addEventListener('click', () => this.showSignupModal())
        document.getElementById('cta-login-btn')?.addEventListener('click', () => this.showSignupModal())
        document.getElementById('learn-more-btn')?.addEventListener('click', () => this.scrollToFeatures())

        // Modal close handlers
        document.getElementById('close-login-modal')?.addEventListener('click', () => this.hideLoginModal())
        document.getElementById('close-signup-modal')?.addEventListener('click', () => this.hideSignupModal())

        // Modal switching
        document.getElementById('show-signup-btn')?.addEventListener('click', () => {
            this.hideLoginModal()
            this.showSignupModal()
        })
        document.getElementById('show-login-btn')?.addEventListener('click', () => {
            this.hideSignupModal()
            this.showLoginModal()
        })

        // Modal backdrop clicks
        document.getElementById('login-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'login-modal') this.hideLoginModal()
        })
        document.getElementById('signup-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'signup-modal') this.hideSignupModal()
        })

        // Smooth scroll for navbar links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute('href'))
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                }
            })
        })

        // Add event listeners for pricing buttons - should trigger signup
        document.querySelectorAll('.pricing-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.showSignupModal())
        })

        window.addEventListener('resize', () => this.handleResize())
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate')
                } else {
                    entry.target.classList.remove('animate')
                }
            })
        }, observerOptions)

        document.querySelectorAll('.scroll-animate').forEach((el) => {
            observer.observe(el)
        })
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen
        const sidebar = document.getElementById('sidebar')
        const topbar = document.getElementById('topbar')
        const appContent = document.getElementById('app-content')

        if (this.sidebarOpen) {
            sidebar.classList.remove('-translate-x-full')
            topbar.style.left = '256px'
            appContent.style.marginLeft = '256px'
        } else {
            sidebar.classList.add('-translate-x-full')
            topbar.style.left = '0'
            appContent.style.marginLeft = '0'
        }
    }

    handleResize() {
        if (window.innerWidth < 1024 && this.sidebarOpen) {
            this.toggleSidebar()
        }
    }

    showLoginModal() {
        document.getElementById('login-modal').classList.remove('hidden')
        // Clear form
        document.getElementById('login-form')?.reset()
    }

    hideLoginModal() {
        document.getElementById('login-modal').classList.add('hidden')
    }

    showSignupModal() {
        document.getElementById('signup-modal').classList.remove('hidden')
        // Clear form
        document.getElementById('signup-form')?.reset()
    }

    hideSignupModal() {
        document.getElementById('signup-modal').classList.add('hidden')
    }

    hideAllModals() {
        this.hideLoginModal()
        this.hideSignupModal()
    }

    showLoggedInState(user) {
        this.isLoggedIn = true

        // Hide landing page and navbar
        document.getElementById('landing-page').classList.add('hidden')
        const navbar = document.getElementById('floating-navbar')
        navbar.style.opacity = '0'
        navbar.style.visibility = 'hidden'

        // Show app interface
        document.getElementById('sidebar').classList.remove('hidden')
        document.getElementById('topbar').classList.remove('hidden')
        document.getElementById('app-content').classList.remove('hidden')

        // Show sidebar by default
        document.getElementById('sidebar').classList.remove('-translate-x-full')

        this.hideAllModals()
    }

    showLoggedOutState() {
        this.isLoggedIn = false

        // Show landing page and navbar
        document.getElementById('landing-page').classList.remove('hidden')
        const navbar = document.getElementById('floating-navbar')
        navbar.style.opacity = '1'
        navbar.style.visibility = 'visible'

        // Hide app interface
        document.getElementById('sidebar').classList.add('hidden')
        document.getElementById('topbar').classList.add('hidden')
        document.getElementById('app-content').classList.add('hidden')

        this.hideAllModals()
    }

    updateUserInfo(user) {
        let userName, userInitial

        // ALWAYS prioritize firstName + lastName from Firestore
        if (user.firstName) {
            if (user.lastName) {
                userName = `${user.firstName} ${user.lastName}`
            } else {
                userName = user.firstName
            }
            userInitial = user.firstName.charAt(0).toUpperCase()
        }
        // Only use displayName if no firstName from Firestore
        else if (user.displayName) {
            userName = user.displayName
            userInitial = userName.charAt(0).toUpperCase()
        }
        // Final fallback to email
        else if (user.email) {
            userName = user.email.split('@')[0]
            userInitial = userName.charAt(0).toUpperCase()
        }
        // Last resort
        else {
            userName = 'User'
            userInitial = 'U'
        }

        const userNameElement = document.getElementById('user-name')
        const userInitialElement = document.getElementById('user-initial')

        if (userNameElement) userNameElement.textContent = userName
        if (userInitialElement) userInitialElement.textContent = userInitial

        // Reset avatar to just show initials
        const avatarElement = document.getElementById('user-avatar')
        if (avatarElement) {
            avatarElement.style.backgroundImage = ''
            avatarElement.style.backgroundSize = ''
            avatarElement.style.backgroundPosition = ''
        }
    }

    setPageContent(content) {
        document.getElementById('page-content').innerHTML = content
    }

    showError(message) {
        // Create a toast notification instead of console.error
        const toast = document.createElement('div')
        toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
        toast.textContent = message

        document.body.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 5000)

        console.error(message)
    }

    showSuccess(message) {
        const toast = document.createElement('div')
        toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
        toast.textContent = message

        document.body.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 3000)
    }

    scrollToFeatures() {
        const featuresSection = document.getElementById('features')
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' })
        }
    }
}

export const ui = new UIManager()
