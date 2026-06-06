"use client";

import React, { useState } from "react";
import { ChevronRight, Terminal, Check, Copy } from "lucide-react";

// 1. Importing your TRUE production component from your local code workspace folder
import { Button } from "@static-ui/ui";

export default function ButtonDocsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const buttonCodeString = `import { Button } from "@/components/static-ui/button"

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary Accent</Button>
      <Button variant="outline">Outline Border</Button>
    </div>
  )
}`;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(buttonCodeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Header Info Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
          Docs <ChevronRight className="h-3 w-3" /> Components{" "}
          <ChevronRight className="h-3 w-3" />{" "}
          <span className="text-neutral-400">Button</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Button</h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
          An interactive anchor element used to trigger actions, handle form
          submission states, or fire navigation links.
        </p>
      </div>

      {/* Interactive Showcase Frame */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-1">
          <div className="flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "preview" ? "border-[#22c55e] text-[#22c55e] font-semibold" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "code" ? "border-[#22c55e] text-[#22c55e] font-semibold" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Code
            </button>
          </div>

          {activeTab === "code" && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
            >
              {copied ? (
                <Check className="h-3 w-3 text-[#22c55e]" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy Code"}
            </button>
          )}
        </div>

        {/* View Canvas Box */}
        <div className="rounded-xl border border-neutral-900 bg-[#030303] min-h-65 flex items-center justify-center p-6 relative overflow-hidden bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
          {activeTab === "preview" ? (
            <div className="animate-fadeIn gap-4 flex">
              {/* RENDERING THE TRUE COMPONENT DIRECTLY */}
              <Button variant={"default"}>Primary </Button>
              <Button variant={"outline"}>Outline</Button>
              <Button variant={"destructive"}>Destructive</Button>
            </div>
          ) : (
            <pre className="w-full font-mono text-[11px] text-neutral-300 overflow-x-auto whitespace-pre p-4 rounded-lg bg-[#050505] border border-neutral-950 text-left leading-relaxed">
              <code>{buttonCodeString}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Terminal Command Utility Box */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-white tracking-tight">
          Installation
        </h3>
        <p className="text-xs text-neutral-400">
          Inject this raw primitive directly into your code layers via the CLI
          bundle:
        </p>

        <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a]/80 p-3 pl-4 max-w-xl shadow-md">
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
            <Terminal className="h-3.5 w-3.5 text-[#22c55e]" />
            <span>npx @static-ui/cli add button</span>
          </div>
        </div>
      </div>
    </div>
  );
}
