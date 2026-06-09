"use client"
import { Alert, AlertTitle, AlertDescription } from "@static-ui/ui"
export default function AlertDemo() {
  return (
    <Alert variant="default">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your project using the CLI.</AlertDescription>
    </Alert>
  )
}
