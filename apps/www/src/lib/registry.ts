export interface RegistryComponent {
  name: string
  slug: string
  description: string
  category: string
  dependencies: string[]
  importPath: string
}

export const categoryLabels: Record<string, string> = {
  layout: "Layout",
  feedback: "Feedback",
  overlay: "Overlay",
  "data-display": "Data Display",
  navigation: "Navigation",
  actions: "Actions",
  forms: "Forms",
  typography: "Typography",
}

export const components: RegistryComponent[] = [
  { name: "Accordion", slug: "accordion", description: "Vertically stacked interactive headings with reveal panels.", category: "layout", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Alert", slug: "alert", description: "Brief attention-grabbing messages.", category: "feedback", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Alert Dialog", slug: "alert-dialog", description: "Modal for urgent confirmations.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Aspect Ratio", slug: "aspect-ratio", description: "Content-sized to a desired ratio.", category: "layout", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Avatar", slug: "avatar", description: "User image with fallback placeholder.", category: "data-display", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Badge", slug: "badge", description: "Status labels and counters.", category: "data-display", dependencies: ["class-variance-authority"], importPath: "@static-ui/ui" },
  { name: "Breadcrumb", slug: "breadcrumb", description: "Hierarchical navigation chain.", category: "navigation", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Button", slug: "button", description: "Action-triggering interactive element.", category: "actions", dependencies: ["@base-ui/react", "class-variance-authority"], importPath: "@static-ui/ui" },
  { name: "Calendar", slug: "calendar", description: "Date selection month grid.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Card", slug: "card", description: "Bounded content container.", category: "layout", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Carousel", slug: "carousel", description: "Horizontally scrolling item sets.", category: "layout", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Checkbox", slug: "checkbox", description: "Binary selection control.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Collapsible", slug: "collapsible", description: "Expandable content sections.", category: "layout", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Context Menu", slug: "context-menu", description: "Right-click contextual action menu.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Dialog", slug: "dialog", description: "Modal overlay for focused tasks.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Drawer", slug: "drawer", description: "Slide-in edge panel.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Dropdown Menu", slug: "dropdown-menu", description: "Floating action menu.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Hover Card", slug: "hover-card", description: "Rich preview on hover.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Input", slug: "input", description: "Text field for user entry.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Input Group", slug: "input-group", description: "Grouped input with adornments.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Input OTP", slug: "input-otp", description: "One-time passcode entry.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Kbd", slug: "kbd", description: "Keyboard key indicator.", category: "data-display", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Label", slug: "label", description: "Form control label.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Number Field", slug: "number-field", description: "Numeric input with steppers.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Pagination", slug: "pagination", description: "Multi-page navigation.", category: "navigation", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Popover", slug: "popover", description: "Floating inline overlay.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Progress", slug: "progress", description: "Task completion indicator.", category: "feedback", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Radio Group", slug: "radio-group", description: "Mutually exclusive options.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Scroll Area", slug: "scroll-area", description: "Custom styled scroll container.", category: "layout", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Select", slug: "select", description: "Dropdown value picker.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Separator", slug: "separator", description: "Visual content divider.", category: "layout", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Sidebar", slug: "sidebar", description: "Collapsible sidebar navigation panel.", category: "navigation", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Skeleton", slug: "skeleton", description: "Loading state placeholder.", category: "feedback", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Slider", slug: "slider", description: "Drag handle range input.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Sonner", slug: "sonner", description: "Toast notification system.", category: "feedback", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Spinner", slug: "spinner", description: "Loading progress indicator.", category: "feedback", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Switch", slug: "switch", description: "Toggle on/off control.", category: "forms", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Table", slug: "table", description: "Structured data grid.", category: "data-display", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Tabs", slug: "tabs", description: "Tabbed content panels.", category: "layout", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Textarea", slug: "textarea", description: "Multi-line text input.", category: "forms", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Toast", slug: "toast", description: "Transient notification.", category: "feedback", dependencies: [], importPath: "@static-ui/ui" },
  { name: "Toggle", slug: "toggle", description: "On/off state button.", category: "actions", dependencies: ["@base-ui/react", "class-variance-authority"], importPath: "@static-ui/ui" },
  { name: "Toggle Group", slug: "toggle-group", description: "Grouped toggle buttons.", category: "actions", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Tooltip", slug: "tooltip", description: "Contextual hover label.", category: "overlay", dependencies: ["@base-ui/react"], importPath: "@static-ui/ui" },
  { name: "Typography", slug: "typography", description: "Styled text elements.", category: "typography", dependencies: [], importPath: "@static-ui/ui" },
]

export const registryBySlug = Object.fromEntries(components.map((c) => [c.slug, c]))

export function getRelatedComponents(slug: string): RegistryComponent[] {
  const current = registryBySlug[slug]
  if (!current) return []
  return components.filter((c) => c.category === current.category && c.slug !== slug)
}
