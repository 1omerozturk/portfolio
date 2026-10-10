"use client";

import React from "react";
const Loading = () => {
  return (
    <div className="surface-page flex min-h-64 items-center justify-center p-8 text-ink" role="status" aria-live="polite">
      <p>Yükleniyor…</p>
    </div>
  );
};
export default Loading;
