'use client'

import { ReactNode } from 'react'

type CenteredWrapperProps = {
    children: ReactNode
}

export default function CenteredWrapper({ children }: CenteredWrapperProps) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            {children}
        </main>
    )
}
