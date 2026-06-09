export interface ComponentProp {
  name: string
  type: string
  description: string
}

export interface ComponentMeta {
  name: string
  description: string
  props: ComponentProp[]
  accessibility: string
}

export const componentMeta: Record<string, ComponentMeta> = {
  accordion: {
    name: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal an associated section of content.",
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Determines whether one or multiple items can be open at once." },
      { name: "defaultValue", type: "string | string[]", description: "The initially open accordion item value(s)." },
      { name: "collapsible", type: "boolean", description: "Allow all items to be closed when type is single." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses WAI-ARIA Accordion pattern. Each panel is controlled by its triggering button via `aria-expanded` and `aria-controls` attributes.",
  },
  alert: {
    name: "Alert",
    description:
      "Displays a brief, important message that requires the user's attention without interrupting their workflow.",
    props: [
      { name: "variant", type: '"default" | "destructive"', description: "The visual style variant of the alert." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="alert"` to announce dynamic content to screen readers. Optionally supports `role="alertdialog"` for interactive alerts.',
  },
  "alert-dialog": {
    name: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with urgent information or requires a critical confirmation decision.",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Implements the WAI-ARIA Alert Dialog pattern. Focus is trapped within the dialog. Uses `role="alertdialog"` and `aria-modal="true"`.',
  },
  "aspect-ratio": {
    name: "Aspect Ratio",
    description:
      "Displays content within a desired ratio while preserving the element's intrinsic dimensions.",
    props: [
      { name: "ratio", type: "number", description: "The desired width/height ratio (e.g. 16/9)." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Renders a `<div>` with a padding-bottom trick. Content inside should have appropriate alt text or ARIA labels.",
  },
  avatar: {
    name: "Avatar",
    description: "An image element with a fallback placeholder that represents a user or entity.",
    props: [
      { name: "src", type: "string", description: "The image source URL." },
      { name: "alt", type: "string", description: "Alternative text for the image." },
      { name: "fallback", type: "React.ReactNode", description: "Fallback content when image is loading or fails." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Requires `alt` text on `AvatarImage` for screen reader users. The `AvatarFallback` provides accessible text when the image fails to load.",
  },
  badge: {
    name: "Badge",
    description:
      "A small visual label that highlights status, categorises content, or displays counts at a glance.",
    props: [
      { name: "variant", type: '"default" | "outline" | "destructive" | "secondary"', description: "The visual style variant of the badge." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Badges are decorative by default (`aria-hidden`). When used to convey status, ensure the information is also available in text.",
  },
  breadcrumb: {
    name: "Breadcrumb",
    description:
      "Displays the current page location within a navigational hierarchy as a chain of clickable segments.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `nav` element with `aria-label="Breadcrumb"`. Each segment is a link except the current page which uses `aria-current="page"`.',
  },
  button: {
    name: "Button",
    description:
      "An interactive element used to trigger actions, submit forms, or navigate across application views.",
    props: [
      { name: "variant", type: '"default" | "outline" | "destructive" | "ghost" | "link"', description: "The visual style variant of the button." },
      { name: "size", type: '"sm" | "default" | "lg" | "icon"', description: "The size of the button." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<button>` element, providing built-in keyboard interaction and focus management. Supports `aria-pressed` for toggle states.",
  },
  calendar: {
    name: "Calendar",
    description:
      "A date picker component that lets users select single dates or ranges through an interactive month grid.",
    props: [
      { name: "mode", type: '"single" | "multiple" | "range"', description: "Selection mode." },
      { name: "selected", type: "Date | Date[] | undefined", description: "The selected date(s)." },
      { name: "onSelect", type: "(date: Date | undefined) => void", description: "Callback when a date is selected." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<button>` elements for each day. Navigation is keyboard accessible with arrow keys.",
  },
  card: {
    name: "Card",
    description:
      "A flexible container that groups related content and actions into a single visually bounded surface.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses semantic HTML sections. Cards are focusable when interactive. Use `article` or `section` elements as appropriate.",
  },
  carousel: {
    name: "Carousel",
    description:
      "A horizontally scrolling container that cycles through a set of items, one at a time.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
      { name: "opts", type: "object", description: "Carousel options (loop, align, etc.)." },
    ],
    accessibility:
      'Requires `aria-roledescription="carousel"` and `aria-label` on the container. Each slide uses `role="group"` with `aria-roledescription="slide"`.',
  },
  checkbox: {
    name: "Checkbox",
    description:
      "A binary control that allows users to toggle between checked and unchecked states for selections.",
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Supports indeterminate state via `aria-checked="mixed"`. Uses native `<input type="checkbox">` for built-in accessibility.',
  },
  collapsible: {
    name: "Collapsible",
    description:
      "An expandable section that reveals and hides content with a smooth animated toggle transition.",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `aria-expanded` on the trigger button and `aria-controls` to reference the content panel.",
  },
  "context-menu": {
    name: "Context Menu",
    description:
      "A right-click contextual menu that surfaces relevant actions based on the target element.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Follows WAI-ARIA Menu pattern. Right-click and keyboard accessible via context menu key.',
  },
  dialog: {
    name: "Dialog",
    description:
      "A modal overlay that focuses the user on a specific task or piece of content by dimming the background.",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Implements the WAI-ARIA Dialog pattern. Focus is trapped. Uses `role="dialog"` and `aria-modal="true"`. Closes on `Escape` key.',
  },
  drawer: {
    name: "Drawer",
    description:
      "A mobile-first panel that slides in from the bottom or edge of the viewport to reveal related actions.",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="dialog"` and `aria-modal="true"`. Focus is trapped. Closes on `Escape` key.',
  },
  "dropdown-menu": {
    name: "Dropdown Menu",
    description:
      "A floating menu of actions or links triggered by clicking a toggle element like a button or avatar.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Follows WAI-ARIA Menu pattern. Uses `role="menu"`, `role="menuitem"`. Arrow key navigation between items.',
  },
  "hover-card": {
    name: "Hover Card",
    description:
      "A floating card that reveals rich preview content when the user hovers over a trigger element.",
    props: [
      { name: "openDelay", type: "number", description: "Delay in ms before opening." },
      { name: "closeDelay", type: "number", description: "Delay in ms before closing." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `aria-describedby` to link the trigger to the card content. Appears on hover or focus. Dismissible with `Escape`.",
  },
  input: {
    name: "Input",
    description:
      "A styled text field that accepts user input for forms, search, or data entry workflows.",
    props: [
      { name: "type", type: "string", description: "The HTML input type (text, email, password, etc.)." },
      { name: "placeholder", type: "string", description: "Placeholder text shown when input is empty." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<input>` elements for built-in form accessibility. Supports `aria-invalid`, `aria-describedby`, and `aria-required`.",
  },
  "input-group": {
    name: "Input Group",
    description:
      "Groups an input with leading or trailing adornments like icons or buttons.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<input>` element inside a grouped container. Ensure labels are associated properly.",
  },
  "input-otp": {
    name: "Input OTP",
    description:
      "A one-time passcode input with separate slots for each character.",
    props: [
      { name: "maxLength", type: "number", description: "Maximum number of OTP characters." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onChange", type: "(value: string) => void", description: "Callback when value changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `<input>` elements with `aria-label` for each slot. Provides keyboard navigation between slots.",
  },
  kbd: {
    name: "Kbd",
    description:
      "A styled keyboard key indicator that shows keyboard shortcuts or key combinations.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `<kbd>` element for semantic meaning. Purely presentational.",
  },
  label: {
    name: "Label",
    description:
      "A text label paired with a form control, providing accessible naming and click-to-focus behaviour.",
    props: [
      { name: "htmlFor", type: "string", description: "The `id` of the associated form control." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<label>` element. When `htmlFor` is set, clicking the label focuses the associated input.",
  },
  "number-field": {
    name: "Number Field",
    description:
      "A numeric input field with increment and decrement controls for precise value adjustment.",
    props: [
      { name: "value", type: "number", description: "Controlled value." },
      { name: "onValueChange", type: "(value: number) => void", description: "Callback when value changes." },
      { name: "min", type: "number", description: "Minimum allowed value." },
      { name: "max", type: "number", description: "Maximum allowed value." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `<input type=\"text\">` with `role=\"spinbutton\"` and `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.",
  },
  pagination: {
    name: "Pagination",
    description:
      "Controls for navigating through multi-page datasets with page numbers and next/previous buttons.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `nav` with `aria-label=\"Pagination\"`. Current page uses `aria-current=\"page\"`. All controls are keyboard accessible.",
  },
  popover: {
    name: "Popover",
    description:
      "A floating overlay that appears near a trigger to present additional options or inline information.",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `aria-haspopup="dialog"` on the trigger. Focus is trapped within the popover when open.',
  },
  progress: {
    name: "Progress",
    description:
      "A visual indicator that displays the completion status of a task or process as a filled bar.",
    props: [
      { name: "value", type: "number", description: "The current progress value (0-100)." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.',
  },
  "radio-group": {
    name: "Radio Group",
    description:
      "A set of mutually exclusive options where only one choice can be selected at any given time.",
    props: [
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Implements the WAI-ARIA Radio Group pattern. Uses `role="radiogroup"` and `role="radio"`. Arrow key navigation between options.',
  },
  "scroll-area": {
    name: "Scroll Area",
    description:
      "A custom-styled scroll container that replaces the native browser scrollbar for consistent cross-browser design.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses a container with custom scrollbar styling. Content should follow standard focus and tab order.",
  },
  select: {
    name: "Select",
    description:
      "A dropdown picker that lets users choose a single value from a collapsible list of predefined options.",
    props: [
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes." },
      { name: "placeholder", type: "string", description: "Placeholder text before a value is selected." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Implements the WAI-ARIA Listbox pattern. Uses `role="combobox"` and `role="listbox"` with `aria-selected` for options.',
  },
  separator: {
    name: "Separator",
    description:
      "A thin visual divider that separates content sections or groups into distinct horizontal or vertical zones.",
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', description: "The orientation of the separator." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `role=\"separator\"` when decorative. Can be oriented horizontally or vertically.",
  },
  sidebar: {
    name: "Sidebar",
    description:
      "A collapsible sidebar navigation panel that displays menu items and nested groups.",
    props: [
      { name: "collapsed", type: "boolean", description: "Controlled collapsed state." },
      { name: "onCollapse", type: "(collapsed: boolean) => void", description: "Callback when collapse state changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `nav` with `aria-label`. Menu items are keyboard accessible with arrow key navigation.",
  },
  skeleton: {
    name: "Skeleton",
    description:
      "A placeholder that mimics the shape of content while it loads, reducing perceived wait time.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `aria-hidden="true"` since skeleton placeholders are decorative. Content should be announced when loaded.',
  },
  slider: {
    name: "Slider",
    description:
      "A range input that lets users select a numeric value by dragging a handle along a horizontal track.",
    props: [
      { name: "value", type: "number[]", description: "Controlled value array." },
      { name: "onValueChange", type: "(value: number[]) => void", description: "Callback when value changes." },
      { name: "min", type: "number", description: "Minimum value." },
      { name: "max", type: "number", description: "Maximum value." },
      { name: "step", type: "number", description: "Step increment." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` attributes. Supports keyboard arrow navigation.',
  },
  sonner: {
    name: "Sonner",
    description:
      "An opinionated toast notification system that stacks brief, dismissible messages in the corner of the viewport.",
    props: [
      { name: "position", type: "string", description: "Corner position (top-right, bottom-right, etc.)." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="status"` or `role="alert"` for live region announcements. Automatically announced by screen readers.',
  },
  spinner: {
    name: "Spinner",
    description:
      "A loading progress indicator that shows an animated spinning icon.",
    props: [
      { name: "size", type: '"sm" | "default" | "lg"', description: "The size of the spinner." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `aria-label="Loading"` and `role="status"` to announce loading state to screen readers.',
  },
  switch: {
    name: "Switch",
    description:
      "A toggle control that instantly enables or disables a setting with a single click.",
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Uses `role="switch"` with `aria-checked` to indicate the toggle state. Supports keyboard activation via `Space` or `Enter`.',
  },
  table: {
    name: "Table",
    description:
      "A clean data table layout with styled rows, header columns, and responsive overflow handling.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements for proper screen reader navigation.",
  },
  tabs: {
    name: "Tabs",
    description:
      "A tabbed interface that switches between multiple content panels while keeping only one active at a time.",
    props: [
      { name: "value", type: "string", description: "Controlled active tab value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when active tab changes." },
      { name: "defaultValue", type: "string", description: "Default active tab value." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      'Implements the WAI-ARIA Tabs pattern. Uses `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected` and `aria-controls`.',
  },
  textarea: {
    name: "Textarea",
    description:
      "A multi-line text input that accommodates longer form responses such as comments or descriptions.",
    props: [
      { name: "placeholder", type: "string", description: "Placeholder text shown when textarea is empty." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses native `<textarea>` element for built-in form accessibility. Supports `aria-invalid` and `aria-describedby`.",
  },
  toast: {
    name: "Toast",
    description:
      "A lightweight notification that temporarily appears to confirm an action or alert the user.",
    props: [
      { name: "title", type: "string", description: "The toast title." },
      { name: "description", type: "string", description: "Optional description text." },
      { name: "duration", type: "number", description: "Duration in ms before auto-dismiss." },
    ],
    accessibility:
      'Uses `role="status"` or `role="alert"` for live region announcements. Automatically announced by screen readers.',
  },
  toggle: {
    name: "Toggle",
    description:
      "A button that switches between an on and off visual state, often used for formatting toolbars.",
    props: [
      { name: "pressed", type: "boolean", description: "Controlled pressed state." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback when pressed state changes." },
      { name: "disabled", type: "boolean", description: "When true, prevents interaction." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `aria-pressed` to indicate the pressed state. Keyboard accessible via `Space` or `Enter`.",
  },
  "toggle-group": {
    name: "Toggle Group",
    description:
      "A group of toggle buttons that allow single or multiple selection among related options.",
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Selection mode." },
      { name: "value", type: "string | string[]", description: "Controlled selected value(s)." },
      { name: "onValueChange", type: "(value: any) => void", description: "Callback when selection changes." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `role=\"group\"` with `aria-label`. Each toggle button uses `aria-pressed`.",
  },
  tooltip: {
    name: "Tooltip",
    description:
      "A small contextual label that appears on hover or focus to explain an element's purpose.",
    props: [
      { name: "content", type: "React.ReactNode", description: "The tooltip content." },
      { name: "side", type: '"top" | "bottom" | "left" | "right"', description: "Preferred side to display." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses `aria-describedby` to link the trigger to the tooltip content. Appears on hover and focus. Not focusable itself.",
  },
  typography: {
    name: "Typography",
    description:
      "A set of styled text elements for consistent typographic hierarchy throughout the application.",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    accessibility:
      "Uses semantic heading elements (`h1`-`h6`) and paragraph tags for proper document outline.",
  },
}
