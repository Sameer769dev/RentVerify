import * as React from "react"
import { cn } from "@/lib/utils"

const GharBhadaIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-building", className)}
    {...props}
  >
    <path d="M4 21V10l8-6 8 6v11" />
    <path d="M12 21V12" />
    <path d="M4 10.5L1 9l11-7 11 7-3 1.5" />
    <path d="M20 10.5L12 6l-8 4.5" />
    <path d="M12 6V3" />
    <rect x="7" y="15" width="10" height="6" rx="1" />
  </svg>
))
GharBhadaIcon.displayName = "GharBhadaIcon"

export default GharBhadaIcon
