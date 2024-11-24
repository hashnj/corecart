import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { FilterComponent } from "./FilterComponent";
import { useRecoilState } from "recoil";
import { filterSidebar } from "@/store/visible";

export const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(filterSidebar);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <button className="flex items-center p-2">
            <Filter className="h-5 w-5" />
            <span className="ml-2">Filters</span>
          </button>
        </SheetTrigger>
        
        <SheetContent side="right" className="p-4 w-72">
          <FilterComponent />
        </SheetContent>
      </Sheet>
    </>
  );
};
