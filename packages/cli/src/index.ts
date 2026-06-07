#!/usr/bin/env node
import { Command } from "commander";
import { banner } from "./logger/index.js";
import { initAction } from "./commands/init.js";
import { addAction } from "./commands/add.js";
import { doctorAction } from "./commands/doctor.js";
import { themeAction } from "./commands/theme.js";
import { listAction } from "./commands/list.js";
import { updateAction } from "./commands/update.js";
import { searchAction } from "./commands/search.js";
import { diffAction } from "./commands/diff.js";
import { frameworkAction } from "./commands/framework.js";

const program = new Command();

banner();

program
  .name("static-ui")
  .description("Initialize and manage your Static UI component system")
  .version("0.0.9");

program
  .command("init")
  .description("Initialize Static UI in your project")
  .action(initAction);

program
  .command("add")
  .description("Add one or more components to your project")
  .argument("<components...>", "Component names to add (use 'all' for all components)")
  .action(addAction);

program
  .command("doctor")
  .description("Check your project setup for Static UI compatibility")
  .action(doctorAction);

program
  .command("theme")
  .description("Apply a theme to your project")
  .argument("[theme]", "Theme name (green, blue, zinc, slate, gaming, cyberpunk, modern)")
  .action(themeAction);

program
  .command("framework")
  .description("Display current framework information")
  .action(frameworkAction);

program
  .command("list")
  .description("List all available components from the registry")
  .action(listAction);

program
  .command("update")
  .description("Update installed components from the registry")
  .action(updateAction);

program
  .command("search")
  .description("Search the registry for components")
  .argument("[query]", "Search query")
  .action(searchAction);

program
  .command("diff")
  .description("Compare installed components with registry versions")
  .action(diffAction);

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error("CLI Execution Error:", error);
    process.exit(1);
  }
}

main();
