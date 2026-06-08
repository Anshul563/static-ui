import { readFileSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, "..")

let exitCode = 0

function error(msg) {
  console.error(`❌ ${msg}`)
  exitCode = 1
}

function ok(msg) {
  console.log(`✅ ${msg}`)
}

// Check registry.json exists
const registryMetaPath = resolve(root, "packages/registry/registry.json")
if (!existsSync(registryMetaPath)) {
  error("registry.json not found")
  process.exit(1)
}

const registryMeta = JSON.parse(readFileSync(registryMetaPath, "utf8"))
ok(`registry.json loaded (${registryMeta.components?.length || 0} components, ${registryMeta.blocks?.length || 0} blocks, ${registryMeta.templates?.length || 0} templates)`)

// Check dist/index.json exists
const distPath = resolve(root, "packages/registry/dist/index.json")
if (!existsSync(distPath)) {
  error("dist/index.json not found — run pnpm --filter @static-ui/registry build first")
  process.exit(1)
}

const registry = JSON.parse(readFileSync(distPath, "utf8"))
ok(`dist/index.json loaded (${registry.length} total entries)`)

// Check for duplicate names
const names = registry.map((i:  name ) => i.name)
const dups = names.filter((n, i) => names.indexOf(n) !== i)
if (dups.length > 0) {
  error(`Duplicate component names: ${[...new Set(dups)].join(", ")}`)
}

// Check required fields
for (const item of registry) {
  if (!item.name) error(`Entry missing name`)
  if (!item.type) error(`Entry ${item.name || "?"} missing type`)
  if (!item.files || !Array.isArray(item.files)) error(`Entry ${item.name} missing files array`)
  else {
    for (const file of item.files) {
      if (!file.name) error(`Entry ${item.name} has file missing name`)
      if (!file.content) error(`Entry ${item.name} file ${file.name || "?"} missing content`)
    }
  }
  if (!item.dependencies) error(`Entry ${item.name} missing dependencies`)
}

// Verify source files exist
const uiDir = resolve(root, "packages/ui/src")
for (const item of registry) {
  for (const file of item.files) {
    const filePath = resolve(uiDir, file.name)
    if (!existsSync(filePath)) {
      error(`Entry ${item.name} references ${file.name} but file does not exist at ${filePath}`)
    }
  }
}

// Check for missing framework mappings
for (const item of registry) {
  if (!item.frameworks || item.frameworks.length === 0) {
    error(`Entry ${item.name} has no framework mappings`)
  }
}

// Validate registry.json entries have corresponding build entries
const metaNames = new Map<string, boolean>()
for (const comp of [...(registryMeta.components || []), ...(registryMeta.blocks || []), ...(registryMeta.templates || [])]) {
  metaNames.set(comp.name, true)
}
for (const item of registry) {
  if (!metaNames.has(item.name)) {
    error(`Entry ${item.name} exists in dist but not in registry.json metadata`)
  }
}

if (exitCode === 0) {
  console.log(`\n🎉 Registry validation passed! (${registry.length} entries checked)`)
} else {
  console.log(`\n❌ Registry validation failed`)
}
process.exit(exitCode)
