import { GeoJsonFeature } from "../map/types";

addEventListener("message", async (event) => {
  postMessage({
    result: (Array.isArray(event?.data?.geoJson?.features)
      ? event?.data?.geoJson
      : { features: [] }
    )?.features.filter((feature: GeoJsonFeature) => {
      return (event?.data?.ids ?? []).includes(feature.properties.id);
    }),
  });
});
