import { homepageTagline } from "@/lib/data"

export function DynamicTagline() {
    return (
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
            {homepageTagline}
        </h1>
    )
}
