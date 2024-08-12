export interface GeoJsonGeometry {
  type: string;
  coordinates: number[];
}

export interface GeoJsonProperties {
  id: number;
  name: string;
  slug: string;
  city: string;
  country: string;
  organisation: string;
}

export interface GeoJsonFeature {
  type: string;
  geometry: GeoJsonGeometry;
  properties: GeoJsonProperties;
}

export interface GeoJson {
  type: string;
  features: GeoJsonFeature[];
}
