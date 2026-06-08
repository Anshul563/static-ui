"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import {
  DEFAULT_PACKAGE_MANAGER,
  PACKAGE_MANAGER_STORAGE_KEY,
  PackageManager,
} from "./package-manager"

interface PackageManagerContextType {
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
}

const PackageManagerContext = createContext<PackageManagerContextType>({
  packageManager: DEFAULT_PACKAGE_MANAGER,
  setPackageManager: () => {},
})

export function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(DEFAULT_PACKAGE_MANAGER)

  useEffect(() => {
    const stored = localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY)
    if (stored && ["npm", "pnpm", "yarn", "bun"].includes(stored)) {
      setPackageManagerState(stored as PackageManager)
    }
  }, [])

  const setPackageManager = useCallback((pm: PackageManager) => {
    setPackageManagerState(pm)
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, pm)
  }, [])

  return (
    <PackageManagerContext.Provider value={{ packageManager, setPackageManager }}>
      {children}
    </PackageManagerContext.Provider>
  )
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext)
  if (!context) {
    throw new Error("usePackageManager must be used within a PackageManagerProvider")
  }
  return context
}
