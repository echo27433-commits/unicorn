export type Location = {
  id: string;
  country: string;
  city: string;
  timezone: string;
  description: string;
  lat: number;
  lng: number;
  zoom: number;
};

export const locations: Location[] = [
  {
    id: "dubai",
    country: "Dubai",
    city: "UAE",
    timezone: "GST · UTC+4",
    description: "Middle East headquarters for enterprise partnerships.",
    lat: 25.2048,
    lng: 55.2708,
    zoom: 6,
  },
  {
    id: "usa",
    country: "USA",
    city: "New York",
    timezone: "EST · UTC−5",
    description: "Americas strategy, sales & client success teams.",
    lat: 40.7128,
    lng: -74.006,
    zoom: 6,
  },
  {
    id: "india",
    country: "India",
    city: "Mumbai",
    timezone: "IST · UTC+5:30",
    description: "Engineering hub & delivery center for APAC clients.",
    lat: 19.076,
    lng: 72.8777,
    zoom: 6,
  },
];

export const routeCoords: [number, number][] = locations.map((l) => [l.lat, l.lng]);
