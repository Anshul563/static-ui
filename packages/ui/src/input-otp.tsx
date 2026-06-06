"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength: number
  onCodeComplete?: (code: string) => void
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, maxLength = 6, onCodeComplete, value, onChange, ...props }, ref) => {
    const [code, setCode] = React.useState<string[]>((value as string || "").split("").slice(0, maxLength))
    const inputRefs = React.useRef<HTMLInputElement[]>([])

    React.useEffect(() => {
      if (value !== undefined) {
        setCode((value as string).split("").slice(0, maxLength))
      }
    }, [value, maxLength])

    const handleTextChange = (text: string, index: number) => {
      const cleanDigit = text.replace(/[^0-9]/g, "").slice(-1)
      const newCode = [...code]
      newCode[index] = cleanDigit
      
      setCode(newCode)
      if (onChange) {
        const joined = newCode.join("")
        onChange({ target: { value: joined } } as React.ChangeEvent<HTMLInputElement>)
        if (joined.length === maxLength && onCodeComplete) onCodeComplete(joined)
      }

      if (cleanDigit && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }

    return (
      <div className={cn("flex items-center gap-2", className)}>
        {Array.from({ length: maxLength }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { if (el) inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[index] || ""}
            onChange={(e) => handleTextChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 text-center text-lg font-semibold border border-border bg-background rounded-md shadow-2xs focus:outline-hidden focus:border-ring focus:ring-1 focus:ring-ring transition-all"
            {...props}
          />
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

export { InputOTP }