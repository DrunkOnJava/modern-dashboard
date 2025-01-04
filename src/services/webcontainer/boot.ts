import { WebContainer } from '@webcontainer/api';
import { initializeFilesystem } from './filesystem';
import type { WebContainerError } from './types';

let instance: WebContainer | null = null;

export async function bootWebContainer(): Promise<WebContainer> {
  if (typeof window === 'undefined') {
    throw new Error('WebContainer requires a browser environment');
  }

  // Return existing instance if already booted
  if (instance) {
    return instance;
  }

  try {
    // Boot WebContainer first
    instance = await WebContainer.boot();
    
    // Initialize filesystem
    await initializeFilesystem(instance);

    return instance;
  } catch (error) {
    // Clean up instance if initialization fails
    instance = null;

    const err = error as WebContainerError;
    err.code = err.code || 'BOOT_ERROR';
    
    // Add more context to the error
    console.error('WebContainer boot error:', {
      message: err.message,
      code: err.code,
      cause: err.cause
    });
    
    throw err;
  }
}

export function getWebContainerInstance(): WebContainer | null {
  return instance;
}