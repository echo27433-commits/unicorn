export type Location = {
  id: string;
  country: string;
  city: string;
  timezone: string;
  lat: number;
  lng: number;
  zoom: number;
};

export const locations: Location[] = [
  {
    id: "dubai",
    country: "UAE",
    city: "Dubai",
    timezone: "GST · UTC+4",
    lat: 25.2048,
    lng: 55.2708,
    zoom: 6,
  },
  {
    id: "saudi",
    country: "Saudi Arabia",
    city: "Riyadh",
    timezone: "AST · UTC+3",
    lat: 24.7136,
    lng: 46.6753,
    zoom: 6,
  },
  {
    id: "bahrain",
    country: "Bahrain",
    city: "Manama",
    timezone: "AST · UTC+3",
    lat: 26.2235,
    lng: 50.5876,
    zoom: 6,
  },
  {
    id: "qatar",
    country: "Qatar",
    city: "Doha",
    timezone: "AST · UTC+3",
    lat: 25.2854,
    lng: 51.531,
    zoom: 6,
  },
  {
    id: "india",
    country: "India",
    city: "Mumbai",
    timezone: "IST · UTC+5:30",
    lat: 19.076,
    lng: 72.8777,
    zoom: 6,
  },
];

export const routeCoords: [number, number][] = locations.map((l) => [l.lat, l.lng]);
