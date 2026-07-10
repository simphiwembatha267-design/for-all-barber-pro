// Pricing logic. Pure functions — no I/O, easy to unit test and reuse.

import type { Barber } from "./barbers";

export type ServiceQuote = {
  servicePrice: number;
  travelFee: number;
  total: number;
  distanceKm: number;
  baseCalloutFee: number;
  perKmRate: number;
  withinServiceArea: boolean;
};

export function parsePrice(price: string | number): number {
  if (typeof price === "number") return price;
  const n = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatZAR(n: number): string {
  return `R${Math.round(n)}`;
}

export function calculateTravelFee(distanceKm: number, barber: Barber): number {
  return barber.baseCalloutFee + distanceKm * barber.perKmRate;
}

export function calculateQuote(args: {
  barber: Barber;
  servicePrice: number | string;
  distanceKm: number;
}): ServiceQuote {
  const { barber, distanceKm } = args;
  const servicePrice = parsePrice(args.servicePrice);
  const withinServiceArea = distanceKm <= barber.serviceRadiusKm;
  const travelFee = withinServiceArea ? calculateTravelFee(distanceKm, barber) : 0;
  const total = withinServiceArea ? servicePrice + travelFee : 0;
  return {
    servicePrice,
    travelFee,
    total,
    distanceKm,
    baseCalloutFee: barber.baseCalloutFee,
    perKmRate: barber.perKmRate,
    withinServiceArea,
  };
}
