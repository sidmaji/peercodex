class Router {
    constructor() {
        this.routes = new Map()
        this.currentRoute = null
        this.isAuthenticated = false
        this.init()
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute())
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"]')) {
                e.preventDefault()
                this.navigate(e.target.getAttribute('href'))
            }
        })
    }

    setAuthenticationStatus(isAuthenticated) {
        this.isAuthenticated = isAuthenticated
    }

    addRoute(path, handler) {
        this.routes.set(path, handler)
    }

    navigate(path) {
        if (path !== this.currentRoute) {
            window.history.pushState({}, '', path)
            this.handleRoute()
        }
    }

    handleRoute() {
        const path = window.location.pathname

        // Redirect to home if not authenticated and trying to access protected routes
        if (!this.isAuthenticated && path !== '/') {
            window.history.replaceState({}, '', '/')
            this.currentRoute = '/'
            return
        }

        // Redirect to dashboard if authenticated and on home page
        if (this.isAuthenticated && path === '/') {
            window.history.replaceState({}, '', '/dashboard')
            this.currentRoute = '/dashboard'
            const handler = this.routes.get('/dashboard')
            if (handler) handler()
            this.updateActiveNavLink('/dashboard')
            return
        }

        const handler = this.routes.get(path) || this.routes.get('/404')

        if (handler) {
            this.currentRoute = path
            handler()
            this.updateActiveNavLink(path)
        }
    }

    updateActiveNavLink(path) {
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.remove('bg-white/30', 'text-indigo-600')
            if (link.getAttribute('href') === path) {
                link.classList.add('bg-white/30', 'text-indigo-600')
            }
        })
    }

    start() {
        this.handleRoute()
    }
}

export const router = new Router()
