/**
 * Detect device capability level for performance scaling.
 * Runs once at module load — no React overhead.
 */

type DeviceLevel = "low" | "mid" | "high";

let cachedLevel: DeviceLevel | null = null;

function detect(): DeviceLevel {
  if (typeof window === "undefined") return "high";

  // iPad Mini 4 = 2 cores, low memory, old GPU
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 2; // GB
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return "low";
  if (cores <= 2 || memory <= 2) return "low";
  if (cores <= 4 || memory <= 4 || isMobile) return "mid";
  if (isTablet) return "mid";
  return "high";
}

export function getDeviceLevel(): DeviceLevel {
  if (cachedLevel === null) cachedLevel = detect();
  return cachedLevel;
}

export function isLowEnd(): boolean {
  return getDeviceLevel() === "low";
}

export function isMidOrLow(): boolean {
  return getDeviceLevel() !== "high";
}

/** Get particle/element count scaled to device capability */
export function scaledCount(high: number, mid: number, low: number): number {
  const level = getDeviceLevel();
  if (level === "low") return low;
  if (level === "mid") return mid;
  return high;
}
