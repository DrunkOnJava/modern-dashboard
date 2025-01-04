import { Context } from "@netlify/edge-functions";
import { Storage } from "@google-cloud/storage";

interface PropRules {
  [component: string]: string[];
}

interface Dependencies {
  [component: string]: string[];
}

interface StyleGroup {
  [group: string]: string[];
}

interface ValidationReport {
  validationResults: {
    [component: string]: {
      propsValid: boolean;
      dependenciesValid: boolean;
      styleValid: boolean;
      issues: string[];
    };
  };
  integrationIssues: string[];
  unusedFeatures: string[];
  timestamp: string;
  siteId: string;
  summary: {
    totalComponents: number;
    validComponents: number;
    issueCount: number;
  };
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

async function logValidation(report: ValidationReport): Promise<void> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const file = bucket.file(
    `metrics/integration-validation/${new Date().toISOString()}.json`
  );

  try {
    await file.save(JSON.stringify(report, null, 2), {
      contentType: "application/json",
      metadata: {
        type: "integration-validation",
        timestamp: report.timestamp,
        siteId: report.siteId,
        issueCount: report.summary.issueCount.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to log validation:", error);
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
    const integrationRules = {
      requiredProps: {
        DashboardCard: ["title", "type"],
        ChartContainer: ["data", "type"],
        GraphCard: ["data", "title", "type"],
        WeatherCard: ["location", "unit"],
        StatCard: ["value", "label", "trend"],
        TableCard: ["data", "columns"],
      },
      dependencies: {
        GraphCard: ["ChartContainer", "TrendIndicator"],
        WeatherCard: ["IconPicker"],
        DashboardGrid: ["DashboardCard", "AddCardModal"],
        StatCard: ["TrendIndicator", "SparkLine"],
        TableCard: ["DataTable", "TablePagination"],
      },
      styleConsistency: {
        buttons: ["Button", "IconButton"],
        cards: ["BaseCard", "DetailedCard"],
        charts: ["AreaChart", "BarChart", "LineChart"],
        layout: ["Grid", "Flex", "Container"],
      },
    };

    // Get component usage data from request body
    const usage = await req.json().catch(() => ({}));
    const componentUsage = usage.components || {};

    const report: ValidationReport = {
      validationResults: {},
      integrationIssues: [],
      unusedFeatures: [],
      timestamp: new Date().toISOString(),
      siteId: context.site?.id || "unknown",
      summary: {
        totalComponents: 0,
        validComponents: 0,
        issueCount: 0,
      },
    };

    // Track total components
    report.summary.totalComponents = Object.keys(
      integrationRules.requiredProps
    ).length;

    // Validate required props
    Object.entries(integrationRules.requiredProps).forEach(
      ([component, requiredProps]) => {
        const componentData = componentUsage[component] || {};
        const providedProps = componentData.props || [];
        const missingProps = requiredProps.filter(
          (prop) => !providedProps.includes(prop)
        );

        report.validationResults[component] = {
          propsValid: missingProps.length === 0,
          dependenciesValid: true,
          styleValid: true,
          issues: [],
        };

        if (missingProps.length > 0) {
          report.validationResults[component].issues.push(
            `Missing required props: ${missingProps.join(", ")}`
          );
          report.integrationIssues.push(
            `${component} is missing required props: ${missingProps.join(", ")}`
          );
          report.summary.issueCount += missingProps.length;
        }
      }
    );

    // Validate dependencies
    Object.entries(integrationRules.dependencies).forEach(
      ([component, dependencies]) => {
        const componentData = componentUsage[component] || {};
        const availableDeps = componentData.dependencies || [];
        const missingDeps = dependencies.filter(
          (dep) => !availableDeps.includes(dep)
        );

        if (!report.validationResults[component]) {
          report.validationResults[component] = {
            propsValid: true,
            dependenciesValid: true,
            styleValid: true,
            issues: [],
          };
        }

        report.validationResults[component].dependenciesValid =
          missingDeps.length === 0;

        if (missingDeps.length > 0) {
          report.validationResults[component].issues.push(
            `Missing dependencies: ${missingDeps.join(", ")}`
          );
          report.integrationIssues.push(
            `${component} is missing dependencies: ${missingDeps.join(", ")}`
          );
          report.summary.issueCount += missingDeps.length;
        }
      }
    );

    // Validate style consistency
    Object.entries(integrationRules.styleConsistency).forEach(
      ([group, components]) => {
        const usedComponents = components.filter(
          (component) => componentUsage[component]
        );

        if (
          usedComponents.length > 0 &&
          usedComponents.length < components.length
        ) {
          const unusedComponents = components.filter(
            (component) => !componentUsage[component]
          );
          report.unusedFeatures.push(
            `Unused ${group} components: ${unusedComponents.join(", ")}`
          );
          report.summary.issueCount += unusedComponents.length;
        }

        // Check style consistency across used components
        usedComponents.forEach((component) => {
          if (!report.validationResults[component]) {
            report.validationResults[component] = {
              propsValid: true,
              dependenciesValid: true,
              styleValid: true,
              issues: [],
            };
          }

          const componentStyles = componentUsage[component]?.styles || {};
          const groupStyles =
            componentUsage[usedComponents[0]]?.styles || componentStyles;

          const inconsistentStyles = Object.keys(groupStyles).filter(
            (style) => componentStyles[style] !== groupStyles[style]
          );

          if (inconsistentStyles.length > 0) {
            report.validationResults[component].styleValid = false;
            report.validationResults[component].issues.push(
              `Inconsistent styles: ${inconsistentStyles.join(", ")}`
            );
            report.integrationIssues.push(
              `${component} has inconsistent ${group} styling`
            );
            report.summary.issueCount += inconsistentStyles.length;
          }
        });
      }
    );

    // Calculate valid components
    report.summary.validComponents = Object.values(
      report.validationResults
    ).filter(
      (result) =>
        result.propsValid && result.dependenciesValid && result.styleValid
    ).length;

    // Log validation results to Google Cloud Storage
    await logValidation(report);

    return new Response(JSON.stringify(report), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    console.error("Integration validation failed:", error);
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
