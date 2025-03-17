import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className, size = "default", ...props }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size] || sizeClasses.default, className)}
      {...props}
    />
  )
}

