import { lazy, ComponentType, LazyExoticComponent } from "react";

export interface PreloadableComponent<T extends ComponentType<any>> {
  preload: () => Promise<{ default: T }>;
}

export type LazyComponent<T extends ComponentType<any>> =
  LazyExoticComponent<T> & PreloadableComponent<T>;

export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyComponent<T> {
  const Component = lazy(factory);
  (Component as LazyComponent<T>).preload = factory;
  return Component as LazyComponent<T>;
}
