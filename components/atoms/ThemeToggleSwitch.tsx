"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeToggleSwitchProps {
    className?: string;
}

export const ThemeToggleSwitch = ({ className }: ThemeToggleSwitchProps) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
        relative inline-flex h-12 w-20 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
        ${isDark ? "bg-[#7f73a2]" : "bg-gray-200"}
        ${className}
      `}
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
        >
            <Sun
                className={`absolute left-2 h-5 w-5 transition-opacity duration-300 ${
                    isDark ? "opacity-30 text-gray-400" : "opacity-100 text-yellow-500"
                }`}
            />
            <Moon
                className={`absolute right-2 h-5 w-5 transition-opacity duration-300 ${
                    isDark ? "opacity-100 text-blue-300" : "opacity-30 text-gray-400"
                }`}
            />

            <span
                className={`
          inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-10" : "translate-x-1"}
        `}
            >
                <span className="flex h-full w-full items-center justify-center">
          {isDark ? <Moon className="h-4 w-4 text-gray-800" /> : <Sun className="h-4 w-4 text-yellow-500" />}
        </span>
      </span>
        </button>
    )
}
