import { createAuthClient } from 'better-auth/react';

// Use these functions for client-side authentication
export const { signIn, signUp, signOut, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL,
});
