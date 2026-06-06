"use client"

import * as React from "react"

export function Dashboard02() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-background p-4">
        <div className="text-lg font-bold text-foreground mb-8">Static UI</div>
        <nav className="space-y-1">
          {["Overview", "Analytics", "Reports", "Settings"].map((item) => (
            <a key={item} href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Track your performance metrics.</p>
          </div>
          <select className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
            <p className="text-sm text-muted-foreground mb-2">Page Views</p>
            <p className="text-3xl font-bold text-foreground">54,321</p>
            <div className="mt-4 h-32 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
            <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
            <p className="text-3xl font-bold text-foreground">3.24%</p>
            <div className="mt-4 h-32 flex items-end gap-2">
              {[30, 50, 35, 60, 45, 70, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-green-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
