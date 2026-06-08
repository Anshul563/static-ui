"use client"

import * as React from "react"
import { cn } from "./lib/utils"

export interface AiFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string
  maxSize?: number
  multiple?: boolean
  onUpload?: (files: File[]) => void
}

interface FileEntry {
  file: File
  progress: number
  size: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

const AiFileUpload = React.forwardRef<HTMLDivElement, AiFileUploadProps>(
  ({ className, accept, maxSize, multiple = true, onUpload, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [files, setFiles] = React.useState<FileEntry[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null)

    const addFiles = React.useCallback(
      (incoming: FileList | File[]) => {
        const newFiles: FileEntry[] = Array.from(incoming).map((file) => ({
          file,
          progress: 0,
          size: formatSize(file.size),
        }))
        setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles))
        onUpload?.(newFiles.map((f) => f.file))

        // Simulate upload progress
        newFiles.forEach((entry, i) => {
          let p = 0
          const interval = setInterval(() => {
            p += Math.random() * 30
            if (p >= 100) {
              p = 100
              clearInterval(interval)
            }
            setFiles((prev) => {
              const updated = [...prev]
              const idx = updated.indexOf(entry)
              if (idx !== -1) updated[idx] = { ...updated[idx], progress: p }
              return updated
            })
          }, 200 + i * 100)
        })
      },
      [multiple, onUpload]
    )

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
        e.target.value = ""
      }
    }

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label="File upload zone"
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15l3-3 3 3" />
          </svg>
          <div className="text-sm text-foreground">
            <span className="font-medium">Click to upload</span> or drag and drop
          </div>
          {accept && (
            <p className="text-xs text-muted-foreground">
              Accepted: {accept}
              {maxSize && ` · Max: ${formatSize(maxSize)}`}
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="hidden"
            aria-hidden="true"
          />
        </div>

        {files.length > 0 && (
          <ul className="flex flex-col gap-2" role="list" aria-label="Uploaded files">
            {files.map((entry, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-muted-foreground"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-foreground">
                      {entry.file.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {entry.size}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        entry.progress === 100 ? "bg-primary" : "bg-primary/70"
                      )}
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Remove ${entry.file.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
AiFileUpload.displayName = "AiFileUpload"

export { AiFileUpload }
