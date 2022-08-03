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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

addEventListener("message", async (event) => {
  await sleep(1500);
  postMessage(search(event.data.s, event.data.geoJson));
});
