"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@static-ui/ui"
export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/175791980?v=4&size=64" alt="@Anshul563" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
