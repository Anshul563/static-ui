"use client"
import { AspectRatio } from "@static-ui/ui"
export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-80">
      <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd" alt="Photo" className="rounded-md object-cover w-full h-full" />
    </AspectRatio>
  )
}
