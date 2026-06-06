import * as React from "react"
import { cn } from "@/lib/utils"

const TypographyH1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1 ref={ref} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground", className)} {...props} />
  )
)
TypographyH1.displayName = "TypographyH1"

const TypographyH2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground", className)} {...props} />
  )
)
TypographyH2.displayName = "TypographyH2"

const TypographyH3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-foreground", className)} {...props} />
  )
)
TypographyH3.displayName = "TypographyH3"

const TypographyLead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
)
TypographyLead.displayName = "TypographyLead"

const TypographyMuted = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
TypographyMuted.displayName = "TypographyMuted"

export { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyMuted }