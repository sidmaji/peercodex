import { ui } from './ui.js'

class ContactManager {
    constructor() {
        this.init()
    }

    init() {
        this.bindEvents()
    }

    bindEvents() {
        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault()
            this.handleContactForm(e.target)
        })
    }

    async handleContactForm(form) {
        const formData = new FormData(form)
        const data = {
            firstName: formData.get('firstName') || form.querySelector('input[placeholder="First Name"]').value,
            lastName: formData.get('lastName') || form.querySelector('input[placeholder="Last Name"]').value,
            email: formData.get('email') || form.querySelector('input[type="email"]').value,
            subject: formData.get('subject') || form.querySelector('select').value,
            message: formData.get('message') || form.querySelector('textarea').value,
            timestamp: new Date().toISOString(),
        }

        if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
            ui.showError('Please fill in all fields')
            return
        }

        try {
            // Option 1: Use EmailJS (recommended for client-side)
            // You'll need to set up EmailJS account and get these IDs
            // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');

            // Option 2: Use Netlify Forms (if hosting on Netlify)
            // Just add netlify attribute to form and it handles everything

            // Option 3: Use Firebase Functions (server-side processing)
            // await this.sendToFirebaseFunction(data);

            // Option 4: Use a third-party service like Formspree
            // await this.sendToFormspree(data);

            // For now, just simulate success and log data
            console.log('Contact form data:', data)

            // Store in localStorage as backup
            const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
            contacts.push(data)
            localStorage.setItem('contactSubmissions', JSON.stringify(contacts))

            ui.showSuccess("Message sent successfully! We'll get back to you soon.")
            form.reset()
        } catch (error) {
            console.error('Contact form error:', error)
            ui.showError('Failed to send message. Please try again later.')
        }
    }

    // Example: Send to Formspree (free service)
    async sendToFormspree(data) {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to send message')
        }

        return response.json()
    }

    // Example: Send to Firebase Function
    async sendToFirebaseFunction(data) {
        const response = await fetch('https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/sendContactEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to send message')
        }

        return response.json()
    }
}

export const contactManager = new ContactManager()
