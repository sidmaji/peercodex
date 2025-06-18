import { firebaseAuth, firestore } from './firebase-config.js'
import { onboarding } from './onboarding.js'
import { pages } from './pages.js'
import { router } from './router.js'
import { ui } from './ui.js'

class App {
    constructor() {
        this.currentUser = null
        this.currentUserProfile = null
        this.authResolved = false
        this.init()
    }

    init() {
        this.setupRoutes()
        this.setupAuth()
        this.bindEvents()

        // Hide all content initially until auth is resolved
        this.showLoadingState()
    }

    showLoadingState() {
        // Hide everything initially to prevent flashing
        document.getElementById('landing-page').classList.add('hidden')
        document.getElementById('sidebar').classList.add('hidden')
        document.getElementById('topbar').classList.add('hidden')
        document.getElementById('app-content').classList.add('hidden')
        document.getElementById('floating-navbar').style.visibility = 'hidden'
    }

    setupRoutes() {
        router.addRoute('/dashboard', () => {
            if (this.currentUser) {
                ui.setPageContent(pages.dashboard())
            }
        })

        router.addRoute('/marketplace', () => {
            if (this.currentUser) {
                ui.setPageContent(pages.marketplace())
            }
        })

        router.addRoute('/forum', () => {
            if (this.currentUser) {
                ui.setPageContent(pages.forum())
            }
        })

        router.addRoute('/mentor', () => {
            if (this.currentUser) {
                ui.setPageContent(pages.mentor())
                this.loadMentors()
            }
        })

        router.addRoute('/profile', () => {
            if (this.currentUser) {
                ui.setPageContent(pages.profile(this.currentUserProfile, this.currentUser))
            }
        })

        router.addRoute('/404', () => {
            ui.setPageContent('<div class="text-center py-12"><h1 class="text-2xl font-bold text-gray-800 dark:text-white">Page Not Found</h1></div>')
        })
    }

    setupAuth() {
        firebaseAuth.onAuthStateChanged(async (user) => {
            // Don't process auth changes until we've resolved the initial state
            if (this.authResolved && user === this.currentUser) {
                return
            }

            this.currentUser = user

            if (user) {
                router.setAuthenticationStatus(true)

                try {
                    const userProfile = await firestore.getUserProfile(user.uid)

                    if (userProfile && userProfile.onboardingCompleted) {
                        // Use Firestore profile data - this is the source of truth
                        this.currentUserProfile = userProfile

                        // ALWAYS update UI with Firestore data
                        ui.updateUserInfo({
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            email: userProfile.email || user.email,
                        })

                        // Show logged in state without messages on initial load
                        ui.showLoggedInState(user)

                        // Only show welcome message on fresh login (not page refresh)
                        if (this.authResolved) {
                            ui.showSuccess('Welcome back!')
                        }

                        // Navigate appropriately
                        if (window.location.pathname === '/' || window.location.pathname === '') {
                            router.navigate('/dashboard')
                        } else {
                            router.start()
                        }
                    } else {
                        // No profile or incomplete - trigger onboarding
                        this.currentUserProfile = null

                        // Temporary fallback while onboarding loads
                        ui.updateUserInfo({
                            firstName: user.displayName?.split(' ')[0] || user.email.split('@')[0],
                            lastName: user.displayName?.split(' ')[1] || '',
                            email: user.email,
                        })

                        ui.showLoggedInState(user)

                        const needsOnboarding = await onboarding.checkAndShowOnboarding(user)
                        if (!needsOnboarding && this.authResolved) {
                            ui.showSuccess('Welcome back!')
                        }

                        if (window.location.pathname === '/' || window.location.pathname === '') {
                            router.navigate('/dashboard')
                        } else {
                            router.start()
                        }
                    }
                } catch (error) {
                    console.error('Error loading user profile:', error)
                    this.currentUserProfile = null

                    ui.updateUserInfo({
                        firstName: user.displayName?.split(' ')[0] || user.email.split('@')[0],
                        lastName: user.displayName?.split(' ')[1] || '',
                        email: user.email,
                    })

                    ui.showLoggedInState(user)

                    if (window.location.pathname === '/' || window.location.pathname === '') {
                        router.navigate('/dashboard')
                    } else {
                        router.start()
                    }
                }
            } else {
                // Not logged in
                router.setAuthenticationStatus(false)
                ui.showLoggedOutState()
                this.currentUserProfile = null

                if (window.location.pathname !== '/') {
                    router.navigate('/')
                }
            }

            // Mark auth as resolved after first check
            this.authResolved = true
        })
    }

    bindEvents() {
        // Login form
        document.getElementById('login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault()
            await this.handleEmailLogin()
        })

        // Signup form
        document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
            e.preventDefault()
            await this.handleEmailSignup()
        })

        // Remove Google auth button handlers
        // document.getElementById('google-login')?.addEventListener('click', async () => {
        //     await this.handleGoogleAuth()
        // })
        // document.getElementById('google-signup')?.addEventListener('click', async () => {
        //     await this.handleGoogleAuth()
        // })

        // Forgot password
        document.getElementById('forgot-password-btn')?.addEventListener('click', async () => {
            await this.handleForgotPassword()
        })

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', async () => {
            await this.handleLogout()
        })

        // Profile editing
        document.addEventListener('click', (e) => {
            if (e.target.id === 'edit-profile-btn') {
                this.showEditProfileModal()
            }
            if (e.target.id === 'close-edit-modal' || e.target.id === 'cancel-edit-btn') {
                this.hideEditProfileModal()
            }
            if (e.target.id === 'resend-verification-btn') {
                this.handleResendVerification()
            }
            if (e.target.id === 'change-password-btn') {
                this.handleChangePassword()
            }
            if (e.target.classList.contains('connect-btn')) {
                const mentorId = e.target.getAttribute('data-mentor-id')
                const mentorName = e.target.getAttribute('data-mentor-name')
                const mentorSubjects = JSON.parse(e.target.getAttribute('data-mentor-subjects'))
                this.showConnectModal(mentorId, mentorName, mentorSubjects)
            }
            if (e.target.id === 'close-connect-modal' || e.target.id === 'cancel-connect-btn') {
                this.hideConnectModal()
            }
        })

        document.addEventListener('submit', (e) => {
            if (e.target.id === 'edit-profile-form') {
                e.preventDefault()
                this.handleProfileUpdate()
            }
            if (e.target.id === 'connect-form') {
                e.preventDefault()
                this.handleMentorRequest()
            }
        })

        document.addEventListener('input', (e) => {
            if (e.target.id === 'edit-bio') {
                document.getElementById('bio-count').textContent = e.target.value.length
            }
        })

        document.addEventListener('change', (e) => {
            if (e.target.id === 'subject-filter') {
                this.filterMentors(e.target.value)
            }
        })
    }

    showEditProfileModal() {
        document.getElementById('edit-profile-modal')?.classList.remove('hidden')
    }

    hideEditProfileModal() {
        document.getElementById('edit-profile-modal')?.classList.add('hidden')
    }

    async handleProfileUpdate() {
        const firstName = document.getElementById('edit-firstName').value.trim()
        const lastName = document.getElementById('edit-lastName').value.trim()
        const bio = document.getElementById('edit-bio').value.trim()
        const gradeLevel = document.getElementById('edit-gradeLevel').value
        const schoolName = document.getElementById('edit-schoolName').value.trim()

        // Get role selections
        const roles = Array.from(document.querySelectorAll('input[name="edit-roles"]:checked')).map((cb) => cb.value)

        // Get subject selections
        const mentorOffers = Array.from(document.querySelectorAll('input[name="edit-mentor-offers"]:checked')).map((cb) => cb.value)
        const menteeInterests = Array.from(document.querySelectorAll('input[name="edit-mentee-interests"]:checked')).map((cb) => cb.value)

        // Get goals
        const goals = Array.from(document.querySelectorAll('input[name="edit-goals"]:checked')).map((cb) => cb.value)

        if (!firstName || !lastName) {
            ui.showError('First name and last name are required')
            return
        }

        if (roles.length === 0) {
            ui.showError('Please select at least one role')
            return
        }

        try {
            const updateData = {
                firstName,
                lastName,
                bio,
                gradeLevel,
                schoolName,
                roles,
                mentorOffers,
                menteeInterests,
                goals,
            }

            const success = await firestore.updateUserProfile(this.currentUser.uid, updateData)

            if (success) {
                ui.showSuccess('Profile updated successfully!')
            } else {
                ui.showSuccess('Profile updated locally. Will sync when online.')
            }

            // Update current profile data
            this.currentUserProfile = { ...this.currentUserProfile, ...updateData }

            // Update UI display immediately
            ui.updateUserInfo({
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                email: this.currentUserProfile.email,
            })

            // Refresh profile page
            ui.setPageContent(pages.profile(this.currentUserProfile, this.currentUser))

            this.hideEditProfileModal()
        } catch (error) {
            console.error('Profile update error:', error)
            ui.showError('Failed to update profile. Please try again.')
        }
    }

    async handleResendVerification() {
        try {
            await firebaseAuth.sendEmailVerification(this.currentUser)
            ui.showSuccess('Verification email sent! Check your inbox.')
        } catch (error) {
            console.error('Verification email error:', error)
            ui.showError('Failed to send verification email. Please try again.')
        }
    }

    async handleChangePassword() {
        const email = this.currentUser.email
        if (!email) {
            ui.showError('Cannot reset password for this account type')
            return
        }

        try {
            await firebaseAuth.sendPasswordReset(email)
            ui.showSuccess('Password reset email sent! Check your inbox.')
        } catch (error) {
            console.error('Password reset error:', error)
            ui.showError('Failed to send password reset email. Please try again.')
        }
    }

    validateFriscoEmail(email) {
        const domain = '@k12.friscoisd.org'
        return email.toLowerCase().endsWith(domain)
    }

    async handleEmailLogin() {
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value

        if (!email || !password) {
            ui.showError('Please fill in all fields')
            return
        }

        // Validate Frisco ISD email domain
        if (!this.validateFriscoEmail(email)) {
            ui.showError('Please use your Frisco ISD email address (@k12.friscoisd.org)')
            return
        }

        try {
            await firebaseAuth.signInWithEmail(email, password)
            // Auth state change will handle the rest
        } catch (error) {
            let errorMessage = 'Login failed. '

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage += 'No account found with this email.'
                    break
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    errorMessage += 'Incorrect email or password.'
                    break
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.'
                    break
                case 'auth/too-many-requests':
                    errorMessage += 'Too many failed attempts. Please try again later.'
                    break
                default:
                    errorMessage += error.message
            }

            ui.showError(errorMessage)
        }
    }

    async handleEmailSignup() {
        const email = document.getElementById('signup-email').value
        const password = document.getElementById('signup-password').value
        const confirmPassword = document.getElementById('signup-confirm-password').value

        if (!email || !password || !confirmPassword) {
            ui.showError('Please fill in all fields')
            return
        }

        // Validate Frisco ISD email domain
        if (!this.validateFriscoEmail(email)) {
            ui.showError('Please use your Frisco ISD email address (@k12.friscoisd.org)')
            return
        }

        if (password !== confirmPassword) {
            ui.showError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            ui.showError('Password must be at least 6 characters')
            return
        }

        try {
            const userCredential = await firebaseAuth.signUpWithEmail(email, password)

            // Send email verification
            try {
                await firebaseAuth.sendEmailVerification(userCredential.user)
                ui.showSuccess('Account created! Please check your Frisco ISD email to verify your account before continuing.')
            } catch (verificationError) {
                console.warn('Failed to send verification email:', verificationError)
                ui.showError('Account created but failed to send verification email. Please contact support.')
            }
        } catch (error) {
            let errorMessage = 'Signup failed. '

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'An account with this email already exists.'
                    break
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.'
                    break
                case 'auth/weak-password':
                    errorMessage += 'Password is too weak. Please choose a stronger password.'
                    break
                default:
                    errorMessage += error.message
            }

            ui.showError(errorMessage)
        }
    }

    // Remove Google auth handler
    // async handleGoogleAuth() {
    //     // Removed Google authentication
    // }

    async handleForgotPassword() {
        const email = document.getElementById('login-email').value

        if (!email) {
            ui.showError('Please enter your email address first')
            document.getElementById('login-email').focus()
            return
        }

        try {
            await firebaseAuth.sendPasswordReset(email)
            ui.showSuccess('Password reset email sent! Check your inbox.')
        } catch (error) {
            let errorMessage = 'Failed to send password reset email. '

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage += 'No account found with this email address.'
                    break
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.'
                    break
                default:
                    errorMessage += error.message
            }

            ui.showError(errorMessage)
        }
    }

    async handleLogout() {
        try {
            await firebaseAuth.signOut()
            ui.showSuccess('Logged out successfully')
            router.navigate('/')
        } catch (error) {
            ui.showError('Logout failed: ' + error.message)
        }
    }

    async loadMentors() {
        try {
            const mentors = await firestore.getMentors()
            // Filter out current user and sort by number of subjects offered
            const filteredMentors = mentors.filter((mentor) => mentor.uid !== this.currentUser.uid).sort((a, b) => b.mentorOffers.length - a.mentorOffers.length)

            this.displayMentors(filteredMentors)
            this.loadMentorRequests()
        } catch (error) {
            console.error('Error loading mentors:', error)
            document.getElementById('mentors-grid').innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-500 dark:text-gray-400">Failed to load mentors. Please try again later.</p>
                </div>
            `
        }
    }

    displayMentors(mentors) {
        const grid = document.getElementById('mentors-grid')

        if (mentors.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">No other mentors found</h3>
                    <p class="text-gray-500 dark:text-gray-400">Be the first to offer mentoring in your subjects!</p>
                </div>
            `
            return
        }

        grid.innerHTML = mentors
            .map(
                (mentor) => `
            <div class="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div class="flex items-center space-x-4 mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-bold">${mentor.firstName?.charAt(0) || 'M'}</span>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-800 dark:text-white">${mentor.firstName} ${mentor.lastName}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">${mentor.gradeLevel ? `Grade ${mentor.gradeLevel}` : 'Student'}</p>
                        ${mentor.schoolName ? `<p class="text-xs text-gray-500 dark:text-gray-400">${mentor.schoolName}</p>` : ''}
                    </div>
                </div>

                ${mentor.bio ? `<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">"${mentor.bio}"</p>` : ''}

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Can help with (${mentor.mentorOffers.length} subjects):</h4>
                    <div class="flex flex-wrap gap-2">
                        ${mentor.mentorOffers
                            .slice(0, 4)
                            .map((subject) => `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">${subject}</span>`)
                            .join('')}
                        ${
                            mentor.mentorOffers.length > 4
                                ? `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">+${mentor.mentorOffers.length - 4} more</span>`
                                : ''
                        }
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-gray-600 dark:text-gray-400">Available</span>
                    </div>
                    <button class="connect-btn px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all group-hover:scale-105"
                        data-mentor-id="${mentor.uid}"
                        data-mentor-name="${mentor.firstName} ${mentor.lastName}"
                        data-mentor-subjects='${JSON.stringify(mentor.mentorOffers)}'>
                        Connect
                    </button>
                </div>
            </div>
        `
            )
            .join('')
    }

    filterMentors(subject) {
        const cards = document.querySelectorAll('#mentors-grid > div:not(.col-span-full)')
        cards.forEach((card) => {
            if (subject === '' || card.innerHTML.includes(subject)) {
                card.style.display = 'block'
            } else {
                card.style.display = 'none'
            }
        })
    }

    async loadMentorRequests() {
        try {
            const requests = await firestore.getMentorRequests(this.currentUser.uid)
            this.displayMentorRequests(requests)
        } catch (error) {
            console.error('Error loading mentor requests:', error)
            document.getElementById('requests-section').innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-500 dark:text-gray-400">Failed to load requests. Please try again later.</p>
                </div>
            `
        }
    }

    displayMentorRequests(requests) {
        const requestsContainer = document.getElementById('requests-list')

        if (requests.length === 0) {
            requestsContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">No requests yet</h3>
                    <p class="text-gray-500 dark:text-gray-400">Requests from students will appear here</p>
                </div>
            `
            return
        }

        requestsContainer.innerHTML = requests
            .map(
                (request) => `
            <div class="glass p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold text-sm">${request.fromName?.charAt(0) || 'S'}</span>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 dark:text-white">${request.fromName}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                <a href="mailto:${request.fromEmail}" class="text-indigo-500 hover:text-indigo-400 transition-colors">
                                    ${request.fromEmail}
                                </a>
                            </p>
                            ${request.fromGrade ? `<p class="text-xs text-gray-500 dark:text-gray-400">Grade ${request.fromGrade}</p>` : ''}
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : request.status === 'accepted'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }">
                            ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            ${new Date(request.timestamp?.seconds * 1000 || request.timestamp).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div class="mb-3">
                    <span class="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        ${request.subject}
                    </span>
                </div>

                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p class="text-gray-700 dark:text-gray-300 text-sm">${request.message}</p>
                </div>

                ${
                    request.status === 'pending'
                        ? `
                <div class="flex justify-end space-x-3 mt-4">
                    <button onclick="window.app.updateRequestStatus('${request.id}', 'declined')"
                        class="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        Decline
                    </button>
                    <button onclick="window.app.updateRequestStatus('${request.id}', 'accepted')"
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Accept
                    </button>
                </div>
                `
                        : ''
                }
            </div>
        `
            )
            .join('')
    }

    async updateRequestStatus(requestId, status) {
        try {
            const success = await firestore.updateMentorRequestStatus(requestId, status)
            if (success) {
                ui.showSuccess(`Request ${status} successfully!`)
                this.loadMentorRequests() // Reload requests
            } else {
                ui.showError('Failed to update request. Please try again.')
            }
        } catch (error) {
            console.error('Error updating request status:', error)
            ui.showError('Failed to update request. Please try again.')
        }
    }

    async handleMentorRequest() {
        const subject = document.getElementById('connect-subject').value
        const message = document.getElementById('connect-message').value.trim()

        if (!subject || !message) {
            ui.showError('Please fill in all fields')
            return
        }

        try {
            const requestData = {
                from: this.currentUser.uid,
                fromName:
                    this.currentUserProfile?.firstName && this.currentUserProfile?.lastName
                        ? `${this.currentUserProfile.firstName} ${this.currentUserProfile.lastName}`
                        : this.currentUser.displayName || this.currentUser.email,
                fromEmail: this.currentUser.email,
                fromGrade: this.currentUserProfile?.gradeLevel || null,
                fromSchool: this.currentUserProfile?.schoolName || null,
                to: this.selectedMentorId,
                subject,
                message,
                status: 'pending',
                timestamp: new Date(),
            }

            const success = await firestore.createMentorRequest(requestData)

            if (success) {
                ui.showSuccess('Request sent successfully!')
            } else {
                ui.showSuccess('Request saved locally. Will send when online.')
            }

            this.hideConnectModal()
        } catch (error) {
            console.error('Error sending mentor request:', error)
            ui.showError('Failed to send request. Please try again.')
        }
    }

    async resendVerificationEmail(userId) {
        try {
            if (this.currentUser) {
                await firebaseAuth.sendEmailVerification(this.currentUser)
                ui.showSuccess('Verification email sent! Check your Frisco ISD email.')
            }
        } catch (error) {
            console.error('Resend verification error:', error)
            ui.showError('Failed to send verification email. Please try again.')
        }
    }

    showConnectModal(mentorId, mentorName, mentorSubjects) {
        this.selectedMentorId = mentorId

        // Check if mentor-info element exists
        const mentorInfoElement = document.getElementById('mentor-info')
        if (!mentorInfoElement) {
            console.error('mentor-info element not found')
            return
        }

        // Populate mentor info
        mentorInfoElement.innerHTML = `
            <h3 class="font-semibold text-gray-800 dark:text-white mb-2">${mentorName}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Offers help in ${mentorSubjects.length} subjects</p>
        `

        // Populate subject dropdown
        const subjectSelect = document.getElementById('connect-subject')
        if (!subjectSelect) {
            console.error('connect-subject element not found')
            return
        }

        subjectSelect.innerHTML = `
            <option value="">Select a subject</option>
            ${mentorSubjects.map((subject) => `<option value="${subject}">${subject}</option>`).join('')}
        `

        // Clear form
        const messageElement = document.getElementById('connect-message')
        if (messageElement) {
            messageElement.value = ''
        }

        // Show modal
        const modal = document.getElementById('connect-modal')
        if (modal) {
            modal.classList.remove('hidden')
        } else {
            console.error('connect-modal element not found')
        }
    }

    hideConnectModal() {
        const modal = document.getElementById('connect-modal')
        if (modal) {
            modal.classList.add('hidden')
        }
        this.selectedMentorId = null
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App()
})
