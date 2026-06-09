import fs from "fs"
import path from "path"

const EXAMPLES_DIR = path.join(process.cwd(), "src/examples/base")

export function loadExampleSource(slug: string): string | null {
  try {
    const filePath = path.join(EXAMPLES_DIR, `${slug}.tsx`)
    if (!fs.existsSync(filePath)) return null
    return fs.readFileSync(filePath, "utf-8")
  } catch {
    return null
  }
}
