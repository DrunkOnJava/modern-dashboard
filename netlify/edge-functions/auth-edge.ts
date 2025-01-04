import { Context } from "@netlify/edge-functions";
import { createClient } from "@supabase/supabase-js";

interface NetlifyContext extends Context {
  env: {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
  };
}

export default async function handler(
  request: Request,
  context: NetlifyContext
) {
  const url = new URL(request.url);
  const authAction = url.pathname.split("/").pop();

  // Initialize Supabase client
  const supabase = createClient(
    context.env.VITE_SUPABASE_URL,
    context.env.VITE_SUPABASE_ANON_KEY
  );

  // CORS headers for pre-flight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    switch (authAction) {
      case "verify":
        return await handleVerification(request, supabase);
      case "refresh":
        return await handleTokenRefresh(request, supabase);
      case "logout":
        return await handleLogout(request, supabase);
      default:
        return new Response("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Auth edge function error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function handleVerification(request: Request, supabase: any) {
  const { token } = await request.json();

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function handleTokenRefresh(request: Request, supabase: any) {
  const { refresh_token } = await request.json();

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function handleLogout(request: Request, supabase: any) {
  const { session } = await request.json();

  const { error } = await supabase.auth.signOut({
    scope: "global",
    sessionId: session?.id,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
