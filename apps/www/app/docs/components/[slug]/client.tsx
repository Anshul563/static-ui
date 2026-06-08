"use client"

import React, { Component, useState, type ReactNode } from "react"
import {
  Accessibility,
  ChevronRight,
  Layers,
  Loader2,
  Package,
  Terminal,
  Wrench,
} from "lucide-react"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { CodeBlock } from "@/components/CodeBlock"
import { CommandBlock } from "@/components/docs/CommandBlock"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { categoryLabels, getRelatedComponents, registryBySlug } from "@/lib/registry"

const INSTALLED_SLUGS = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "checkbox",
  "collapsible",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "kbd",
  "label",
  "number-field",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "scroll-area",
  "select",
  "separator",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "tooltip",
  "typography",
])

interface ComponentMeta {
  name: string
  description: string
  code: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PreviewFactory = (mod: Record<string, any>) => React.ReactNode

const previewOverrides: Record<string, PreviewFactory> = {
  badge: (mod) => {
    const Badge = mod.Badge || mod.default
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    )
  },
  avatar: (mod) => {
    const Avatar = mod.Avatar
    const AvatarImage = mod.AvatarImage
    const AvatarFallback = mod.AvatarFallback
    return (
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/175791980?v=4&size=64"
          alt="@Anshul563"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  },
  accordion: (mod) => {
    const Accordion = mod.Accordion
    const AccordionItem = mod.AccordionItem
    const AccordionTrigger = mod.AccordionTrigger
    const AccordionContent = mod.AccordionContent
    return (
      <Accordion className="w-80" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to WAI-ARIA design patterns.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with sensible dark mode defaults.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes. Animations are built with Tailwind CSS.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
  breadcrumb: (mod) => {
    const Breadcrumb = mod.Breadcrumb
    const BreadcrumbList = mod.BreadcrumbList
    const BreadcrumbItem = mod.BreadcrumbItem
    const BreadcrumbLink = mod.BreadcrumbLink
    const BreadcrumbPage = mod.BreadcrumbPage
    const BreadcrumbSeparator = mod.BreadcrumbSeparator
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  },
  card: (mod) => {
    const Card = mod.Card
    const CardHeader = mod.CardHeader
    const CardTitle = mod.CardTitle
    const CardDescription = mod.CardDescription
    const CardContent = mod.CardContent
    const CardFooter = mod.CardFooter
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your team has been assigned a new project.
          </p>
        </CardContent>
        <CardFooter>
          <span className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-default">
            View All
          </span>
        </CardFooter>
      </Card>
    )
  },
  carousel: (mod) => {
    const Carousel = mod.Carousel
    const CarouselContent = mod.CarouselContent
    const CarouselItem = mod.CarouselItem
    const CarouselPrevious = mod.CarouselPrevious
    const CarouselNext = mod.CarouselNext
    const slides = [
      { bg: "bg-neutral-800", label: "Slide 1" },
      { bg: "bg-neutral-700", label: "Slide 2" },
      { bg: "bg-neutral-800", label: "Slide 3" },
      { bg: "bg-neutral-700", label: "Slide 4" },
      { bg: "bg-neutral-800", label: "Slide 5" },
    ]
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div
                className={`flex items-center justify-center h-40 rounded-md border border-border ${slide.bg} text-foreground text-sm font-medium`}
              >
                {slide.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
  dialog: (mod) => {
    const Dialog = mod.Dialog
    const DialogTrigger = mod.DialogTrigger
    const DialogPortal = mod.DialogPortal
    const DialogBackdrop = mod.DialogBackdrop
    const DialogPopup = mod.DialogPopup
    const DialogHeader = mod.DialogHeader
    const DialogTitle = mod.DialogTitle
    const DialogDescription = mod.DialogDescription
    const DialogFooter = mod.DialogFooter
    const DialogClose = mod.DialogClose
    return (
      <Dialog>
        <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
          Open Dialog
        </DialogTrigger>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-foreground"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-foreground"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-accent transition-colors">
                Cancel
              </DialogClose>
              <DialogClose className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
                Save
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    )
  },
  skeleton: (mod) => {
    const Skeleton = mod.Skeleton
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  },
  "hover-card": (mod) => {
    const HoverCard = mod.HoverCard
    const HoverCardTrigger = mod.HoverCardTrigger
    const HoverCardContent = mod.HoverCardContent
    return (
      <HoverCard>
        <HoverCardTrigger className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
          Hover me
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="text-sm font-medium text-foreground">@username</div>
          <div className="text-xs text-muted-foreground mt-1">Profile details appear here.</div>
        </HoverCardContent>
      </HoverCard>
    )
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sonner: (mod: Record<string, any>) => {
    const SonnerProvider = mod.SonnerProvider
    const SonnerTrigger = () => {
      const { toast } = mod.useSonner()
      return (
        <button
          onClick={() => toast("Event created!", "Your changes have been saved.")}
          className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors"
        >
          Show Toast
        </button>
      )
    }
    SonnerTrigger.displayName = "SonnerTrigger"
    return (
      <SonnerProvider>
        <SonnerTrigger />
      </SonnerProvider>
    )
  },
  switch: (mod) => {
    const Switch = mod.Switch
    return (
      <div className="flex items-center gap-2">
        <Switch />
        <label className="text-sm text-foreground">Airplane Mode</label>
      </div>
    )
  },
  table: (mod) => {
    const Table = mod.Table
    const TableHeader = mod.TableHeader
    const TableBody = mod.TableBody
    const TableRow = mod.TableRow
    const TableHead = mod.TableHead
    const TableCell = mod.TableCell
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Engineer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Charlie</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  },
  tabs: (mod) => {
    const Tabs = mod.Tabs
    const TabsList = mod.TabsList
    const TabsTrigger = mod.TabsTrigger
    const TabsContent = mod.TabsContent
    return (
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-muted-foreground">Manage your account settings here.</p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground">Change your password here.</p>
        </TabsContent>
      </Tabs>
    )
  },
  textarea: (mod) => {
    const Textarea = mod.Textarea
    return <Textarea placeholder="Write your message here..." className="w-80" />
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: (mod: Record<string, any>) => {
    const ToastProvider = mod.ToastProvider
    const ToastTrigger = () => {
      const { toast } = mod.useToast()
      return (
        <button
          onClick={() =>
            toast({
              title: "Saved!",
              description: "Your changes have been saved.",
            })
          }
          className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors"
        >
          Show Toast
        </button>
      )
    }
    ToastTrigger.displayName = "ToastTrigger"
    return (
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    )
  },
  toggle: (mod) => {
    const Toggle = mod.Toggle
    return (
      <div className="flex gap-2">
        <Toggle aria-label="Bold" className="px-3 font-bold">
          B
        </Toggle>
        <Toggle aria-label="Italic" className="px-3 italic">
          I
        </Toggle>
        <Toggle aria-label="Underline" className="px-3 underline">
          U
        </Toggle>
      </div>
    )
  },
  tooltip: (mod) => {
    const Tooltip = mod.Tooltip
    const TooltipTrigger = mod.TooltipTrigger
    const TooltipContent = mod.TooltipContent
    const TooltipProvider = mod.TooltipProvider
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="inline-flex items-center justify-center rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
            Hover me
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}

const registry: Record<string, ComponentMeta> = {
  accordion: {
    name: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal an associated section of content.",
    code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@static-ui/ui"\n\nexport function AccordionDemo() {\n  return (\n    <Accordion className="w-80" defaultValue="item-1">\n      <AccordionItem value="item-1">\n        <AccordionTrigger>Is it accessible?</AccordionTrigger>\n        <AccordionContent>\n          Yes. It adheres to WAI-ARIA design patterns.\n        </AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-2">\n        <AccordionTrigger>Is it styled?</AccordionTrigger>\n        <AccordionContent>\n          Yes. It comes with sensible defaults.\n        </AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-3">\n        <AccordionTrigger>Is it animated?</AccordionTrigger>\n        <AccordionContent>\n          Yes. Animations are built with Tailwind CSS.\n        </AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
  },
  alert: {
    name: "Alert",
    description:
      "Displays a brief, important message that requires the user's attention without interrupting their workflow.",
    code: `import { Alert, AlertTitle, AlertDescription } from "@static-ui/ui"\n\nexport function AlertDemo() {\n  return (\n    <Alert variant="default">\n      <AlertTitle>Heads up!</AlertTitle>\n      <AlertDescription>You can add components to your project using the CLI.</AlertDescription>\n    </Alert>\n  )\n}`,
  },
  "alert-dialog": {
    name: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with urgent information or requires a critical confirmation decision.",
    code: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@static-ui/ui"\n\nexport function AlertDialogDemo() {\n  return (\n    <AlertDialog>\n      <AlertDialogTrigger>Open</AlertDialogTrigger>\n      <AlertDialogContent>\n        <AlertDialogHeader>\n          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n        </AlertDialogHeader>\n        <AlertDialogFooter>\n          <AlertDialogCancel>Cancel</AlertDialogCancel>\n          <AlertDialogAction>Continue</AlertDialogAction>\n        </AlertDialogFooter>\n      </AlertDialogContent>\n    </AlertDialog>\n  )\n}`,
  },
  "aspect-ratio": {
    name: "Aspect Ratio",
    description:
      "Displays content within a desired ratio while preserving the element's intrinsic dimensions.",
    code: `import { AspectRatio } from "@static-ui/ui"\n\nexport function AspectRatioDemo() {\n  return (\n    <AspectRatio ratio={16 / 9}>\n      <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd" alt="Photo" className="rounded-md object-cover" />\n    </AspectRatio>\n  )\n}`,
  },
  avatar: {
    name: "Avatar",
    description: "An image element with a fallback placeholder that represents a user or entity.",
    code: `import { Avatar, AvatarImage, AvatarFallback } from "@static-ui/ui"\n\nexport function AvatarDemo() {\n  return (\n    <Avatar>\n      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />\n      <AvatarFallback>CN</AvatarFallback>\n    </Avatar>\n  )\n}`,
  },
  badge: {
    name: "Badge",
    description:
      "A small visual label that highlights status, categorises content, or displays counts at a glance.",
    code: `import { Badge } from "@static-ui/ui"\n\nexport function BadgeDemo() {\n  return (\n    <div className="flex gap-2">\n      <Badge variant="default">Default</Badge>\n      <Badge variant="secondary">Secondary</Badge>\n      <Badge variant="destructive">Destructive</Badge>\n      <Badge variant="outline">Outline</Badge>\n    </div>\n  )\n}`,
  },
  breadcrumb: {
    name: "Breadcrumb",
    description:
      "Displays the current page location within a navigational hierarchy as a chain of clickable segments.",
    code: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@static-ui/ui"\n\nexport function BreadcrumbDemo() {\n  return (\n    <Breadcrumb>\n      <BreadcrumbList>\n        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>\n      </BreadcrumbList>\n    </Breadcrumb>\n  )\n}`,
  },
  button: {
    name: "Button",
    description:
      "An interactive element used to trigger actions, submit forms, or navigate across application views.",
    code: `import { Button } from "@static-ui/ui"\n\nexport function ButtonDemo() {\n  return (\n    <div className="flex gap-4">\n      <Button variant="default">Default</Button>\n      <Button variant="outline">Outline</Button>\n      <Button variant="destructive">Destructive</Button>\n    </div>\n  )\n}`,
  },
  calendar: {
    name: "Calendar",
    description:
      "A date picker component that lets users select single dates or ranges through an interactive month grid.",
    code: `import { Calendar } from "@static-ui/ui"\n\nexport function CalendarDemo() {\n  const [date, setDate] = useState<Date | undefined>(new Date())\n  return (\n    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />\n  )\n}`,
  },
  card: {
    name: "Card",
    description:
      "A flexible container that groups related content and actions into a single visually bounded surface.",
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@static-ui/ui"\n\nexport function CardDemo() {\n  return (\n    <Card className="w-80">\n      <CardHeader>\n        <CardTitle>Notifications</CardTitle>\n        <CardDescription>You have 3 unread messages.</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <p className="text-sm text-neutral-500">Your team has been assigned a new project.</p>\n      </CardContent>\n      <CardFooter>\n        <span className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50">View All</span>\n      </CardFooter>\n    </Card>\n  )\n}`,
  },
  carousel: {
    name: "Carousel",
    description:
      "A horizontally scrolling container that cycles through a set of items, one at a time.",
    code: `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@static-ui/ui"\n\nexport function CarouselDemo() {\n  return (\n    <Carousel className="w-full max-w-xs">\n      <CarouselContent>\n        {["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"].map((label, i) => (\n          <CarouselItem key={i}>\n            <div className="flex items-center justify-center h-40 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-300 text-sm font-medium">{label}</div>\n          </CarouselItem>\n        ))}\n      </CarouselContent>\n      <CarouselPrevious />\n      <CarouselNext />\n    </Carousel>\n  )\n}`,
  },
  checkbox: {
    name: "Checkbox",
    description:
      "A binary control that allows users to toggle between checked and unchecked states for selections.",
    code: `import { Checkbox } from "@static-ui/ui"\n\nexport function CheckboxDemo() {\n  return (\n    <div className="flex items-center gap-2">\n      <Checkbox id="terms" />\n      <label htmlFor="terms" className="text-sm text-neutral-300">Accept terms and conditions</label>\n    </div>\n  )\n}`,
  },
  collapsible: {
    name: "Collapsible",
    description:
      "An expandable section that reveals and hides content with a smooth animated toggle transition.",
    code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@static-ui/ui"\n\nexport function CollapsibleDemo() {\n  return (\n    <Collapsible className="w-80">\n      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">Toggle content</CollapsibleTrigger>\n      <CollapsibleContent>\n        <p className="text-sm text-neutral-400 pt-2">This content can be collapsed and expanded.</p>\n      </CollapsibleContent>\n    </Collapsible>\n  )\n}`,
  },
  "context-menu": {
    name: "Context Menu",
    description:
      "A right-click contextual menu that surfaces relevant actions based on the target element.",
    code: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@static-ui/ui"\n\nexport function ContextMenuDemo() {\n  return (\n    <ContextMenu>\n      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">Right-click here</ContextMenuTrigger>\n      <ContextMenuContent>\n        <ContextMenuItem>Cut</ContextMenuItem>\n        <ContextMenuItem>Copy</ContextMenuItem>\n        <ContextMenuItem>Paste</ContextMenuItem>\n        <ContextMenuSeparator />\n        <ContextMenuItem>Delete</ContextMenuItem>\n      </ContextMenuContent>\n    </ContextMenu>\n  )\n}`,
  },
  dialog: {
    name: "Dialog",
    description:
      "A modal overlay that focuses the user on a specific task or piece of content by dimming the background.",
    code: `import { Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@static-ui/ui"\n\nexport function DialogDemo() {\n  return (\n    <Dialog>\n      <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 cursor-pointer hover:bg-neutral-800 transition-colors">Open Dialog</DialogTrigger>\n      <DialogPortal>\n        <DialogBackdrop />\n        <DialogPopup>\n          <DialogHeader>\n            <DialogTitle>Edit Profile</DialogTitle>\n            <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>\n          </DialogHeader>\n          <div className="flex flex-col gap-3 py-2">\n            <label className="text-sm font-medium text-neutral-700">Name</label>\n            <input className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm" placeholder="Enter your name" />\n            <label className="text-sm font-medium text-neutral-700">Email</label>\n            <input className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm" placeholder="Enter your email" />\n          </div>\n          <DialogFooter>\n            <DialogClose className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 cursor-pointer hover:bg-neutral-50 transition-colors">Cancel</DialogClose>\n            <DialogClose className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 cursor-pointer hover:bg-neutral-800 transition-colors">Save</DialogClose>\n          </DialogFooter>\n        </DialogPopup>\n      </DialogPortal>\n    </Dialog>\n  )\n}`,
  },
  drawer: {
    name: "Drawer",
    description:
      "A mobile-first panel that slides in from the bottom or edge of the viewport to reveal related actions.",
    code: `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@static-ui/ui"\n\nexport function DrawerDemo() {\n  return (\n    <Drawer>\n      <DrawerTrigger>Open Drawer</DrawerTrigger>\n      <DrawerContent>\n        <DrawerHeader>\n          <DrawerTitle>Settings</DrawerTitle>\n          <DrawerDescription>Adjust your application preferences.</DrawerDescription>\n        </DrawerHeader>\n      </DrawerContent>\n    </Drawer>\n  )\n}`,
  },
  "dropdown-menu": {
    name: "Dropdown Menu",
    description:
      "A floating menu of actions or links triggered by clicking a toggle element like a button or avatar.",
    code: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@static-ui/ui"\n\nexport function DropdownMenuDemo() {\n  return (\n    <DropdownMenu>\n      <DropdownMenuTrigger>\n        <Button variant="outline">Open</Button>\n      </DropdownMenuTrigger>\n      <DropdownMenuContent>\n        <DropdownMenuItem>Profile</DropdownMenuItem>\n        <DropdownMenuItem>Billing</DropdownMenuItem>\n        <DropdownMenuItem>Team</DropdownMenuItem>\n        <DropdownMenuSeparator />\n        <DropdownMenuItem>Logout</DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>\n  )\n}`,
  },
  "hover-card": {
    name: "Hover Card",
    description:
      "A floating card that reveals rich preview content when the user hovers over a trigger element.",
    code: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@static-ui/ui"\n\nexport function HoverCardDemo() {\n  return (\n    <HoverCard>\n      <HoverCardTrigger><span className="underline cursor-help text-sm">@username</span></HoverCardTrigger>\n      <HoverCardContent className="w-64">\n        <p className="text-sm font-medium">Display Name</p>\n        <p className="text-xs text-neutral-400">Bio and profile details here.</p>\n      </HoverCardContent>\n    </HoverCard>\n  )\n}`,
  },
  input: {
    name: "Input",
    description:
      "A styled text field that accepts user input for forms, search, or data entry workflows.",
    code: `import { Input } from "@static-ui/ui"\n\nexport function InputDemo() {\n  return (\n    <div className="flex flex-col gap-2">\n      <Input placeholder="Enter your email..." />\n      <Input placeholder="Disabled" disabled />\n    </div>\n  )\n}`,
  },
  label: {
    name: "Label",
    description:
      "A text label paired with a form control, providing accessible naming and click-to-focus behaviour.",
    code: `import { Label } from "@static-ui/ui"\n\nexport function LabelDemo() {\n  return (\n    <div className="flex flex-col gap-2">\n      <Label htmlFor="name">Name</Label>\n      <Input id="name" placeholder="Enter your name" />\n    </div>\n  )\n}`,
  },
  pagination: {
    name: "Pagination",
    description:
      "Controls for navigating through multi-page datasets with page numbers and next/previous buttons.",
    code: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@static-ui/ui"\n\nexport function PaginationDemo() {\n  return (\n    <Pagination>\n      <PaginationContent>\n        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>\n        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>\n        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>\n        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>\n        <PaginationItem><PaginationNext href="#" /></PaginationItem>\n      </PaginationContent>\n    </Pagination>\n  )\n}`,
  },
  popover: {
    name: "Popover",
    description:
      "A floating overlay that appears near a trigger to present additional options or inline information.",
    code: `import { Popover, PopoverTrigger, PopoverContent } from "@static-ui/ui"\n\nexport function PopoverDemo() {\n  return (\n    <Popover>\n      <PopoverTrigger><Button variant="outline">Open Popover</Button></PopoverTrigger>\n      <PopoverContent className="w-64">\n        <p className="text-sm">Place content here.</p>\n      </PopoverContent>\n    </Popover>\n  )\n}`,
  },
  progress: {
    name: "Progress",
    description:
      "A visual indicator that displays the completion status of a task or process as a filled bar.",
    code: `import { Progress } from "@static-ui/ui"\n\nexport function ProgressDemo() {\n  const [value, setValue] = useState(0)\n  React.useEffect(() => {\n    const timer = setInterval(() => setValue(v => Math.min(v + 10, 100)), 500)\n    return () => clearInterval(timer)\n  }, [])\n  return <Progress value={value} className="w-60" />\n}`,
  },
  "radio-group": {
    name: "Radio Group",
    description:
      "A set of mutually exclusive options where only one choice can be selected at any given time.",
    code: `import { RadioGroup, RadioGroupItem } from "@static-ui/ui"\n\nexport function RadioGroupDemo() {\n  return (\n    <RadioGroup defaultValue="option-one">\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="option-one" id="o1" />\n        <label htmlFor="o1" className="text-sm">Option One</label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="option-two" id="o2" />\n        <label htmlFor="o2" className="text-sm">Option Two</label>\n      </div>\n    </RadioGroup>\n  )\n}`,
  },
  "scroll-area": {
    name: "Scroll Area",
    description:
      "A custom-styled scroll container that replaces the native browser scrollbar for consistent cross-browser design.",
    code: `import { ScrollArea } from "@static-ui/ui"\n\nexport function ScrollAreaDemo() {\n  return (\n    <ScrollArea className="h-48 w-72 rounded-md border">\n      <div className="p-4 text-sm">\n        {Array.from({ length: 20 }).map((_, i) => (\n          <p key={i} className="pb-2">Line {i + 1} of scrollable content.</p>\n        ))}\n      </div>\n    </ScrollArea>\n  )\n}`,
  },
  select: {
    name: "Select",
    description:
      "A dropdown picker that lets users choose a single value from a collapsible list of predefined options.",
    code: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@static-ui/ui"\n\nexport function SelectDemo() {\n  return (\n    <Select>\n      <SelectTrigger className="w-48">\n        <SelectValue placeholder="Select a fruit" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectItem value="apple">Apple</SelectItem>\n        <SelectItem value="banana">Banana</SelectItem>\n        <SelectItem value="orange">Orange</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}`,
  },
  separator: {
    name: "Separator",
    description:
      "A thin visual divider that separates content sections or groups into distinct horizontal or vertical zones.",
    code: `import { Separator } from "@static-ui/ui"\n\nexport function SeparatorDemo() {\n  return (\n    <div className="flex flex-col gap-2">\n      <p className="text-sm">Content above</p>\n      <Separator />\n      <p className="text-sm">Content below</p>\n    </div>\n  )\n}`,
  },
  skeleton: {
    name: "Skeleton",
    description:
      "A placeholder that mimics the shape of content while it loads, reducing perceived wait time.",
    code: `import { Skeleton } from "@static-ui/ui"\n\nexport function SkeletonDemo() {\n  return (\n    <div className="flex items-center gap-4">\n      <Skeleton className="h-12 w-12 rounded-full" />\n      <div className="space-y-2">\n        <Skeleton className="h-4 w-48" />\n        <Skeleton className="h-4 w-32" />\n      </div>\n    </div>\n  )\n}`,
  },
  slider: {
    name: "Slider",
    description:
      "A range input that lets users select a numeric value by dragging a handle along a horizontal track.",
    code: `import { Slider } from "@static-ui/ui"\n\nexport function SliderDemo() {\n  const [value, setValue] = useState([50])\n  return (\n    <div className="w-60 space-y-2">\n      <Slider value={value} onValueChange={setValue} max={100} step={1} />\n      <p className="text-xs text-neutral-400">Value: {value[0]}</p>\n    </div>\n  )\n}`,
  },
  sonner: {
    name: "Sonner",
    description:
      "An opinionated toast notification system that stacks brief, dismissible messages in the corner of the viewport.",
    code: `import { SonnerProvider, useSonner } from "@static-ui/ui"\n\nfunction ToastButton() {\n  const { toast } = useSonner()\n  return (\n    <button onClick={() => toast("Event created!", "Your changes have been saved.")} className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 cursor-pointer hover:bg-neutral-800 transition-colors">Show Toast</button>\n  )\n}\n\nexport function SonnerDemo() {\n  return (\n    <SonnerProvider>\n      <ToastButton />\n    </SonnerProvider>\n  )\n}`,
  },
  switch: {
    name: "Switch",
    description:
      "A toggle control that instantly enables or disables a setting with a single click.",
    code: `import { Switch } from "@static-ui/ui"\n\nexport function SwitchDemo() {\n  const [enabled, setEnabled] = useState(false)\n  return (\n    <div className="flex items-center gap-2">\n      <Switch checked={enabled} onCheckedChange={setEnabled} />\n      <label className="text-sm text-neutral-300">{enabled ? "Enabled" : "Disabled"}</label>\n    </div>\n  )\n}`,
  },
  table: {
    name: "Table",
    description:
      "A clean data table layout with styled rows, header columns, and responsive overflow handling.",
    code: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@static-ui/ui"\n\nexport function TableDemo() {\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Name</TableHead>\n          <TableHead>Role</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow><TableCell>Alice</TableCell><TableCell>Engineer</TableCell></TableRow>\n        <TableRow><TableCell>Bob</TableCell><TableCell>Designer</TableCell></TableRow>\n      </TableBody>\n    </Table>\n  )\n}`,
  },
  tabs: {
    name: "Tabs",
    description:
      "A tabbed interface that switches between multiple content panels while keeping only one active at a time.",
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@static-ui/ui"\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue="account">\n      <TabsList>\n        <TabsTrigger value="account">Account</TabsTrigger>\n        <TabsTrigger value="password">Password</TabsTrigger>\n      </TabsList>\n      <TabsContent value="account">Manage your account settings.</TabsContent>\n      <TabsContent value="password">Change your password here.</TabsContent>\n    </Tabs>\n  )\n}`,
  },
  textarea: {
    name: "Textarea",
    description:
      "A multi-line text input that accommodates longer form responses such as comments or descriptions.",
    code: `import { Textarea } from "@static-ui/ui"\n\nexport function TextareaDemo() {\n  return <Textarea placeholder="Write your message here..." className="w-80" />\n}`,
  },
  toast: {
    name: "Toast",
    description:
      "A lightweight notification that temporarily appears to confirm an action or alert the user.",
    code: `import { ToastProvider, useToast } from "@static-ui/ui"\n\nfunction ToastButton() {\n  const { toast } = useToast()\n  return (\n    <button onClick={() => toast({ title: "Saved!", description: "Your changes have been saved." })} className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 cursor-pointer hover:bg-neutral-800 transition-colors">Show Toast</button>\n  )\n}\n\nexport function ToastDemo() {\n  return (\n    <ToastProvider>\n      <ToastButton />\n    </ToastProvider>\n  )\n}`,
  },
  toggle: {
    name: "Toggle",
    description:
      "A button that switches between an on and off visual state, often used for formatting toolbars.",
    code: `import { Toggle } from "@static-ui/ui"\n\nexport function ToggleDemo() {\n  return (\n    <Toggle aria-label="Toggle bold">\n      <Bold className="h-4 w-4" />\n    </Toggle>\n  )\n}`,
  },
  tooltip: {
    name: "Tooltip",
    description:
      "A small contextual label that appears on hover or focus to explain an element's purpose.",
    code: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@static-ui/ui"\n\nexport function TooltipDemo() {\n  return (\n    <TooltipProvider>\n      <Tooltip>\n        <TooltipTrigger className="inline-flex items-center justify-center rounded-md bg-neutral-800 border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 cursor-pointer hover:bg-neutral-700 transition-colors">Hover me</TooltipTrigger>\n        <TooltipContent><p className="text-xs">This is a tooltip</p></TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  )\n}`,
  },
}

const accessibilityNotes: Record<string, string> = {
  accordion:
    "Uses WAI-ARIA Accordion pattern. Each panel is controlled by its triggering button via `aria-expanded` and `aria-controls` attributes.",
  alert:
    'Uses `role="alert"` to announce dynamic content to screen readers. Optionally supports `role="alertdialog"` for interactive alerts.',
  "alert-dialog":
    'Implements the WAI-ARIA Alert Dialog pattern. Focus is trapped within the dialog. Uses `role="alertdialog"` and `aria-modal="true"`.',
  avatar:
    "Requires `alt` text on `AvatarImage` for screen reader users. The `AvatarFallback` provides accessible text when the image fails to load.",
  breadcrumb:
    'Uses `nav` element with `aria-label="Breadcrumb"`. Each segment is a link except the current page which uses `aria-current="page"`.',
  button:
    "Uses native `<button>` element, providing built-in keyboard interaction and focus management. Supports `aria-pressed` for toggle states.",
  card: "Uses semantic HTML sections. Cards are focusable when interactive. Use `article` or `section` elements as appropriate.",
  carousel:
    'Requires `aria-roledescription="carousel"` and `aria-label` on the container. Each slide uses `role="group"` with `aria-roledescription="slide"`.',
  checkbox:
    'Supports indeterminate state via `aria-checked="mixed"`. Uses native `<input type="checkbox">` for built-in accessibility.',
  dialog:
    'Implements the WAI-ARIA Dialog pattern. Focus is trapped. Uses `role="dialog"` and `aria-modal="true"`. Closes on `Escape` key.',
  "dropdown-menu":
    'Follows WAI-ARIA Menu pattern. Uses `role="menu"`, `role="menuitem"`. Arrow key navigation between items.',
  "hover-card":
    "Uses `aria-describedby` to link the trigger to the card content. Appears on hover or focus. Dismissible with `Escape`.",
  input:
    "Uses native `<input>` elements for built-in form accessibility. Supports `aria-invalid`, `aria-describedby`, and `aria-required`.",
  "radio-group":
    'Implements the WAI-ARIA Radio Group pattern. Uses `role="radiogroup"` and `role="radio"`. Arrow key navigation between options.',
  select:
    'Implements the WAI-ARIA Listbox pattern. Uses `role="combobox"` and `role="listbox"` with `aria-selected` for options.',
  skeleton:
    'Uses `aria-hidden="true"` since skeleton placeholders are decorative. Content should be announced when loaded.',
  slider:
    'Uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` attributes. Supports keyboard arrow navigation.',
  switch:
    'Uses `role="switch"` with `aria-checked` to indicate the toggle state. Supports keyboard activation via `Space` or `Enter`.',
  tabs: 'Implements the WAI-ARIA Tabs pattern. Uses `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected` and `aria-controls`.',
  textarea:
    "Uses native `<textarea>` element for built-in form accessibility. Supports `aria-invalid` and `aria-describedby`.",
  toast:
    'Uses `role="status"` or `role="alert"` for live region announcements. Automatically announced by screen readers.',
  toggle:
    "Uses `aria-pressed` to indicate the pressed state. Keyboard accessible via `Space` or `Enter`.",
  tooltip:
    "Uses `aria-describedby` to link the trigger to the tooltip content. Appears on hover and focus. Not focusable itself.",
}

const commonProps: Record<string, { name: string; type: string; description: string }[]> = {
  accordion: [
    {
      name: "type",
      type: '"single" | "multiple"',
      description: "Determines whether one or multiple items can be open at once.",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      description: "The initially open accordion item value(s).",
    },
    {
      name: "collapsible",
      type: "boolean",
      description: "Allow all items to be closed when type is single.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ],
  button: [
    {
      name: "variant",
      type: '"default" | "outline" | "destructive" | "ghost" | "link"',
      description: "The visual style variant of the button.",
    },
    {
      name: "size",
      type: '"sm" | "default" | "lg" | "icon"',
      description: "The size of the button.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "When true, prevents interaction.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ],
  badge: [
    {
      name: "variant",
      type: '"default" | "outline" | "destructive" | "secondary"',
      description: "The visual style variant of the badge.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ],
  input: [
    {
      name: "type",
      type: "string",
      description: "The HTML input type (text, email, password, etc.).",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text shown when input is empty.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "When true, prevents interaction.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ],
  card: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ],
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export default function ComponentDetailClient({ slug: propSlug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  const slug = propSlug
  const meta = registry[slug]
  const regEntry = registryBySlug[slug]

  const isInstalled = INSTALLED_SLUGS.has(slug)
  const related = getRelatedComponents(slug)
  const accessibility = accessibilityNotes[slug]
  const props = commonProps[slug] || [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ]

  const LivePreview = React.useMemo(() => {
    if (!meta || !regEntry || !isInstalled) return null

    const override = previewOverrides[slug]

    return dynamic(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import("@static-ui/ui").then((mod: Record<string, any>) => {
          const normalized = meta.name.replace(/\s+/g, "")
          const Component = mod.default || mod[normalized] || mod[Object.keys(mod)[0]]

          if (override) {
            const Preview: React.FC = () => <>{override(mod)}</>
            Preview.displayName = `Preview_${slug}`
            return Preview
          }

          return Component
        }),
      { loading: () => <LoadingIndicator />, ssr: false }
    )
  }, [slug, meta, regEntry, isInstalled])

  if (!meta || !regEntry) return notFound()

  return (
    <div className="flex flex-col gap-10 py-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{meta.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
          <Badge variant="outline" className="text-xs">
            {categoryLabels[regEntry.category] || regEntry.category}
          </Badge>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {meta.description}
        </p>
      </div>

      {/* Preview / Code Tab Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === "preview"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === "code"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Code
            </button>
          </div>
        </div>

        <Card className="bg-background min-h-75 flex-row items-center justify-center p-6 relative bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
          {activeTab === "preview" ? (
            isInstalled && LivePreview ? (
              <ErrorBoundary
                fallback={
                  <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
                    <p className="text-xs font-medium text-muted-foreground">
                      Failed to load preview
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      The component may have unresolved dependencies
                    </p>
                  </div>
                }
              >
                <div className="flex items-center justify-center w-full">
                  <LivePreview />
                </div>
              </ErrorBoundary>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
                <p className="text-xs font-medium text-muted-foreground">
                  Component not yet installed
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Use the CLI command below to add it to your project
                </p>
              </div>
            )
          ) : (
            <CodeBlock code={meta.code} language="tsx" showLineNumbers />
          )}
        </Card>
      </div>

      {/* Installation */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Terminal className="h-4 w-4 text-primary" />
          Installation
        </h3>
        <p className="text-xs text-muted-foreground">
          Run the following command to add this component to your project:
        </p>
        <CommandBlock type="add" slug={slug} />
      </div>

      {/* Import Path */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Package className="h-4 w-4 text-primary" />
          Import
        </h3>
        <p className="text-xs text-muted-foreground">
          Import the component directly from the package:
        </p>
        <Card className="bg-card/80 p-3 pl-4 max-w-xl shadow-md flex-row items-center justify-between">
          <code className="font-mono text-xs text-foreground">
            {`import { ${meta.name.replace(/\s+/g, "")} } from "@static-ui/ui"`}
          </code>
        </Card>
      </div>

      {/* Props / API */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Wrench className="h-4 w-4 text-primary" />
          API Reference
        </h3>
        <p className="text-xs text-muted-foreground">Common props available for this component:</p>
        <Card className="block p-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Prop</th>
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Type</th>
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop: { name: string; type: string; description: string }) => (
                <tr key={prop.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-primary">{prop.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-amber-300">{prop.type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Dependencies */}
      {regEntry.dependencies.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Package className="h-4 w-4 text-primary" />
            Dependencies
          </h3>
          <ul className="flex flex-wrap gap-2">
            {regEntry.dependencies.map((dep: string) => (
              <li
                key={dep}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground"
              >
                {dep}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accessibility */}
      {accessibility && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Accessibility className="h-4 w-4 text-primary" />
            Accessibility
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{accessibility}</p>
        </div>
      )}

      {/* Related Components */}
      {related.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Layers className="h-4 w-4 text-primary" />
            Related Components
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map((rel) => (
              <Card
                key={rel.slug}
                size="sm"
                className="group flex-row items-center justify-between bg-card/60 px-4 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {rel.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{rel.description}</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <p className="text-[10px] font-medium tracking-wide">Loading component...</p>
    </div>
  )
}
