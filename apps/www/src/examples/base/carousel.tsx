"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@static-ui/ui"
const slides = [
  { bg: "bg-neutral-800", label: "Slide 1" },
  { bg: "bg-neutral-700", label: "Slide 2" },
  { bg: "bg-neutral-800", label: "Slide 3" },
  { bg: "bg-neutral-700", label: "Slide 4" },
  { bg: "bg-neutral-800", label: "Slide 5" },
]
export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i}>
            <div className={`flex items-center justify-center h-40 rounded-md border border-border ${slide.bg} text-foreground text-sm font-medium`}>{slide.label}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
