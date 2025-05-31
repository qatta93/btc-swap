import { useState, useEffect } from "react"
import {
    TokenBTC,
    TokenETH,
    TokenGRT,
    NetworkBinanceSmartChain,
    NetworkEthereum,
    NetworkAvalanche,
} from "@token-icons/react"

export interface FloatingIcon {
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

export const useBackgroundWrapper = () => {
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
                    if (typeof window !== "undefined") {
                        x = Math.random() * (window.innerWidth - 200) + 100
                        y = Math.random() * (window.innerHeight - 200) + 100

                        validPosition = positions.every((pos) => {
                            const distance = Math.sqrt((x! - pos.x) ** 2 + (y! - pos.y) ** 2)
                            return distance >= minDistance
                        })
                    } else {
    
                        x = Math.random() * 800 + 100
                        y = Math.random() * 600 + 100
                        validPosition = true;
                    }
                    attempts++
                }

                if (validPosition) {
                    positions.push({ x: x!, y: y! })
                } else {
                     if (typeof window !== "undefined") {
                        positions.push({
                            x: Math.random() * (window.innerWidth - 200) + 100,
                            y: Math.random() * (window.innerHeight - 200) + 100,
                        })
                    } else {
                        positions.push({
                            x: Math.random() * 800 + 100,
                            y: Math.random() * 600 + 100,
                        })
                    }
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

    return { icons, hoveredIcon, setHoveredIcon }
}
