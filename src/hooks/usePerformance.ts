import { useEffect, useRef } from "react";
import { performanceMonitor } from "../lib/performance/monitor";

interface UsePerformanceOptions {
  componentName: string;
  trackRender?: boolean;
  trackEffects?: boolean;
}

export function usePerformance({
  componentName,
  trackRender = true,
  trackEffects = false,
}: UsePerformanceOptions) {
  const renderStartTime = useRef<number>(0);
  const effectStartTime = useRef<number>(0);

  // Track component render time
  useEffect(() => {
    if (trackRender) {
      const renderTime = performance.now() - renderStartTime.current;
      performanceMonitor.recordMetric({
        name: "Custom",
        value: renderTime,
        timestamp: Date.now(),
        details: {
          type: "render",
          component: componentName,
        },
      });
    }
  });

  // Track effect execution time
  useEffect(() => {
    if (trackEffects) {
      const effectTime = performance.now() - effectStartTime.current;
      performanceMonitor.recordMetric({
        name: "Custom",
        value: effectTime,
        timestamp: Date.now(),
        details: {
          type: "effect",
          component: componentName,
        },
      });
    }
  });

  // Set start times before render
  renderStartTime.current = performance.now();
  effectStartTime.current = performance.now();

  return {
    trackInteraction: (interactionName: string, duration: number) => {
      performanceMonitor.recordMetric({
        name: "Custom",
        value: duration,
        timestamp: Date.now(),
        details: {
          type: "interaction",
          component: componentName,
          interaction: interactionName,
        },
      });
    },
  };
}
