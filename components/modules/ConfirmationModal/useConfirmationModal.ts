import { useState, useRef, useEffect } from "react";

export function useConfirmationModal(isOpen: boolean, onClose: () => void) {
    const [showMore, setShowMore] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return {
        showMore,
        setShowMore,
        isAnimating,
        modalRef,
    };
}
