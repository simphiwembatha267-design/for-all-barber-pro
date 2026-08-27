// Barber configuration. In future, replace with data fetched from the backend.

export type Barber = {
  id: string;
  name: string;
  // Origin coordinates — used by the distance service when a real provider
  // (Google Maps / Mapbox) is wired in.
  origin: { lat: number; lng: number; address: string };
  // Pricing knobs per barber.
  baseCalloutFee: number; // in Rand
  perKmRate: number; // in Rand
  serviceRadiusKm: number;
};

export const defaultBarber: Barber = {
  id: "marco-d",
  name: "Marco D.",
  origin: {
    lat: -26.1076,
    lng: 28.0567,
    address: "Sandton, Johannesburg",
  },
  baseCalloutFee: 30,
  perKmRate: 6,
  serviceRadiusKm: 25,
};
