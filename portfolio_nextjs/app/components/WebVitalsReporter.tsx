"use client";

import { useReportWebVitals } from "next/web-vitals";

function report(metric: { name: string; value: number; rating: string; id: string }) {
  console.info("[portfolio-vitals]", JSON.stringify({
    name: metric.name,
    value: Number(metric.value.toFixed(3)),
    rating: metric.rating,
    id: metric.id,
    path: window.location.pathname,
  }));
}

export default function WebVitalsReporter() {
  useReportWebVitals(report);
  return null;
}
