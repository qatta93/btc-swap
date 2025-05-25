"use client"

import {useState, useEffect, ReactNode} from "react"
import { Bitcoin, Coins, DollarSign } from "lucide-react"

interface FloatingIcon {
    id: number
    Icon: any
    x: number
    y: number
    size: number
    speed: number
    direction: { x: number; y: number }
    color: string
}

type BackgroundWrapperProps = {
    children: ReactNode
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
    const [icons, setIcons] = useState<FloatingIcon[]>([])
    const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)

    const cryptoIcons = [Bitcoin, Coins, DollarSign]
    const colors = [
        "text-pink-500",
        "text-indigo-600",
        "text-violet-600",
        "text-purple-600",
        "text-indigo-700",
        "text-violet-700",
        "text-pink-700",
        "text-indigo-800",
        "text-violet-800",
    ]

    useEffect(() => {
        const generateWellSpacedPositions = (count: number, minDistance: number) => {
            const positions: { x: number; y: number }[] = []
            const maxAttempts = 100

            for (let i = 0; i < count; i++) {
                let attempts = 0
                let validPosition = false
                let x, y

                while (!validPosition && attempts < maxAttempts) {
                    x = Math.random() * (window.innerWidth - 200) + 100
                    y = Math.random() * (window.innerHeight - 200) + 100

                    validPosition = positions.every((pos) => {
                        const distance = Math.sqrt((x! - pos.x) ** 2 + (y! - pos.y) ** 2)
                        return distance >= minDistance
                    })

                    attempts++
                }

                if (validPosition) {
                    positions.push({ x: x!, y: y! })
                } else {
                    positions.push({
                        x: Math.random() * (window.innerWidth - 200) + 100,
                        y: Math.random() * (window.innerHeight - 200) + 100,
                    })
                }
            }

            return positions
        }

        const positions = generateWellSpacedPositions(8, 200)

        const initialIcons: FloatingIcon[] = positions.map((pos, i) => ({
            id: i,
            Icon: cryptoIcons[i % cryptoIcons.length],
            x: pos.x,
            y: pos.y,
            size: 100,
            speed: 0.3,
            direction: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
            },
            color: colors[i % colors.length],
        }))

        setIcons(initialIcons)
    }, [])

    useEffect(() => {
        if (hoveredIcon !== null) return

        const animateIcons = () => {
            setIcons((prevIcons) =>
                prevIcons.map((icon) => {
                    let newX = icon.x + icon.direction.x * icon.speed
                    let newY = icon.y + icon.direction.y * icon.speed
                    const newDirection = { ...icon.direction }

                    if (newX <= 50 || newX >= window.innerWidth - 100) {
                        newDirection.x *= -1
                        newX = Math.max(50, Math.min(window.innerWidth - 100, newX))
                    }
                    if (newY <= 50 || newY >= window.innerHeight - 100) {
                        newDirection.y *= -1
                        newY = Math.max(50, Math.min(window.innerHeight - 100, newY))
                    }

                    return {
                        ...icon,
                        x: newX,
                        y: newY,
                        direction: newDirection,
                    }
                }),
            )
        }

        const interval = setInterval(animateIcons, 50)
        return () => clearInterval(interval)
    }, [hoveredIcon])

    return (
        <div className="fixed inset-0 overflow-hidden min-h-screen flex items-center justify-center bg-background px-4">            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-violet-500 opacity-60" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none" />
            {children}
            <div className="absolute inset-0 z-50">
                {icons.map((icon) => {
                    const { Icon } = icon
                    const isHovered = hoveredIcon === icon.id

                    return (
                        <div
                            key={icon.id}
                            className={`absolute cursor-pointer transition-all duration-500 ${
                                isHovered ? "scale-[1.1] z-50" : "scale-100"
                            }`}
                            style={{
                                left: `${icon.x}px`,
                                top: `${icon.y}px`,
                                width: `${icon.size + 40}px`,
                                height: `${icon.size + 40}px`,
                            }}
                            onMouseEnter={() => {
                                console.log("HOVER START:", icon.id)
                                setHoveredIcon(icon.id)
                            }}
                            onMouseLeave={() => {
                                console.log("HOVER END:", icon.id)
                                setHoveredIcon(null)
                            }}
                        >
                            <div
                                className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-500 ${
                                    isHovered ? "bg-white/20 backdrop-blur-sm border-2 border-white/40" : "bg-transparent"
                                }`}
                            >
                                <Icon
                                    className={`transition-all duration-500 ${icon.color} ${
                                        isHovered ? "w-28 h-28 blur-none opacity-100 drop-shadow-2xl" : "w-24 h-24 blur-[10px] !opacity-10"
                                    }`}
                                    style={{
                                        filter: isHovered
                                            ? "drop-shadow(0 0 20px currentColor) brightness(1.5)"
                                            : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
