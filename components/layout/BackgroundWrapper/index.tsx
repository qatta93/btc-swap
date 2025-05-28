"use client"

import { ReactNode } from "react"
import { ThemeToggleSwitch } from "@/components/atoms/ThemeToggleSwitch"
import { useBackgroundWrapper } from "./useBackgroundWrapper"

type BackgroundWrapperProps = {
    children: ReactNode
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
    const { icons, hoveredIcon, setHoveredIcon } = useBackgroundWrapper()

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
