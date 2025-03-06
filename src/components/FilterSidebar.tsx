import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import { FilterComponent } from "./FilterComponent";
import { useRecoilState } from "recoil";
import { filterSidebar } from "@/store/visible";

export const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(filterSidebar);

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button className="p-3 bg-primary text-text rounded-md flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </DrawerTrigger>

        <DrawerContent className="w-80 fixed right-0 top-0 h-screen bg-background shadow-lg z-50 p-4">
          <div className="flex justify-between items-center pb-4 border-b border-text/20">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-text/60 hover:text-text/30"
            >
              ✕
            </button>
          </div>

          <FilterComponent />
        </DrawerContent>
      </Drawer>
    </>
  );
};
