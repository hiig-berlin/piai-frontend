import { GeoJson, GeoJsonFeature } from "../map/types";

const search = (s: string, geoJson: GeoJson) => {
  if (!geoJson?.features?.length) return {};

  const search = s.toLowerCase();

  return geoJson.features.filter((feature: GeoJsonFeature) => {
    return Object.keys(feature.properties).some((key: any) => {
      return (
        (feature.properties as any)[key] &&
        JSON.stringify((feature.properties as any)[key])
          .toLowerCase()
          .trim()
          .includes(search)
      );
    });
  });
};

addEventListener("message", async (event) => {
  postMessage({
    result: search(event.data.s, event.data.geoJson),
    s: event.data.s,
  });
});
