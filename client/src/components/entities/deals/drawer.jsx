import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import { toggleDealDrawer } from "@/features/deals/slice";
import ViewDealForm from "./form-edit";
import CreateDealForm from "./form-create";
export function DealDrawer() {
  const openDrawer = useSelector((state) => state.deals.drawer);
  const deal = useSelector((state) => state.deals.deal);
  const dispatch = useDispatch();

  const handleOpenChange = (isOpen) => {
    if (isOpen !== openDrawer) {
      dispatch(toggleDealDrawer());
    }
  };

  return (
    <Drawer direction="right" open={openDrawer} onOpenChange={handleOpenChange}>
      <DrawerContent className="w-[1050px] max-w-[95vw] h-full ml-auto right-0 left-auto top-0 bottom-0 mt-0 border-none overflow-y-auto overflow-x-hidden">
      {deal ? <ViewDealForm deal={deal} /> : <CreateDealForm />}
      </DrawerContent>
    </Drawer>
  );
} 