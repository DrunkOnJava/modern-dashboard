import type { WebContainer } from '@webcontainer/api';
import { WEBCONTAINER_CONFIG } from './config';

export async function initializeFilesystem(instance: WebContainer) {
  try {
    await instance.mount(WEBCONTAINER_CONFIG.FILESYSTEM);
  } catch (error) {
    console.error('Filesystem initialization error:', error);
    const err = new Error('Failed to initialize filesystem');
    err.cause = error;
    throw err;
  }
}