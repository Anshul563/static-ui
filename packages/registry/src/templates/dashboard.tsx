"use client"

import * as React from "react"

export function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/50">
      <aside className="w-64 border-r border-border bg-background p-4">
        <div className="text-lg font-bold text-foreground mb-8">Static UI</div>
        <nav className="space-y-1">
          {["Overview", "Analytics", "Customers", "Settings"].map((item) => (
            <a key={item} href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, here is your overview.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Revenue", value: "$45,231", change: "+20.1%" },
            { label: "Active Users", value: "2,350", change: "+180.1%" },
            { label: "Sales", value: "12,234", change: "+19%" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-green-500">{stat.change}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
          <p className="text-sm text-muted-foreground mb-2">Recent Activity</p>
          <div className="text-sm text-foreground">No recent activity to show.</div>
        </div>
      </main>
    </div>
  )
}
