import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
    className?: string
    showText?: boolean
    size?: "sm" | "md" | "lg"
    textClassName?: string
}

export function BrandLogo({ className, showText = true, size = "md", textClassName }: BrandLogoProps) {
    const sizeClasses = {
        sm: "h-5 w-5 sm:h-6 sm:w-6",
        md: "h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12",
        lg: "h-12 w-12 sm:h-16 sm:w-16",
    }

    const textSizeClasses = {
        sm: "text-xs sm:text-sm",
        md: "text-base sm:text-lg lg:text-xl",
        lg: "text-xl sm:text-2xl lg:text-3xl",
    }

    return (
        <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
            <Image
                src="/logo.svg"
                alt="ZaneEnterprise Logo"
                width={48}
                height={48}
                className={cn(
                    "flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:brightness-125",
                    sizeClasses[size]
                )}
            />
            {showText && (
                <div className={cn("truncate", textSizeClasses[size], textClassName)}>
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}>Zane</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 200 }}>Enterprise</span>
                    {size === "sm" && <span className="text-muted-foreground ml-0.5">LLC</span>}
                </div>
            )}
        </div>
    )
}
