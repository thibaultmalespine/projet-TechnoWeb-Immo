import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

export function LoadingScreen({
  className,
  spinnerSize = "lg",
  fullScreen = true,
  message = "Chargement en cours...",
  showMessage = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : "w-full py-24",
        className,
      )}
      {...props}
    >
      <LoadingSpinner size={spinnerSize} />
      {showMessage && <p className="text-muted-foreground text-center font-medium">{message}</p>}
    </div>
  )
}

