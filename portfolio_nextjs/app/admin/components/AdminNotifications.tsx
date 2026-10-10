"use client";

import dynamic from "next/dynamic";

const ToastContainer = dynamic(
  () => import("react-toastify").then((module) => module.ToastContainer),
  { ssr: false },
);

export default function AdminNotifications() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}
