"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "./lib/utils"

function Progress({
  className,
  value,
  max = 100,
  ...props
}: ProgressPrimitive.Root.Props) {
  const percentage =
    typeof value === "number" && max > 0
      ? Math.min(100, Math.max(0, (value / max) * 100))
      : null

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative w-full", className)}
      value={value}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full rounded-full bg-primary transition-[transform,width] duration-300 ease-out",
            percentage === null && "w-1/3 animate-pulse"
          )}
          style={
            percentage === null
              ? undefined
              : {
                  width: `${percentage}%`,
                }
          }
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({
  className,
  ...props
}: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-full bg-primary transition-[transform,width] duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
