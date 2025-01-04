import { auth } from '@webcontainer/api';
import { WEBCONTAINER_CONFIG } from './config';

export async function initializeWebContainerAuth() {
  try {
    await auth.init(WEBCONTAINER_CONFIG.AUTH);
    return true;
  } catch (error) {
    console.error('WebContainer auth initialization error:', error);
    return false;
  }
}