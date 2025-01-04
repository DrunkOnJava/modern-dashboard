import { Context } from "@netlify/edge-functions";
import { Storage } from "@google-cloud/storage";

interface SuspenseBoundaries {
  [path: string]: string[];
}

interface ComponentTree {
  [component: string]: {
    children: string[];
    props: string[];
    depth: number;
  };
}

interface StabilityReport {
  healthScore: number;
  recommendations: string[];
  warnings: string[];
  metrics: {
    suspenseLoadTimes: { [key: string]: number };
    lazyLoadTimes: { [key: string]: number };
    memoryUsage: number;
    treeDepth: number;
  };
  timestamp: string;
  siteId: string;
}

const RATE_LIMIT = {
  windowMs: 60000, // 1 minute
  maxRequests: 30,
};

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
});

async function getRateLimitInfo(
  ip: string
): Promise<{ remaining: number; reset: number }> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const file = bucket.file(`ratelimits/${ip}.json`);

  try {
    const [exists] = await file.exists();
    if (!exists) {
      return {
        remaining: RATE_LIMIT.maxRequests,
        reset: Date.now() + RATE_LIMIT.windowMs,
      };
    }

    const [content] = await file.download();
    const info = JSON.parse(content.toString());

    if (Date.now() > info.reset) {
      return {
        remaining: RATE_LIMIT.maxRequests,
        reset: Date.now() + RATE_LIMIT.windowMs,
      };
    }

    return info;
  } catch (error) {
    console.error("Rate limit check failed:", error);
    return {
      remaining: RATE_LIMIT.maxRequests,
      reset: Date.now() + RATE_LIMIT.windowMs,
    };
  }
}

async function updateRateLimit(
  ip: string,
  info: { remaining: number; reset: number }
): Promise<void> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const file = bucket.file(`ratelimits/${ip}.json`);

  try {
    await file.save(JSON.stringify(info), {
      contentType: "application/json",
    });
  } catch (error) {
    console.error("Failed to update rate limit:", error);
  }
}

async function logMetrics(report: StabilityReport): Promise<void> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const file = bucket.file(
    `metrics/runtime-stability/${new Date().toISOString()}.json`
  );

  try {
    await file.save(JSON.stringify(report, null, 2), {
      contentType: "application/json",
      metadata: {
        type: "runtime-stability",
        timestamp: report.timestamp,
        siteId: report.siteId,
      },
    });
  } catch (error) {
    console.error("Failed to log metrics:", error);
  }
}

export default async function handler(
  req: Request,
  context: Context
): Promise<Response> {
  // Rate limiting
  const clientIP = context.ip;
  const rateLimit = await getRateLimitInfo(clientIP);

  if (rateLimit.remaining <= 0) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  }

  await updateRateLimit(clientIP, {
    remaining: rateLimit.remaining - 1,
    reset: rateLimit.reset,
  });

  try {
    const stabilityChecks = {
      suspenseBoundaries: {
        "/": ["Dashboard"],
        "/profile": ["ProfilePage"],
        "/auth": ["AuthLayout", "LoginForm", "RegistrationForm"],
      },
      lazyLoadedComponents: [
        "Dashboard",
        "ProfilePage",
        "AuthLayout",
        "LoginForm",
        "RegistrationForm",
      ],
      componentTree: {
        Dashboard: {
          children: ["DashboardGrid", "DashboardHeader"],
          props: ["user", "settings"],
          depth: 1,
        },
        DashboardGrid: {
          children: ["DashboardCard", "AddCardModal"],
          props: ["cards", "layout"],
          depth: 2,
        },
      },
    };

    // Get runtime metrics from request body
    const metrics = await req.json().catch(() => ({}));
    const runtimeMetrics = metrics.runtime || {};

    const report: StabilityReport = {
      healthScore: 100,
      recommendations: [],
      warnings: [],
      metrics: {
        suspenseLoadTimes: {},
        lazyLoadTimes: {},
        memoryUsage: 0,
        treeDepth: 0,
      },
      timestamp: new Date().toISOString(),
      siteId: context.site?.id || "unknown",
    };

    // Process Suspense boundaries
    Object.entries(stabilityChecks.suspenseBoundaries).forEach(
      ([path, components]) => {
        components.forEach((component) => {
          const loadTime = runtimeMetrics?.suspense?.[component] || 0;
          report.metrics.suspenseLoadTimes[component] = loadTime;

          // Flag slow-loading components (> 500ms)
          if (loadTime > 500) {
            report.warnings.push(
              `Slow Suspense boundary: ${component} (${loadTime}ms)`
            );
            report.healthScore -= 5;
          }
        });
      }
    );

    // Process lazy loaded components
    stabilityChecks.lazyLoadedComponents.forEach((component) => {
      const loadTime = runtimeMetrics?.lazyLoad?.[component] || 0;
      report.metrics.lazyLoadTimes[component] = loadTime;

      // Flag slow lazy-loaded components (> 1000ms)
      if (loadTime > 1000) {
        report.warnings.push(
          `Slow lazy-loaded component: ${component} (${loadTime}ms)`
        );
        report.healthScore -= 5;
      }
    });

    // Analyze component tree
    let maxDepth = 0;
    Object.values(stabilityChecks.componentTree).forEach((node) => {
      maxDepth = Math.max(maxDepth, node.depth);

      // Check for deep prop drilling (depth > 3)
      if (node.depth > 3) {
        report.recommendations.push(
          `Consider using Context or state management for ${node.props.join(
            ", "
          )}`
        );
        report.healthScore -= 2;
      }
    });

    report.metrics.treeDepth = maxDepth;
    report.metrics.memoryUsage = runtimeMetrics?.memory || 0;

    // Memory usage warnings
    if (report.metrics.memoryUsage > 100) {
      report.warnings.push("High memory usage detected");
      report.healthScore -= 10;
    }

    // Log metrics to Google Cloud Storage
    await logMetrics(report);

    return new Response(JSON.stringify(report), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    console.error("Runtime stability check failed:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
