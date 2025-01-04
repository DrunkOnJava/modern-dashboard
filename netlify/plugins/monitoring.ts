import { Storage } from "@google-cloud/storage";

interface BuildUtils {
  build: {
    fail: (message: string, meta?: { error?: Error }) => void;
    success: (message: string) => void;
    notice: (message: string) => void;
    error: (message: string) => void;
  };
}

interface MonitoringConfig {
  gcloudProjectId: string;
  gcloudBucket: string;
  metricsEnabled: boolean;
  errorTrackingEnabled: boolean;
}

export const onPreBuild = async ({
  constants,
  utils: { build },
  inputs,
}: {
  constants: { SITE_ID: string; IS_LOCAL: boolean };
  utils: BuildUtils;
  inputs: MonitoringConfig;
}) => {
  try {
    // Initialize Google Cloud Storage for metrics
    const storage = new Storage({
      projectId: inputs.gcloudProjectId,
    });

    // Log build start
    await logMetric({
      storage,
      bucket: inputs.gcloudBucket,
      metric: {
        type: "build_start",
        timestamp: new Date().toISOString(),
        siteId: constants.SITE_ID,
        environment: constants.IS_LOCAL ? "development" : "production",
      },
    });

    build.success("Monitoring initialized successfully");
  } catch (error) {
    build.fail("Failed to initialize monitoring", { error });
  }
};

export const onBuild = async ({
  constants,
  utils: { build },
  inputs,
}: {
  constants: { SITE_ID: string; IS_LOCAL: boolean };
  utils: BuildUtils;
  inputs: MonitoringConfig;
}) => {
  if (!inputs.metricsEnabled) {
    build.notice("Metrics collection is disabled");
    return;
  }

  try {
    const storage = new Storage({
      projectId: inputs.gcloudProjectId,
    });

    // Collect build metrics
    const metrics = {
      type: "build_complete",
      timestamp: new Date().toISOString(),
      siteId: constants.SITE_ID,
      environment: constants.IS_LOCAL ? "development" : "production",
    };

    await logMetric({ storage, bucket: inputs.gcloudBucket, metric: metrics });
    build.success("Build metrics collected successfully");
  } catch (error) {
    build.fail("Failed to collect build metrics", { error });
  }
};

export const onError = async ({
  constants,
  utils: { build },
  inputs,
  error,
}: {
  constants: { SITE_ID: string; IS_LOCAL: boolean };
  utils: BuildUtils;
  inputs: MonitoringConfig;
  error: Error;
}) => {
  if (!inputs.errorTrackingEnabled) {
    build.notice("Error tracking is disabled");
    return;
  }

  try {
    const storage = new Storage({
      projectId: inputs.gcloudProjectId,
    });

    // Log error details
    await logMetric({
      storage,
      bucket: inputs.gcloudBucket,
      metric: {
        type: "build_error",
        timestamp: new Date().toISOString(),
        siteId: constants.SITE_ID,
        environment: constants.IS_LOCAL ? "development" : "production",
        error: {
          message: error.message,
          stack: error.stack,
        },
      },
    });

    build.error("Build error logged successfully");
  } catch (logError) {
    build.fail("Failed to log build error", { error: logError });
  }
};

async function logMetric({
  storage,
  bucket,
  metric,
}: {
  storage: Storage;
  bucket: string;
  metric: Record<string, any>;
}) {
  const bucketInstance = storage.bucket(bucket);
  const file = bucketInstance.file(
    `metrics/${metric.type}/${new Date().toISOString()}.json`
  );

  await file.save(JSON.stringify(metric, null, 2), {
    contentType: "application/json",
    metadata: {
      type: metric.type,
      timestamp: metric.timestamp,
    },
  });
}

export const config = {
  inputs: [
    {
      name: "gcloudProjectId",
      required: true,
    },
    {
      name: "gcloudBucket",
      required: true,
    },
    {
      name: "metricsEnabled",
      default: true,
    },
    {
      name: "errorTrackingEnabled",
      default: true,
    },
  ],
};
