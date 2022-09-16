import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const DirectoryFilter = () => {
  return (
    <SidebarDrawer
      columnWidth={0.333}
      statusFlagKey="isFilterOpen"
      title="Project filter"
      initiallyOpenOnLargerScreens={true}
      hasTopOffset={false}
      addCounterPadding={false}
    >
      <FilterContent view="directory" />
    </SidebarDrawer>
  );
};
