"use client"

import React, { useState } from "react"
import { Terminal, Check, Copy } from "lucide-react"

export default function DocsInstallationPage() {
  const [copiedInit, setCopiedInit] = useState(false)
  const [copiedAdd, setCopiedAdd] = useState(false)

  const handleCopy = async (text: string, setFlag: (f: boolean) => void) => {
    await navigator.clipboard.writeText(text)
    setFlag(true)
    setTimeout(() => setFlag(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Getting Started</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Installation</h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          How to configure and initialize the Static UI code generation workspace engine inside your project.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      {/* Step 1 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">1</span>
          Run the Initialization Script
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed pl-8">
          Execute our public scoped setup binary framework to prompt your visual layout manager and generate your system canvas configuration profile file.
        </p>
        
        <div className="pl-8 mt-2">
          <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a] p-3 pl-4 max-w-xl group">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
              <Terminal className="h-3.5 w-3.5 text-[#22c55e]" />
              <span>npx @static-ui/cli init</span>
            </div>
            <button 
              onClick={() => handleCopy("npx @static-ui/cli init", setCopiedInit)}
              className="flex h-7 w-12 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition-all active:scale-95 cursor-pointer"
            >
              {copiedInit ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3 text-neutral-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-3 mt-4">
        <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">2</span>
          Verify Config Schema Generation
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed pl-8">
          The initialization loop generates a <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">static.json</code> mapping configuration at the root of your folder structure. This schema handles your exact utility paths and configuration properties.
        </p>
      </div>

      {/* Step 3 */}
      <div className="space-y-3 mt-4">
        <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">3</span>
          Inject Component Primitives
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed pl-8">
          With your configuration sealed in place, use the <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">add</code> command argument to write code files directly into your specified layouts.
        </p>

        <div className="pl-8 mt-2">
          <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a] p-3 pl-4 max-w-xl group">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
              <Terminal className="h-3.5 w-3.5 text-[#22c55e]" />
              <span>npx @static-ui/cli add radio-group</span>
            </div>
            <button 
              onClick={() => handleCopy("npx @static-ui/cli add radio-group", setCopiedAdd)}
              className="flex h-7 w-12 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition-all active:scale-95 cursor-pointer"
            >
              {copiedAdd ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3 text-neutral-400" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}