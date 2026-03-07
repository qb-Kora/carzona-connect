/**
 * Detect device capability level for performance scaling.
 * Runs once at module load — no React overhead.
 */

type DeviceLevel = "low" | "mid" | "high";

let cachedLevel: DeviceLevel | null = null;

function detect(): DeviceLevel {
  if (typeof window === "undefined") return "high";

  const cores = navigator.hardwareConcurrency || 0;
  const memory = (navigator as any).deviceMemory || 0; // GB, often 0 on iOS
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // iOS Safari doesn't reliably expose cores/memory — don't penalise unknown
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (prefersReduced) return "low";

  // Only mark as low if we *positively know* it's weak hardware
  // (cores reported AND very low, with memory also reported AND very low)
  if (!isIOS && cores > 0 && cores <= 2 && memory > 0 && memory <= 2) return "low";

  if (isMobile || isTablet) return "mid";
  if (cores > 0 && cores <= 4) return "mid";
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
