export { detectFramework, detectAllFrameworks, getAdapterById, getAllAdapters } from "./detector.js";
export type {
  FrameworkId,
  FrameworkInfo,
  FrameworkAdapter,
  DetectionResult,
} from "./types.js";
export { ALL_FRAMEWORKS } from "./types.js";
export { reactAdapter } from "./react.js";
export { nextjsAdapter } from "./nextjs.js";
export { vueAdapter } from "./vue.js";
export { nuxtAdapter } from "./nuxt.js";
export { solidAdapter } from "./solid.js";
export { svelteAdapter } from "./svelte.js";
export { astroAdapter } from "./astro.js";
export { remixAdapter } from "./remix.js";
