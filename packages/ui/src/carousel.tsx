"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement | null>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within a CarouselProvider")
  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const checkScroll = React.useCallback(() => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  React.useEffect(() => {
    const api = carouselRef.current
    if (!api) return
    api.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    checkScroll()

    return () => {
      api.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  const scrollPrev = React.useCallback(() => {
    carouselRef.current?.scrollBy({ left: -carouselRef.current.clientWidth, behavior: "smooth" })
  }, [])

  const scrollNext = React.useCallback(() => {
    carouselRef.current?.scrollBy({ left: carouselRef.current.clientWidth, behavior: "smooth" })
  }, [])

  return (
    <CarouselContext.Provider value={{ carouselRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div ref={ref} className={cn("relative w-full", className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel()
  return (
    <div className="overflow-hidden">
      <div
        ref={carouselRef}
        className={cn("flex snap-x snap-mandatory overflow-x-auto scrollbar-none gap-4 -ml-4", className)}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn("min-w-0 shrink-0 grow-0 basis-full snap-start pl-4", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      ref={ref}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        "absolute h-8 w-8 rounded-full border border-border bg-background text-muted-foreground shadow-2xs inline-flex items-center justify-center left-4 top-1/2 -translate-y-1/2 disabled:opacity-30 cursor-pointer focus-visible:outline-hidden",
        className
      )}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      ref={ref}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        "absolute h-8 w-8 rounded-full border border-border bg-background text-muted-foreground shadow-2xs inline-flex items-center justify-center right-4 top-1/2 -translate-y-1/2 disabled:opacity-30 cursor-pointer focus-visible:outline-hidden",
        className
      )}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }