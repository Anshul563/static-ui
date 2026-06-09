import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const ScrollContainer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-y-auto scrollbar-minimal", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollContainer.displayName = "ScrollContainer"

export { ScrollContainer }
