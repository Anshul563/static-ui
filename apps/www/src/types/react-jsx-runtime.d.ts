// Temporary ambient declarations to help editors which can't resolve the
// automatic JSX runtime or JSX intrinsic element types in some setups.
// This file is intentionally minimal — it falls back to `any` for unknown
// intrinsic elements while preserving React element types.

import * as React from "react";

declare module "react/jsx-runtime" {
  export const Fragment: typeof React.Fragment;
  export function jsx(type: any, props: any, key?: any): React.ReactElement | null;
  export function jsxs(type: any, props: any, key?: any): React.ReactElement | null;
  export function jsxDEV(type: any, props: any, key?: any): React.ReactElement | null;
}

declare global {
  namespace JSX {
    type Element = React.ReactElement;
    type ElementClass = React.Component<any>;
    interface IntrinsicAttributes extends React.Attributes {}
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
    // Allow any intrinsic element to avoid editor errors when types aren't
    // fully resolved. Projects with stricter typing can remove this.
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
