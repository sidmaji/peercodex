'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved) {
            setIsDark(saved === 'dark')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <div className={isDark ? 'dark' : ''}>{children}</div>
        </ThemeContext.Provider>
    )
}
