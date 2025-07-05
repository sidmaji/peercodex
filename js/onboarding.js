import { firestore } from './firebase-config.js'
import { router } from './router.js'
import { ui } from './ui.js'

class OnboardingManager {
    constructor() {
        this.currentStep = 1
        this.totalSteps = 5
        this.userData = {}
        this.init()
    }

    init() {
        this.bindEvents()
    }

    bindEvents() {
        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault()
            ui.showSuccess("Message sent successfully! We'll get back to you soon.")
            e.target.reset()
        })
    }

    async checkAndShowOnboarding(user) {
        // Check if email is verified first
        if (!user.emailVerified) {
            this.showEmailVerificationRequired(user)
            return true
        }

        try {
            const userProfile = await firestore.getUserProfile(user.uid)

            // Check if user has completed onboarding
            if (!userProfile || !userProfile.onboardingCompleted) {
                this.showOnboarding(user)
                return true
            }

            return false
        } catch (error) {
            console.error('Error checking onboarding status:', error)
            this.showOnboarding(user)
            return true
        }
    }

    showEmailVerificationRequired(user) {
        document.getElementById('onboarding-modal').classList.remove('hidden')
        document.getElementById('onboarding-content').innerHTML = `
            <div class="text-center animate-fade-in">
                <div class="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>

                <h2 class="text-3xl font-bold text-white mb-4">Verify Your Email</h2>
                <p class="text-gray-300 mb-6 text-lg">
                    Please check your Frisco ISD email (<strong>${user.email}</strong>) and click the verification link to continue.
                </p>

                <div class="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 mb-8">
                    <div class="flex items-start space-x-3">
                        <svg class="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div class="text-left">
                            <h4 class="text-blue-300 font-semibold mb-2">Email Verification Required</h4>
                            <p class="text-blue-100 text-sm">
                                For security and to ensure you're a Frisco ISD student, you must verify your email address before accessing PeerCodex.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <button onclick="window.location.reload()"
                        class="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                        I've Verified My Email - Continue
                    </button>

                    <button onclick="window.app.resendVerificationEmail('${user.uid}')"
                        class="w-full py-3 glass rounded-xl font-semibold text-gray-200 hover:bg-white/10 transition-colors">
                        Resend Verification Email
                    </button>

                    <button onclick="window.app.handleLogout()"
                        class="w-full py-3 text-gray-400 hover:text-gray-200 transition-colors">
                        Sign Out
                    </button>
                </div>
            </div>
        `
    }

    showOnboarding(user) {
        this.userData.user = user
        // Don't guess name from user object, just leave blank for now
        this.userData.firstName = ''
        this.userData.lastName = ''
        document.getElementById('onboarding-modal').classList.remove('hidden')
        this.showStep(1)
    }

    showStep(stepNumber) {
        this.currentStep = stepNumber
        this.updateProgressSteps()

        // Save first/last name from previous step if available
        if (stepNumber === 5 && document.getElementById('firstName')) {
            this.userData.firstName = document.getElementById('firstName').value.trim()
            this.userData.lastName = document.getElementById('lastName').value.trim()
        }

        const content = this.getStepContent(stepNumber)
        document.getElementById('onboarding-content').innerHTML = content

        this.bindStepEvents()
        setTimeout(() => this.updateNextButton(), 100)
    }

    updateProgressSteps() {
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('step-primary', 'step-secondary')
            if (index + 1 < this.currentStep) {
                step.classList.add('step-primary')
            } else if (index + 1 === this.currentStep) {
                step.classList.add('step-secondary')
            }
        })
    }

    getStepContent(stepNumber) {
        switch (stepNumber) {
            case 1:
                return this.getRoleSelectionStep()
            case 2:
                return this.getAcademicStep()
            case 3:
                return this.getInterestsStep()
            case 4:
                return this.getProfileStep()
            case 5:
                return this.getReadyStep()
            default:
                return ''
        }
    }

    getRoleSelectionStep() {
        return `
      <div class="text-center animate-fade-in">
        <h2 class="text-3xl font-bold text-white mb-4">Welcome to PeerCodex, ${this.userData.firstName}!</h2>
        <p class="text-xl text-gray-300 mb-8">What brings you here?</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div class="role-card glass p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group" data-role="mentee">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Mentee</h3>
            <p class="text-gray-300">I want to learn and get help from others</p>
          </div>

          <div class="role-card glass p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group" data-role="mentor">
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Mentor</h3>
            <p class="text-gray-300">I want to help and guide others</p>
          </div>

          <div class="role-card glass p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group" data-role="both">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Both</h3>
            <p class="text-gray-300">I want to learn and help others</p>
          </div>
        </div>

        <div class="mt-8">
          <button id="next-btn" class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold opacity-50 cursor-not-allowed transition-all" disabled>
            Continue
          </button>
        </div>
      </div>
    `
    }

    getAcademicStep() {
        const apCourses = [
            'AP Calculus AB',
            'AP Calculus BC',
            'AP Statistics',
            'AP Computer Science A',
            'AP Computer Science Principles',
            'AP Physics 1',
            'AP Physics 2',
            'AP Physics C: Mechanics',
            'AP Physics C: E&M',
            'AP Chemistry',
            'AP Biology',
            'AP Environmental Science',
            'AP Psychology',
            'AP US History',
            'AP World History',
            'AP European History',
            'AP Government',
            'AP Economics (Macro)',
            'AP Economics (Micro)',
            'AP English Language',
            'AP English Literature',
            'AP Spanish',
            'AP French',
            'AP German',
            'AP Chinese',
            'AP Art History',
            'AP Studio Art',
            'AP Music Theory',
        ]

        return `
      <div class="animate-fade-in">
        <h2 class="text-3xl font-bold text-white mb-4 text-center">Academic Interests</h2>

        <div class="space-y-8">
          ${
              this.userData.roles?.includes('mentee') || this.userData.roles?.includes('both')
                  ? `
            <div>
              <h3 class="text-xl font-semibold text-white mb-4">What subjects would you like help with?</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                ${apCourses
                    .map(
                        (course) => `
                  <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" name="mentee_interests" value="${course}" class="checkbox checkbox-primary checkbox-sm">
                    <span class="text-gray-300 text-sm">${course}</span>
                  </label>
                `
                    )
                    .join('')}
              </div>
            </div>
          `
                  : ''
          }

          ${
              this.userData.roles?.includes('mentor') || this.userData.roles?.includes('both')
                  ? `
            <div>
              <h3 class="text-xl font-semibold text-white mb-4">What subjects can you help others with?</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                ${apCourses
                    .map(
                        (course) => `
                  <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" name="mentor_offers" value="${course}" class="checkbox checkbox-primary checkbox-sm">
                    <span class="text-gray-300 text-sm">${course}</span>
                  </label>
                `
                    )
                    .join('')}
              </div>
            </div>
          `
                  : ''
          }
        </div>

        <div class="flex justify-between mt-8">
          <button id="back-btn" class="px-6 py-3 glass rounded-xl font-semibold text-white hover:bg-white/20 transition-all">
            Back
          </button>
          <button id="next-btn" class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold transition-all">
            Continue
          </button>
        </div>
      </div>
    `
    }

    getInterestsStep() {
        const goals = [
            {
                id: 'collaborate',
                text: 'Find collaborators for startup/research',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
            },
            {
                id: 'academic',
                text: 'Get academic help',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
            },
            { id: 'marketplace', text: 'Share notes or sell books', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'events', text: 'Discover events and opportunities', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'exploring', text: 'Just exploring for now', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        ]

        return `
      <div class="animate-fade-in">
        <h2 class="text-3xl font-bold text-white mb-4 text-center">What are you hoping to get out of PeerCodex?</h2>
        <p class="text-gray-300 text-center mb-8">Select all that apply</p>

        <div class="space-y-4 max-w-2xl mx-auto">
          ${goals
              .map(
                  (goal) => `
            <label class="flex items-center space-x-4 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all group">
              <input type="checkbox" name="goals" value="${goal.id}" class="checkbox checkbox-primary">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${goal.icon}"></path>
                </svg>
              </div>
              <span class="text-white font-medium">${goal.text}</span>
            </label>
          `
              )
              .join('')}
        </div>

        <div class="flex justify-between mt-8">
          <button id="back-btn" class="px-6 py-3 glass rounded-xl font-semibold text-white hover:bg-white/20 transition-all">
            Back
          </button>
          <button id="next-btn" class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold transition-all">
            Continue
          </button>
        </div>
      </div>
    `
    }

    getProfileStep() {
        return `
            <div class="animate-fade-in">
                <h2 class="text-3xl font-bold text-white mb-4 text-center">Complete Your Profile</h2>
                <p class="text-gray-300 text-center mb-8">Let other Frisco ISD students know who you are</p>

                <div class="max-w-lg mx-auto space-y-6">
                    <div class="text-center mb-8">
                        <div class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                            <span class="text-white font-bold text-2xl">${(this.userData.firstName || 'U').charAt(0).toUpperCase()}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" id="firstName" placeholder="First Name" value="${this.userData.firstName || ''}"
                            class="w-full p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400" required>
                        <input type="text" id="lastName" placeholder="Last Name" value="${this.userData.lastName || ''}"
                            class="w-full p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400" required>
                    </div>

                    <div>
                        <select id="gradeLevel" class="w-full p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white" required>
                            <option value="">Select Your Grade Level</option>
                            <option value="9">9th Grade (Freshman)</option>
                            <option value="10">10th Grade (Sophomore)</option>
                            <option value="11">11th Grade (Junior)</option>
                            <option value="12">12th Grade (Senior)</option>
                        </select>
                    </div>

                    <div>
                        <select id="schoolName" class="w-full p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white" required>
                            <option value="">Select Your School</option>
                            <option value="Centennial High School">Centennial High School</option>
                            <option value="Frisco High School">Frisco High School</option>
                            <option value="Heritage High School">Heritage High School</option>
                            <option value="Independence High School">Independence High School</option>
                            <option value="Lebanon Trail High School">Lebanon Trail High School</option>
                            <option value="Liberty High School">Liberty High School</option>
                            <option value="Little Elm High School">Little Elm High School</option>
                            <option value="Lone Star High School">Lone Star High School</option>
                            <option value="Memorial High School">Memorial High School</option>
                            <option value="Panther Creek High School">Panther Creek High School</option>
                            <option value="Reedy High School">Reedy High School</option>
                            <option value="Wakeland High School">Wakeland High School</option>
                        </select>
                    </div>

                    <div>
                        <textarea id="bio" placeholder="Tell other students about yourself (optional)" maxlength="100"
                            class="w-full p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 resize-none" rows="3"></textarea>
                        <p class="text-xs text-gray-400 mt-1"><span id="bio-count">0</span>/100 characters</p>
                    </div>
                </div>

                <div class="flex justify-between mt-8">
                    <button onclick="window.onboarding.showStep(3)" class="px-8 py-3 glass rounded-xl font-semibold text-gray-300 hover:text-white transition-colors">
                        Back
                    </button>
                    <button id="next-btn" onclick="window.onboarding.nextStep()" class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300" disabled>
                        Next
                    </button>
                </div>
            </div>
        `
    }

    getReadyStep() {
        // Use the entered first and last name for the greeting
        const name = `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim() || 'User'
        return `
      <div class="text-center animate-fade-in">
        <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 class="text-4xl font-bold text-white mb-4">You're all set, ${name}!</h2>
        <p class="text-xl text-gray-300 mb-8">Welcome to the PeerCodex community. Let's dive in and start connecting!</p>

        <div class="glass p-6 rounded-2xl max-w-md mx-auto mb-8">
          <h3 class="text-white font-semibold mb-3">Quick Tips:</h3>
          <ul class="text-gray-300 text-left space-y-2">
            <li>• Complete your profile for better matches</li>
            <li>• Be respectful and helpful in all interactions</li>
            <li>• Use the marketplace responsibly</li>
            <li>• Don't hesitate to ask for help</li>
          </ul>
        </div>

        <button id="complete-onboarding" class="px-12 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
          Go to Dashboard
        </button>
      </div>
    `
    }

    bindStepEvents() {
        // Role selection
        document.querySelectorAll('.role-card').forEach((card) => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.role-card').forEach((c) => c.classList.remove('ring-2', 'ring-indigo-500'))
                card.classList.add('ring-2', 'ring-indigo-500')

                const role = card.dataset.role
                this.userData.roles = role === 'both' ? ['mentor', 'mentee'] : [role]

                this.updateNextButton()
            })
        })

        // Navigation buttons
        document.getElementById('next-btn')?.addEventListener('click', () => {
            if (this.validateCurrentStep()) {
                this.handleNext()
            }
        })

        document.getElementById('back-btn')?.addEventListener('click', () => {
            this.showStep(this.currentStep - 1)
        })

        document.getElementById('complete-onboarding')?.addEventListener('click', () => {
            this.completeOnboarding()
        })

        // Add validation for profile step
        if (this.currentStep === 4) {
            const requiredFields = ['firstName', 'lastName', 'gradeLevel']
            requiredFields.forEach((fieldId) => {
                const field = document.getElementById(fieldId)
                if (field) {
                    field.addEventListener('input', () => this.updateNextButton())
                    field.addEventListener('change', () => this.updateNextButton())
                }
            })
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1: // Role selection
                if (!this.userData.roles || this.userData.roles.length === 0) {
                    ui.showError('Please select your role to continue')
                    return false
                }
                return true

            case 2: // Academic step
                // Optional step - no validation needed
                return true

            case 3: // Interests step
                // Optional step - no validation needed
                return true

            case 4: // Profile step
                const firstName = document.getElementById('firstName')?.value?.trim()
                const lastName = document.getElementById('lastName')?.value?.trim()
                const gradeLevel = document.getElementById('gradeLevel')?.value

                if (!firstName) {
                    ui.showError('Please enter your first name')
                    document.getElementById('firstName')?.focus()
                    return false
                }

                if (!lastName) {
                    ui.showError('Please enter your last name')
                    document.getElementById('lastName')?.focus()
                    return false
                }

                if (!gradeLevel) {
                    ui.showError('Please select your grade level')
                    document.getElementById('gradeLevel')?.focus()
                    return false
                }

                return true

            default:
                return true
        }
    }

    updateNextButton() {
        const nextBtn = document.getElementById('next-btn')
        if (!nextBtn) return

        let isValid = false

        switch (this.currentStep) {
            case 1: // Role selection
                isValid = this.userData.roles && this.userData.roles.length > 0
                break

            case 4: // Profile step
                const firstName = document.getElementById('firstName')?.value?.trim()
                const lastName = document.getElementById('lastName')?.value?.trim()
                const gradeLevel = document.getElementById('gradeLevel')?.value
                isValid = firstName && lastName && gradeLevel
                break

            default:
                isValid = true
        }

        if (isValid) {
            nextBtn.disabled = false
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed')
            nextBtn.classList.add('hover:shadow-xl')
        } else {
            nextBtn.disabled = true
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed')
            nextBtn.classList.remove('hover:shadow-xl')
        }
    }

    handleNext() {
        // Save current step data
        this.saveCurrentStepData()

        if (this.currentStep < this.totalSteps) {
            this.showStep(this.currentStep + 1)
        }
    }

    saveCurrentStepData() {
        switch (this.currentStep) {
            case 2:
                this.userData.menteeInterests = Array.from(document.querySelectorAll('input[name="mentee_interests"]:checked')).map((cb) => cb.value)
                this.userData.mentorOffers = Array.from(document.querySelectorAll('input[name="mentor_offers"]:checked')).map((cb) => cb.value)
                break
            case 3:
                this.userData.goals = Array.from(document.querySelectorAll('input[name="goals"]:checked')).map((cb) => cb.value)
                break
            case 4:
                this.userData.profile = {
                    firstName: document.getElementById('firstName').value.trim(),
                    lastName: document.getElementById('lastName').value.trim(),
                    bio: document.getElementById('bio').value.trim(),
                    gradeLevel: document.getElementById('gradeLevel').value,
                    schoolName: document.getElementById('schoolName').value.trim(),
                }
                break
        }
    }

    async completeOnboarding() {
        try {
            const user = this.userData.user

            // Final check for email verification
            await user.reload()
            if (!user.emailVerified) {
                ui.showError('Please verify your email before completing onboarding')
                this.showEmailVerificationRequired(user)
                return
            }

            // Prepare user data with mandatory school name
            const userData = {
                uid: user.uid,
                email: user.email,
                firstName: this.userData.profile.firstName,
                lastName: this.userData.profile.lastName,
                bio: this.userData.profile.bio || '',
                gradeLevel: this.userData.profile.gradeLevel,
                schoolName: this.userData.profile.schoolName, // Now mandatory
                roles: this.userData.roles,
                menteeInterests: this.userData.menteeInterests || [],
                mentorOffers: this.userData.mentorOffers || [],
                goals: this.userData.goals || [],
                onboardingCompleted: true,
                emailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            // Save to Firestore
            try {
                const success = await firestore.setUserProfile(user.uid, userData)
                if (!success) {
                    localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(userData))
                    ui.showSuccess('Profile saved locally. Will sync when online.')
                } else {
                    ui.showSuccess('Welcome to PeerCodex!')
                }
            } catch (error) {
                console.warn('Failed to save to Firestore:', error)
                localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(userData))
                ui.showSuccess('Profile saved locally. Will sync when online.')
            }

            // Close onboarding modal
            document.getElementById('onboarding-modal').classList.add('hidden')

            // Immediately update UI with the correct name from onboarding
            ui.updateUserInfo({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
            })

            // Navigate to dashboard
            router.navigate('/dashboard')
        } catch (error) {
            console.error('Onboarding error:', error)
            ui.showError('Failed to save profile. Please try again.')
        }
    }
}

export const onboarding = new OnboardingManager()
