import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const DirectoryFilter = () => {
  return (
    <SidebarDrawer columnWidth={0.33} statusFlagKey="isFilterOpen" title="Filter Projects" alwaysOpenOnTabletLandscape>
      <FilterContent />
    </SidebarDrawer>
  );
};
