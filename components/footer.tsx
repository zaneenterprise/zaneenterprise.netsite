export default function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-[#858585]">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <a
          className="inline-flex items-center gap-1.5 px-2 py-1 text-inherit no-underline transition-all duration-300 hover:text-[#d4d4d4] hover:-translate-y-0.5 relative group"
          href="https://zaneenterprise.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/z.svg"
            alt="Z logo"
            className="w-4 h-4 brightness-0 invert transition-transform duration-450 group-hover:animate-[tilt_0.45s_ease]"
            style={{ transform: "translateY(0.4px)" }}
          />
          <span className="inline-flex items-baseline gap-0.5 tracking-tight leading-none">
            <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200, opacity: 0.85 }}>Enterprise</span>
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-px bg-current opacity-50 transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </footer>
  )
}
