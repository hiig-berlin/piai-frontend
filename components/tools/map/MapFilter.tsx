import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const MapFilter = () => {
  return (
    <SidebarDrawer statusFlagKey="isFilterOpen" title="Filter Projects">
      <FilterContent />
    </SidebarDrawer>
  );
};
