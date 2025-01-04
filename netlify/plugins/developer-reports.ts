import { Storage } from "@google-cloud/storage";

interface BuildUtils {
  build: {
    failPlugin: (message: string) => void;
    failBuild: (message: string) => void;
    success: (message: string) => void;
  };
}

interface Report {
  type: string;
  timestamp: string;
  data: any;
}

interface ReportSummary {
  componentHealth: {
    unusedComponents: number;
    errorProneComponents: number;
    totalComponents: number;
  };
  runtimeStability: {
    healthScore: number;
    warnings: number;
    recommendations: number;
  };
  integrationStatus: {
    validComponents: number;
    totalComponents: number;
    issueCount: number;
  };
}

async function generateReport(storage: Storage): Promise<ReportSummary> {
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET || "");
  const [files] = await bucket.getFiles({ prefix: "metrics/" });

  const lastDay = Date.now() - 24 * 60 * 60 * 1000;
  const recentFiles = files.filter((file) => {
    const timestamp = new Date(
      file.name.split("/").pop()?.replace(".json", "") || ""
    ).getTime();
    return timestamp > lastDay;
  });

  const reports: Report[] = await Promise.all(
    recentFiles.map(async (file) => {
      const [content] = await file.download();
      return JSON.parse(content.toString());
    })
  );

  const summary: ReportSummary = {
    componentHealth: {
      unusedComponents: 0,
      errorProneComponents: 0,
      totalComponents: 0,
    },
    runtimeStability: {
      healthScore: 100,
      warnings: 0,
      recommendations: 0,
    },
    integrationStatus: {
      validComponents: 0,
      totalComponents: 0,
      issueCount: 0,
    },
  };

  reports.forEach((report) => {
    if (report.type === "component-health") {
      summary.componentHealth.unusedComponents =
        report.data.unusedComponents.length;
      summary.componentHealth.errorProneComponents =
        report.data.errorProneComponents.length;
      summary.componentHealth.totalComponents = Object.keys(
        report.data.performanceMetrics
      ).length;
    } else if (report.type === "runtime-stability") {
      summary.runtimeStability.healthScore = Math.min(
        summary.runtimeStability.healthScore,
        report.data.healthScore
      );
      summary.runtimeStability.warnings += report.data.warnings.length;
      summary.runtimeStability.recommendations +=
        report.data.recommendations.length;
    } else if (report.type === "integration-validation") {
      summary.integrationStatus.validComponents =
        report.data.summary.validComponents;
      summary.integrationStatus.totalComponents =
        report.data.summary.totalComponents;
      summary.integrationStatus.issueCount = report.data.summary.issueCount;
    }
  });

  return summary;
}

async function sendSlackNotification(summary: ReportSummary) {
  if (!process.env.SLACK_WEBHOOK_URL) return;

  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📊 Daily Development Report",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*Component Health*\n" +
            `• ${summary.componentHealth.unusedComponents} unused components\n` +
            `• ${summary.componentHealth.errorProneComponents} error-prone components\n` +
            `• ${summary.componentHealth.totalComponents} total components`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*Runtime Stability*\n" +
            `• Health Score: ${summary.runtimeStability.healthScore}%\n` +
            `• ${summary.runtimeStability.warnings} warnings\n` +
            `• ${summary.runtimeStability.recommendations} recommendations`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*Integration Status*\n" +
            `• ${summary.integrationStatus.validComponents}/${summary.integrationStatus.totalComponents} valid components\n` +
            `• ${summary.integrationStatus.issueCount} integration issues`,
        },
      },
    ],
  };

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

async function generateGitHubIssues(summary: ReportSummary) {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) return;

  interface GitHubIssue {
    title: string;
    body: string;
    labels: string[];
  }

  const issues: GitHubIssue[] = [];

  if (summary.componentHealth.unusedComponents > 0) {
    issues.push({
      title: `🧹 Clean up ${summary.componentHealth.unusedComponents} unused components`,
      body: "Components that haven't been rendered in production should be reviewed for removal.",
      labels: ["cleanup", "components"],
    });
  }

  if (summary.runtimeStability.healthScore < 90) {
    issues.push({
      title: `⚠️ Runtime stability score below threshold (${summary.runtimeStability.healthScore}%)`,
      body: `${summary.runtimeStability.warnings} warnings and ${summary.runtimeStability.recommendations} recommendations need attention.`,
      labels: ["performance", "stability"],
    });
  }

  if (summary.integrationStatus.issueCount > 0) {
    issues.push({
      title: `🔧 Fix ${summary.integrationStatus.issueCount} component integration issues`,
      body: `${summary.integrationStatus.validComponents}/${summary.integrationStatus.totalComponents} components are properly integrated.`,
      labels: ["bug", "integration"],
    });
  }

  const [owner, repo] = process.env.GITHUB_REPO.split("/");

  for (const issue of issues) {
    await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      method: "POST",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    });
  }
}

export const onPostBuild = async ({
  utils: { build },
}: {
  utils: BuildUtils;
}) => {
  try {
    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
    });

    // Generate report summary
    const summary = await generateReport(storage);

    // Send notifications
    await Promise.all([
      sendSlackNotification(summary),
      generateGitHubIssues(summary),
    ]);

    build.success("Developer reports generated and notifications sent");
  } catch (error) {
    console.error("Failed to generate developer reports:", error);
    build.failPlugin("Failed to generate developer reports");
  }
};

export const config = {
  frequency: "daily",
};
