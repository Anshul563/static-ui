import { execSync } from "child_process"

function run(cmd: string) {
  console.log(`\n> ${cmd}`)
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() })
    console.log(`✅ ${cmd} passed`)
  } catch {
    console.error(`❌ ${cmd} failed`)
    process.exit(1)
  }
}

console.log("=== Static UI Release Pipeline ===\n")

run("pnpm typecheck")
run("pnpm lint")
run("pnpm test")
run("pnpm validate:registry")
run("pnpm size")
run("pnpm build")
run("pnpm syncpack")
run("pnpm knip")

console.log("\n=== All checks passed. Ready to publish! ===")
