import { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { bootWebContainer, getWebContainerInstance } from '../services/webcontainer/boot';
import type { WebContainerError } from '../services/webcontainer/types';

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(getWebContainerInstance());
  const [ready, setReady] = useState(!!getWebContainerInstance());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initWebContainer = async () => {
      // Skip if already initialized
      if (getWebContainerInstance()) {
        return;
      }

      try {
        const instance = await bootWebContainer();
        
        if (!mounted) return;

        setWebcontainer(instance);
        setReady(true);
        setError(null);
      } catch (err) {
        if (!mounted) return;

        const error = err as WebContainerError;
        let message = 'Failed to initialize terminal';

        switch (error.code) {
          case 'UNSUPPORTED_ENVIRONMENT':
            message = 'WebContainer is not supported in this environment';
            break;
          case 'AUTH_ERROR':
            message = 'Failed to authenticate WebContainer';
            break;
          case 'BOOT_ERROR':
            message = 'Failed to start WebContainer';
            break;
          case 'FILESYSTEM_ERROR':
            message = 'Failed to initialize terminal filesystem';
            break;
        }

        console.error('WebContainer initialization error:', {
          code: error.code,
          message: error.message,
          details: error.details
        });
        
        setError(message);
        setReady(false);
        setWebcontainer(null);
      }
    };

    initWebContainer();

    return () => {
      mounted = false;
    };
  }, []);

  return { webcontainer, ready, error };
}