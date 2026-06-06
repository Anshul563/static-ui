import * as p from "@clack/prompts";

export { p };

export async function confirmOrAbort(message: string): Promise<boolean> {
  const result = await p.confirm({ message });
  if (p.isCancel(result)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
  return result as boolean;
}

export async function selectFramework(): Promise<string> {
  const result = await p.select({
    message: "Which framework are you using?",
    options: [
      { value: "nextjs", label: "Next.js" },
      { value: "vite", label: "Vite" },
      { value: "react", label: "React" },
      { value: "remix", label: "Remix" },
    ],
  });
  if (p.isCancel(result)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
  return result as string;
}

export async function selectLanguage(): Promise<string> {
  const result = await p.select({
    message: "Which language are you using?",
    options: [
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
    ],
  });
  if (p.isCancel(result)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
  return result as string;
}

export async function selectLibrary(): Promise<string> {
  const result = await p.select({
    message: "Which UI library would you like to use?",
    options: [
      { value: "static-ui", label: "Static UI" },
      { value: "redux-ui", label: "Redux UI" },
    ],
  });
  if (p.isCancel(result)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
  return result as string;
}

export async function selectTheme(): Promise<string> {
  const result = await p.select({
    message: "Which theme would you like to use?",
    initialValue: "green",
    options: [
      { value: "green", label: "Green" },
      { value: "blue", label: "Blue" },
      { value: "zinc", label: "Zinc" },
      { value: "slate", label: "Slate" },
      { value: "gaming", label: "Gaming" },
      { value: "cyberpunk", label: "Cyberpunk" },
      { value: "modern", label: "Modern" },
    ],
  });
  if (p.isCancel(result)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
  return result as string;
}
