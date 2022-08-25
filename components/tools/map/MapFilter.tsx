import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const MapFilter = () => {
  return (
    <SidebarDrawer
      columnWidth={0.333}
      initiallyOpenOnLargerScreens={true}
      statusFlagKey="isFilterOpen"
      title="Filter Projects"
      addCounterPadding={true}
    >
      <FilterContent view="map" />
    </SidebarDrawer>
  );
};
