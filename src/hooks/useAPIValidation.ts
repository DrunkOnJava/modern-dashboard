import { useState } from 'react';
import type { APIConnection } from '../types/dashboard';

export function useAPIValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateAPI = async (connection: APIConnection): Promise<boolean> => {
    setIsValidating(true);
    setValidationError(null);

    try {
      const response = await fetch(connection.endpoint, {
        headers: {
          'Authorization': `Bearer ${connection.key}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('API validation failed');
      }

      return true;
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Failed to validate API');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return { validateAPI, isValidating, validationError };
}