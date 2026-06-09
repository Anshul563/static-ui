"use client"
import { Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@static-ui/ui"
export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">Open Dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-foreground" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-foreground" placeholder="Enter your email" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-accent transition-colors">Cancel</DialogClose>
            <DialogClose className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">Save</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
