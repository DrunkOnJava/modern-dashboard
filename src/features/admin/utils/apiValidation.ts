import { z } from 'zod';

const apiConfigSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  provider: z.string().min(1, 'Provider is required'),
  endpoint: z.string().url('Invalid API endpoint URL'),
  apiKey: z.string().min(1, 'API key is required')
});

export async function validateAPIConfig(config: unknown) {
  try {
    await apiConfigSchema.parseAsync(config);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}

export async function testAPIConnection(endpoint: string, apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('API connection test failed');
    }

    return true;
  } catch (error) {
    throw new Error('Failed to connect to API endpoint');
  }
}