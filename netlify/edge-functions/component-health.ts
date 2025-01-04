import { Context } from "@netlify/edge-functions";
import { Storage } from "@google-cloud/storage";

interface ComponentMetrics {
  renderTime: number;
  errorCount: number;
  lastRendered: string;
  renderCount: number;
  memoryUsage: number;
  webVitals: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface ComponentRegistry {
  [key: string]: string[];
}

interface HealthReport {
  unusedComponents: string[];
  errorProneComponents: string[];
  performanceMetrics: { [key: string]: ComponentMetrics };
  integrationStatus: { [key: string]: boolean };
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

async function logMetrics(report: HealthReport): Promise<void> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const file = bucket.file(
    `metrics/component-health/${new Date().toISOString()}.json`
  );

  try {
    await file.save(JSON.stringify(report, null, 2), {
      contentType: "application/json",
      metadata: {
        type: "component-health",
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
    const componentRegistry: ComponentRegistry = {
      charts: [
        "/components/charts/AreaChart",
        "/components/charts/BarChart",
        "/components/charts/LineChart",
        "/components/charts/PieChart",
        "/components/charts/RadarChart",
        "/components/charts/SparkLine",
      ],
      cards: [
        "/components/cards/BaseCard",
        "/components/cards/CompactCard",
        "/components/cards/DetailedCard",
        "/components/cards/GraphCard",
        "/components/cards/ProgressCard",
        "/components/cards/StatCard",
        "/components/cards/StockCard",
        "/components/cards/TableCard",
        "/components/cards/WeatherCard",
      ],
    };

    // Get component metrics from request body
    const metrics = await req.json().catch(() => ({}));
    const webVitals = metrics.webVitals || {};
    const componentMetrics = metrics.components || {};

    const report: HealthReport = {
      unusedComponents: [],
      errorProneComponents: [],
      performanceMetrics: {},
      integrationStatus: {},
      timestamp: new Date().toISOString(),
      siteId: context.site?.id || "unknown",
    };

    // Process component metrics
    Object.entries(componentRegistry).forEach(([category, components]) => {
      components.forEach((component) => {
        const metric = componentMetrics[component] || {
          renderTime: 0,
          errorCount: 0,
          lastRendered: "",
          renderCount: 0,
          memoryUsage: 0,
          webVitals: {
            fcp: webVitals.fcp || 0,
            lcp: webVitals.lcp || 0,
            fid: webVitals.fid || 0,
            cls: webVitals.cls || 0,
          },
        };

        // Track unused components
        if (metric.renderCount === 0) {
          report.unusedComponents.push(component);
        }

        // Track error-prone components (error rate > 5%)
        if (
          metric.renderCount > 0 &&
          metric.errorCount / metric.renderCount > 0.05
        ) {
          report.errorProneComponents.push(component);
        }

        // Store performance metrics
        report.performanceMetrics[component] = metric;

        // Check integration status
        report.integrationStatus[component] =
          metric.renderCount > 0 && metric.errorCount === 0;
      });
    });

    // Log metrics to Google Cloud Storage
    await logMetrics(report);

    return new Response(JSON.stringify(report), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    console.error("Component health check failed:", error);
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
