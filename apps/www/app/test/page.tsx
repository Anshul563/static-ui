import { Accordion, Alert, AlertTitle, AlertDescription, Avatar, AvatarFallback, AvatarImage, Badge } from '@static-ui/ui'
import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-6">
      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>
  )
}

