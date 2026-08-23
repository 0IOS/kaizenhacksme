/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __VUE_PROD_DEVTOOLS__: boolean

/*
 * Import meta environment variables.
 * Vite makes these available under `import.meta.env` at build time.
 * Only variables starting with `VITE_` are exposed to the frontend.
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_GEMINI_API_KEY: string
  // Add other env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}