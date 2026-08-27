// Distance service abstraction.
//
// Real road-distance calculation with no server dependency, so it works both
// on Lovable hosting and on a fully static host such as GitHub Pages:
//   1. Geocode the customer's address (Nominatim / OpenStreetMap).
//   2. Route from the barber's base coordinates to that point (OSRM), which
//      returns real driving distance along the road network — never
//      straight-line.
//
// The UI depends ONLY on the `DistanceService` interface below, so another
// provider (Google Routes, Mapbox Directions) can be swapped in later.

import type { Barber } from "./barbers";

export type DistanceResult = {
  distanceKm: number;
  durationMin: number;
  provider: "osrm" | "google" | "mapbox";
  resolvedAddress: string;
};

export class DistanceError extends Error {
  code: "not_found" | "route_failed" | "network";
  constructor(code: DistanceError["code"], message: string) {
    super(message);
    this.code = code;
    this.name = "DistanceError";
  }
}

export interface DistanceService {
  getDistance(args: {
    barber: Barber;
    destinationAddress: string;
    signal?: AbortSignal;
  }): Promise<DistanceResult>;
}

const GEOCODE_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

type GeocodeHit = { lat: string; lon: string; display_name: string };

const geocodeCache = new Map<string, { lat: number; lng: number; label: string }>();

async function geocode(address: string, signal?: AbortSignal) {
  const key = address.trim().toLowerCase();
  const cached = geocodeCache.get(key);
  if (cached) return cached;

  const url = `${GEOCODE_URL}?format=jsonv2&limit=1&countrycodes=za&addressdetails=0&q=${encodeURIComponent(
    address,
  )}`;

  let res: Response;
  try {
    res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new DistanceError("network", "Could not reach the address lookup service.");
  }
  if (!res.ok) throw new DistanceError("network", `Address lookup failed (${res.status}).`);

  const hits = (await res.json()) as GeocodeHit[];
  if (!Array.isArray(hits) || hits.length === 0) {
    throw new DistanceError("not_found", "We couldn't find that address. Try adding the suburb and city.");
  }
  const hit = hits[0]!;
  const point = { lat: Number(hit.lat), lng: Number(hit.lon), label: hit.display_name };
  geocodeCache.set(key, point);
  return point;
}

async function route(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  signal?: AbortSignal,
) {
  const url = `${OSRM_URL}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false&alternatives=false`;

  let res: Response;
  try {
    res = await fetch(url, { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new DistanceError("network", "Could not reach the routing service.");
  }
  if (!res.ok) throw new DistanceError("route_failed", `Routing failed (${res.status}).`);

  const data = (await res.json()) as {
    code?: string;
    routes?: { distance: number; duration: number }[];
  };
  const leg = data.routes?.[0];
  if (data.code !== "Ok" || !leg) {
    throw new DistanceError("route_failed", "We couldn't find a drivable route to that address.");
  }
  return leg;
}

export const osrmDistanceService: DistanceService = {
  async getDistance({ barber, destinationAddress, signal }) {
    const dest = await geocode(destinationAddress, signal);
    const leg = await route(barber.origin, dest, signal);
    return {
      // Road distance in metres → km, rounded to 1 decimal place.
      distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
      durationMin: Math.max(1, Math.round(leg.duration / 60)),
      provider: "osrm",
      resolvedAddress: dest.label,
    };
  },
};

// Single export the UI imports.
export const distanceService: DistanceService = osrmDistanceService;
