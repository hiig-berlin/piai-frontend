import { SidebarDrawer } from "./ui/SidebarDrawer";
import { FilterContent } from "./FilterContent";

export const DirectoryFilter = () => {
  return (
    <SidebarDrawer
      columnWidth={0.333}
      statusFlagKey="isFilterOpen"
      title="Filter Projects"
      initiallyOpen={true}
      hasTopOffset={false}
    >
      <FilterContent view="directory" />
    </SidebarDrawer>
  );
};
