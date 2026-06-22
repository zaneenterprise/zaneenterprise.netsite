export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="animate-page-shell-in motion-reduce:animate-none motion-reduce:opacity-100"
    >
      {children}
    </div>
  )
}
