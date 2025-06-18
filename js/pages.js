export const pages = {
    dashboard: () => `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div class="text-sm text-gray-500 dark:text-gray-400">Welcome back!</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">Quick Stats</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Your activity overview</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Projects</span>
              <span class="font-medium text-gray-800 dark:text-white">0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Connections</span>
              <span class="font-medium text-gray-800 dark:text-white">0</span>
            </div>
          </div>
        </div>

        <div class="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Latest updates</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
        </div>

        <div class="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">Upcoming</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Events & deadlines</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">No upcoming events</p>
        </div>
      </div>
    </div>
  `,

    marketplace: () => `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Marketplace</h1>
      <div class="glass p-8 rounded-2xl text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Marketplace Coming Soon</h2>
        <p class="text-gray-600 dark:text-gray-300">Buy and sell textbooks, notes, and school supplies with fellow students.</p>
      </div>
    </div>
  `,

    forum: () => `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Forum</h1>
      <div class="glass p-8 rounded-2xl text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Forum Coming Soon</h2>
        <p class="text-gray-600 dark:text-gray-300">Discuss projects, share ideas, and collaborate with peers.</p>
      </div>
    </div>
  `,

    mentor: () => `
        <div class="space-y-8">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Mentoring Hub</h1>
                <div class="flex items-center space-x-4">
                    <select id="subject-filter" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white">
                        <option value="">All Subjects</option>
                        <option value="AP Calculus AB">AP Calculus AB</option>
                        <option value="AP Calculus BC">AP Calculus BC</option>
                        <option value="AP Computer Science A">AP Computer Science A</option>
                        <option value="AP Physics 1">AP Physics 1</option>
                        <option value="AP Chemistry">AP Chemistry</option>
                        <option value="AP Biology">AP Biology</option>
                    </select>
                </div>
            </div>

            <!-- Requests Section -->
            <div id="requests-section" class="glass p-6 rounded-2xl">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Mentoring Requests</h2>
                <div id="requests-list">
                    <div class="text-center py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                        <p class="text-gray-500 dark:text-gray-400 mt-4">Loading requests...</p>
                    </div>
                </div>
            </div>

            <!-- Available Mentors Section -->
            <div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Find a Mentor</h2>
                <div id="mentors-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="text-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p class="text-gray-500 dark:text-gray-400 mt-4">Loading mentors...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Connect Modal -->
        <div id="connect-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="glass-modal p-8 rounded-3xl max-w-md w-full animate-fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Connect with Mentor</h2>
                    <button id="close-connect-modal" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div id="mentor-info" class="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <!-- Mentor info will be populated here -->
                </div>

                <form id="connect-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                        <select id="connect-subject" class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                        <textarea id="connect-message" rows="4" placeholder="Tell them why you'd like their help and what you're working on..."
                            class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white resize-none" required></textarea>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4">
                        <button type="button" id="cancel-connect-btn" class="px-6 py-3 glass rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                            Send Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,

    profile: (userProfile, firebaseUser) => {
        const profile = userProfile || {}
        const user = firebaseUser || {}

        // Always use firstName/lastName from profile if available
        const displayName = profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : user.displayName || 'User'

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
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
                <button id="edit-profile-btn" class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Edit Profile
                </button>
            </div>

            <!-- Profile Overview -->
            <div class="glass p-8 rounded-2xl">
                <div class="flex items-center space-x-6 mb-8">
                    <div class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        ${(profile.firstName || user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            ${displayName}
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-1">${profile.email || user.email || 'No email'}</p>
                        ${profile.bio ? `<p class="text-gray-500 dark:text-gray-400 italic">"${profile.bio}"</p>` : ''}
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Personal Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">First Name:</span>
                                <span class="font-medium text-gray-800 dark:text-white">${profile.firstName || 'Not set'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Last Name:</span>
                                <span class="font-medium text-gray-800 dark:text-white">${profile.lastName || 'Not set'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Grade Level:</span>
                                <span class="font-medium text-gray-800 dark:text-white">${profile.gradeLevel ? `${profile.gradeLevel}th Grade` : 'Not set'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">School:</span>
                                <span class="font-medium text-gray-800 dark:text-white">${profile.schoolName || 'Not set'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Account Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Roles:</span>
                                <span class="font-medium text-gray-800 dark:text-white">
                                    ${profile.roles ? profile.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ') : 'Not set'}
                                </span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Member Since:</span>
                                <span class="font-medium text-gray-800 dark:text-white">
                                    ${profile.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                                </span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Email Verified:</span>
                                <span class="font-medium ${user.emailVerified ? 'text-green-600' : 'text-red-600'}">
                                    ${user.emailVerified ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Academic Interests -->
            ${
                profile.menteeInterests?.length || profile.mentorOffers?.length
                    ? `
            <div class="glass p-8 rounded-2xl">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">Academic Interests</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${
                        profile.menteeInterests?.length
                            ? `
                    <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Looking for help in:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${profile.menteeInterests
                                .map((subject) => `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">${subject}</span>`)
                                .join('')}
                        </div>
                    </div>
                    `
                            : ''
                    }
                    ${
                        profile.mentorOffers?.length
                            ? `
                    <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Can help others with:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${profile.mentorOffers
                                .map((subject) => `<span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">${subject}</span>`)
                                .join('')}
                        </div>
                    </div>
                    `
                            : ''
                    }
                </div>
            </div>
            `
                    : ''
            }

            <!-- Goals -->
            ${
                profile.goals?.length
                    ? `
            <div class="glass p-8 rounded-2xl">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">Goals & Interests</h3>
                <div class="flex flex-wrap gap-3">
                    ${profile.goals
                        .map((goal) => {
                            const goalLabels = {
                                collaborate: 'Find Collaborators',
                                academic: 'Get Academic Help',
                                marketplace: 'Share Notes/Sell Books',
                                events: 'Discover Events',
                                exploring: 'Just Exploring',
                            }
                            return `<span class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">${goalLabels[goal] || goal}</span>`
                        })
                        .join('')}
                </div>
            </div>
            `
                    : ''
            }

            <!-- Actions -->
            <div class="glass p-6 rounded-2xl">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Actions</h3>
                <div class="flex flex-wrap gap-4">
                    ${
                        !user.emailVerified
                            ? `
                    <button id="resend-verification-btn" class="px-4 py-2 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition-colors">
                        Resend Email Verification
                    </button>
                    `
                            : ''
                    }
                    <button id="change-password-btn" class="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                        Change Password
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Profile Modal -->
        <div id="edit-profile-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="glass-modal p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
                    <button id="close-edit-modal" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form id="edit-profile-form" class="space-y-8">
                    <!-- Basic Information -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Basic Information
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                <input type="text" id="edit-firstName" value="${profile.firstName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                <input type="text" id="edit-lastName" value="${profile.lastName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                            <textarea id="edit-bio" rows="3" maxlength="100" placeholder="Tell others about yourself..."
                                class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white resize-none">${
                                    profile.bio || ''
                                }</textarea>
                            <p class="text-xs text-gray-500 mt-1"><span id="bio-count">${(profile.bio || '').length}</span>/100 characters</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade Level</label>
                                <select id="edit-gradeLevel" class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white">
                                    <option value="">Select Grade</option>
                                    <option value="9" ${profile.gradeLevel === '9' ? 'selected' : ''}>9th Grade</option>
                                    <option value="10" ${profile.gradeLevel === '10' ? 'selected' : ''}>10th Grade</option>
                                    <option value="11" ${profile.gradeLevel === '11' ? 'selected' : ''}>11th Grade</option>
                                    <option value="12" ${profile.gradeLevel === '12' ? 'selected' : ''}>12th Grade</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School Name</label>
                                <input type="text" id="edit-schoolName" value="${profile.schoolName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <!-- Role Selection -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Your Role
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="mentee" ${profile.roles?.includes('mentee') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Mentee (Looking for help)</span>
                            </label>
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="mentor" ${profile.roles?.includes('mentor') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Mentor (Can help others)</span>
                            </label>
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="collaborator" ${profile.roles?.includes('collaborator') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Collaborator (Project partner)</span>
                            </label>
                        </div>
                    </div>

                    <!-- Academic Interests -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Academic Interests
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Subjects you can help others with:</h4>
                                <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl p-4">
                                    ${apCourses
                                        .map(
                                            (course) => `
                                        <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                            <input type="checkbox" name="edit-mentor-offers" value="${course}" ${
                                                profile.mentorOffers?.includes(course) ? 'checked' : ''
                                            } class="checkbox checkbox-primary checkbox-sm">
                                            <span class="text-gray-700 dark:text-gray-200 text-sm">${course}</span>
                                        </label>
                                    `
                                        )
                                        .join('')}
                                </div>
                            </div>

                            <div>
                                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Subjects you'd like help with:</h4>
                                <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl p-4">
                                    ${apCourses
                                        .map(
                                            (course) => `
                                        <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                            <input type="checkbox" name="edit-mentee-interests" value="${course}" ${
                                                profile.menteeInterests?.includes(course) ? 'checked' : ''
                                            } class="checkbox checkbox-primary checkbox-sm">
                                            <span class="text-gray-700 dark:text-gray-200 text-sm">${course}</span>
                                        </label>
                                    `
                                        )
                                        .join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Goals -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Goals & Interests
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${[
                                { id: 'collaborate', text: 'Find collaborators for startup/research' },
                                { id: 'academic', text: 'Get academic help' },
                                { id: 'marketplace', text: 'Share notes or sell books' },
                                { id: 'events', text: 'Discover events and opportunities' },
                                { id: 'exploring', text: 'Just exploring for now' },
                            ]
                                .map(
                                    (goal) => `
                                <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                    <input type="checkbox" name="edit-goals" value="${goal.id}" ${profile.goals?.includes(goal.id) ? 'checked' : ''} class="checkbox checkbox-primary">
                                    <span class="text-gray-700 dark:text-gray-200">${goal.text}</span>
                                </label>
                            `
                                )
                                .join('')}
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <button type="button" id="cancel-edit-btn" class="px-6 py-3 glass rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
    },

    getEditProfileModal: (profile) => {
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
        <!-- Edit Profile Modal -->
        <div id="edit-profile-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="glass-modal p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
                    <button id="close-edit-modal" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form id="edit-profile-form" class="space-y-8">
                    <!-- Basic Information -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Basic Information
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                <input type="text" id="edit-firstName" value="${profile.firstName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                <input type="text" id="edit-lastName" value="${profile.lastName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                            <textarea id="edit-bio" rows="3" maxlength="100" placeholder="Tell others about yourself..."
                                class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white resize-none">${
                                    profile.bio || ''
                                }</textarea>
                            <p class="text-xs text-gray-500 mt-1"><span id="bio-count">${(profile.bio || '').length}</span>/100 characters</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade Level</label>
                                <select id="edit-gradeLevel" class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white">
                                    <option value="">Select Grade</option>
                                    <option value="9" ${profile.gradeLevel === '9' ? 'selected' : ''}>9th Grade</option>
                                    <option value="10" ${profile.gradeLevel === '10' ? 'selected' : ''}>10th Grade</option>
                                    <option value="11" ${profile.gradeLevel === '11' ? 'selected' : ''}>11th Grade</option>
                                    <option value="12" ${profile.gradeLevel === '12' ? 'selected' : ''}>12th Grade</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School Name</label>
                                <input type="text" id="edit-schoolName" value="${profile.schoolName || ''}"
                                    class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <!-- Role Selection -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Your Role
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="mentee" ${profile.roles?.includes('mentee') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Mentee (Looking for help)</span>
                            </label>
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="mentor" ${profile.roles?.includes('mentor') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Mentor (Can help others)</span>
                            </label>
                            <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                <input type="checkbox" name="edit-roles" value="collaborator" ${profile.roles?.includes('collaborator') ? 'checked' : ''} class="checkbox checkbox-primary">
                                <span class="text-gray-700 dark:text-gray-200">Collaborator (Project partner)</span>
                            </label>
                        </div>
                    </div>

                    <!-- Academic Interests -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Academic Interests
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Subjects you can help others with:</h4>
                                <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl p-4">
                                    ${apCourses
                                        .map(
                                            (course) => `
                                        <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                            <input type="checkbox" name="edit-mentor-offers" value="${course}" ${
                                                profile.mentorOffers?.includes(course) ? 'checked' : ''
                                            } class="checkbox checkbox-primary checkbox-sm">
                                            <span class="text-gray-700 dark:text-gray-200 text-sm">${course}</span>
                                        </label>
                                    `
                                        )
                                        .join('')}
                                </div>
                            </div>

                            <div>
                                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Subjects you'd like help with:</h4>
                                <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl p-4">
                                    ${apCourses
                                        .map(
                                            (course) => `
                                        <label class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                            <input type="checkbox" name="edit-mentee-interests" value="${course}" ${
                                                profile.menteeInterests?.includes(course) ? 'checked' : ''
                                            } class="checkbox checkbox-primary checkbox-sm">
                                            <span class="text-gray-700 dark:text-gray-200 text-sm">${course}</span>
                                        </label>
                                    `
                                        )
                                        .join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Goals -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Goals & Interests
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${[
                                { id: 'collaborate', text: 'Find collaborators for startup/research' },
                                { id: 'academic', text: 'Get academic help' },
                                { id: 'marketplace', text: 'Share notes or sell books' },
                                { id: 'events', text: 'Discover events and opportunities' },
                                { id: 'exploring', text: 'Just exploring for now' },
                            ]
                                .map(
                                    (goal) => `
                                <label class="flex items-center space-x-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                                    <input type="checkbox" name="edit-goals" value="${goal.id}" ${profile.goals?.includes(goal.id) ? 'checked' : ''} class="checkbox checkbox-primary">
                                    <span class="text-gray-700 dark:text-gray-200">${goal.text}</span>
                                </label>
                            `
                                )
                                .join('')}
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <button type="button" id="cancel-edit-btn" class="px-6 py-3 glass rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
    },

    mentor: () => `
        <div class="space-y-8">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Mentoring Hub</h1>
                <div class="flex items-center space-x-4">
                    <select id="subject-filter" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white">
                        <option value="">All Subjects</option>
                        <option value="AP Calculus AB">AP Calculus AB</option>
                        <option value="AP Calculus BC">AP Calculus BC</option>
                        <option value="AP Computer Science A">AP Computer Science A</option>
                        <option value="AP Physics 1">AP Physics 1</option>
                        <option value="AP Chemistry">AP Chemistry</option>
                        <option value="AP Biology">AP Biology</option>
                    </select>
                </div>
            </div>

            <!-- Requests Section -->
            <div id="requests-section" class="glass p-6 rounded-2xl">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Mentoring Requests</h2>
                <div id="requests-list">
                    <div class="text-center py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                        <p class="text-gray-500 dark:text-gray-400 mt-4">Loading requests...</p>
                    </div>
                </div>
            </div>

            <!-- Available Mentors Section -->
            <div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Find a Mentor</h2>
                <div id="mentors-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="text-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p class="text-gray-500 dark:text-gray-400 mt-4">Loading mentors...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Connect Modal -->
        <div id="connect-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="glass-modal p-8 rounded-3xl max-w-md w-full animate-fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Connect with Mentor</h2>
                    <button id="close-connect-modal" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div id="mentor-info" class="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <!-- Mentor info will be populated here -->
                </div>

                <form id="connect-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                        <select id="connect-subject" class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                        <textarea id="connect-message" rows="4" placeholder="Tell them why you'd like their help and what you're working on..."
                            class="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white resize-none" required></textarea>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4">
                        <button type="button" id="cancel-connect-btn" class="px-6 py-3 glass rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                            Send Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,
}
