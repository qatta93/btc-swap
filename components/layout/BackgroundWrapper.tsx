"use client"

import { useState, useEffect, ReactNode } from "react"
import {
    TokenBTC,
    TokenETH,
    TokenGRT,
    NetworkBinanceSmartChain,
    NetworkEthereum,
    NetworkAvalanche,
} from "@token-icons/react"
import {ThemeToggleSwitch} from "@/components/atoms/ThemeToggleSwitch";

interface FloatingIcon {
    id: number
    Icon: any
    baseX: number
    baseY: number
    xOffset: number
    yOffset: number
    size: number
    speed: number
    direction: { x: number; y: number }
}

type BackgroundWrapperProps = {
    children: ReactNode
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
    const [icons, setIcons] = useState<FloatingIcon[]>([])
    const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)

    const cryptoIcons = [
        TokenBTC,
        TokenETH,
        TokenGRT,
        NetworkBinanceSmartChain,
        NetworkEthereum,
        NetworkAvalanche,
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

        const positions = generateWellSpacedPositions(cryptoIcons.length, 200)

        const initialIcons: FloatingIcon[] = positions.map((pos, i) => ({
            id: i,
            Icon: cryptoIcons[i],
            baseX: pos.x,
            baseY: pos.y,
            xOffset: 0,
            yOffset: 0,
            size: 100,
            speed: 0.35,
            direction: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
            },
        }))

        setIcons(initialIcons)
    }, [])

    useEffect(() => {
        if (hoveredIcon !== null) return

        const animate = () => {
            setIcons((prev) =>
                prev.map((icon) => {
                    let newX = icon.xOffset + icon.direction.x * icon.speed
                    let newY = icon.yOffset + icon.direction.y * icon.speed

                    if (Math.abs(newX) > 50) {
                        icon.direction.x *= -1
                        newX = Math.sign(newX) * 50
                    }

                    if (Math.abs(newY) > 50) {
                        icon.direction.y *= -1
                        newY = Math.sign(newY) * 50
                    }

                    return {
                        ...icon,
                        xOffset: newX,
                        yOffset: newY,
                    }
                })
            )
        }

        const interval = setInterval(animate, 50)
        return () => clearInterval(interval)
    }, [hoveredIcon])

    return (
        <div className="fixed inset-0 overflow-hidden min-h-screen flex items-center justify-center bg-background px-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-violet-500 opacity-60" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none" />
            {children}
            <div className="absolute inset-0 z-50">
                <div className="absolute top-4 right-4 z-50">
                    <ThemeToggleSwitch/>
                </div>
                {icons.map((icon) => {
                    const {Icon} = icon
                    const isHovered = hoveredIcon === icon.id

                    return (
                        <div
                            key={icon.id}
                            className={`absolute transition-all duration-500 ${
                                isHovered ? "scale-[1.1] z-50" : "scale-100"
                            }`}
                            style={{
                                left: `${icon.baseX + icon.xOffset}px`,
                                top: `${icon.baseY + icon.yOffset}px`,
                                width: `${icon.size + 40}px`,
                                height: `${icon.size + 40}px`,
                            }}
                            onMouseEnter={() => setHoveredIcon(icon.id)}
                            onMouseLeave={() => setHoveredIcon(null)}
                        >
                            <div
                                className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-500 ${
                                    isHovered
                                        ? "bg-white/20 backdrop-blur-sm border-2 border-white/40"
                                        : "bg-transparent"
                                }`}
                            >
                                <Icon
                                    className={`transition-all duration-500 ${
                                        isHovered
                                            ? "w-28 h-28"
                                            : "w-24 h-24  opacity-30"
                                    }`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
