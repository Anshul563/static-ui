"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  className?: string
  value?: Date
  onChange?: (date: Date) => void
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, value, onChange }, ref) => {
    const [currentDate, setCurrentDate] = React.useState(value || new Date())
    const selectedDate = value;

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayIndex = new Date(year, month, 1).getDay()

    const handlePrevMonth = () => {
      setCurrentDate(new Date(year, month - 1, 1))
    }

    const handleNextMonth = () => {
      setCurrentDate(new Date(year, month + 1, 1))
    }

    const handleDateClick = (day: number) => {
      const clickedDate = new Date(year, month, day)
      if (onChange) onChange(clickedDate)
    }

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const blankDays = Array.from({ length: firstDayIndex }, (_, i) => i)

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    return (
      <div
        ref={ref}
        className={cn("p-4 bg-background border border-border rounded-xl shadow-2xs max-w-[280px] w-full", className)}
      >
        {/* Header section */}
        <div className="flex items-center justify-between pb-3">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-foreground select-none">
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Weekdays layout */}
        <div className="grid grid-cols-7 gap-1 text-center pb-1">
          {weekdays.map((day) => (
            <span key={day} className="text-xs font-medium text-muted-foreground select-none h-6 w-6 flex items-center justify-center mx-auto">
              {day}
            </span>
          ))}
        </div>

        {/* Month grid matrix */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {blankDays.map((blank) => (
            <div key={`blank-${blank}`} className="h-7 w-7" />
          ))}
          {daysArray.map((day) => {
            const isSelected =
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === month &&
              selectedDate.getFullYear() === year

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDateClick(day)}
                className={cn(
                  "h-7 w-7 text-xs font-normal rounded-md flex items-center justify-center mx-auto cursor-pointer transition-all select-none",
                  isSelected
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }