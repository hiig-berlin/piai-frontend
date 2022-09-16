import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const MapFilter = () => {
  return (
    <SidebarDrawer
      columnWidth={0.333}
      initiallyOpenOnLargerScreens={true}
      statusFlagKey="isFilterOpen"
      title="Project filter"
      addCounterPadding={true}
    >
      <FilterContent view="map" />
    </SidebarDrawer>
  );
};
