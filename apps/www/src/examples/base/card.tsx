"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@static-ui/ui"
export default function CardDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Your team has been assigned a new project.</p>
      </CardContent>
      <CardFooter>
        <span className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-default">View All</span>
      </CardFooter>
    </Card>
  )
}
