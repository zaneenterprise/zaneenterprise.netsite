import { taglines } from "@/lib/data"

const fallbackTagline = taglines[0]

export function DynamicTagline() {
    return (
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
            {fallbackTagline.text}
        </h1>
    )
}
