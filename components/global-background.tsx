import Image from "next/image"

export function GlobalBackground({ image }: { image: string }) {
    return (
        <>
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
                <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: "oklch(0.15 0 0)" }}>
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        aria-hidden
                        className="object-cover scale-110 blur-[8px]"
                        unoptimized
                    />
                </div>
            </div>
            <div aria-hidden className="pointer-events-none fixed inset-0 bg-background/10 -z-10" />
        </>
    )
}
