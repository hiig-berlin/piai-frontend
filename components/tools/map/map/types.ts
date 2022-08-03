export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  id: number;
  name: string;
  slug: string;
  city: string;
  country: string;
  organisation: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface GeoJson {
  type: string;
  features: Feature[];
}
