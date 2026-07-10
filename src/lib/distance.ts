// Distance service abstraction.
//
// The UI depends ONLY on the `DistanceService` interface below. To swap in
// Google Maps Distance Matrix or Mapbox later, implement `DistanceService`
// against that provider and export it as `distanceService` — no UI changes
// required.

import type { Barber } from "./barbers";

export type DistanceResult = {
  distanceKm: number;
  durationMin: number;
  provider: "mock" | "google" | "mapbox";
};

export interface DistanceService {
  getDistance(args: { barber: Barber; destinationAddress: string }): Promise<DistanceResult>;
}

// Deterministic pseudo-random from a string so the same address always
// resolves to the same mock distance — keeps the UI stable while typing.
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

export const mockDistanceService: DistanceService = {
  async getDistance({ destinationAddress }) {
    const normalized = destinationAddress.trim().toLowerCase();
    // Simulate a small network delay to mirror real API behaviour.
    await new Promise((r) => setTimeout(r, 350));
    // Distances from ~1.2km up to ~32km so we exercise the out-of-radius path.
    const km = +(1.2 + hashString(normalized) * 31).toFixed(1);
    const durationMin = Math.round(km * 2.4 + 5);
    return { distanceKm: km, durationMin, provider: "mock" };
  },
};

// Single export the UI imports. Replace this binding with a real
// implementation to go live.
export const distanceService: DistanceService = mockDistanceService;
