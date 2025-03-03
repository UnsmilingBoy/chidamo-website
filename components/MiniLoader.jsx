"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the styles

export default function MiniLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false, // Hide spinner
      speed: 600, // Speed of the progress bar animation
      minimum: 0.2, // Minimum progress value before completion
      trickleSpeed: 200, // How fast it increases
    });

    NProgress.start(); // Start the progress bar

    const timer = setTimeout(() => {
      NProgress.done(); // Stop the progress bar
    }, 500); // Adjust timing if needed

    return () => clearTimeout(timer);
  }, [pathname]); // Runs when route changes

  return null;
}
