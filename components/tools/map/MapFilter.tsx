import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const MapFilter = () => {
  return (
    <SidebarDrawer
      columnWidth={0.333}
      initiallyOpen={true}
      statusFlagKey="isFilterOpen"
      title="Filter Projects"
    >
      <FilterContent view="map" />
    </SidebarDrawer>
  );
};
