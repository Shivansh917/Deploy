// import { z } from "zod"

import {
  useGetDealsListQuery,
  useDeleteDealMutation,
} from "@/features/api/deals";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import LoadingSkeleton from "../skeleton";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  toggleDealDrawer,
  focusDealById,
} from "@/features/deals/slice";
export default function DealList() {
  const { data: deals, error, isLoading } = useGetDealsListQuery();
const dispatch = useDispatch();
const [deleteDeal] = useDeleteDealMutation();
const openCreateDeal = (stage) => {
  sessionStorage.setItem("dealCreateStage", stage);
  dispatch(focusDealById(null));
  dispatch(toggleDealDrawer());
}; 
  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    console.error(error);
    toast.error("Couldn't load deals 🤕")
  }
  return (
  <div className="h-full flex-1 flex-col space-y-8 p-6 pt-3 mx-auto md:flex">
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Sales Pipeline</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track your deals through every stage.
          </p>
        </div>

        <Button
          onClick={() => openCreateDeal("New Lead")}
          className="shrink-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Deal
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
  {[
    { value: "New Lead", label: "Lead" },
    { value: "Qualified Lead", label: "Contacted" },
    { value: "In Draft", label: "Proposal" },
    { value: "Proposal Sent", label: "Proposal Sent" },
    { value: "Negotiation", label: "Negotiation" },
  ].map((stage) => {
    const stageDeals =
      deals?.filter((deal) => deal.stage === stage.value) || [];

    return (
      <div
  key={stage.value}
  className="rounded-xl border bg-white p-4 shadow-sm"
>
  <div className="mb-4 flex items-center justify-between">
    <h3 className="font-semibold">{stage.label}</h3>

    <span className="rounded-full bg-white px-2 py-1 text-xs shadow-sm">
      {stageDeals.length}
    </span>
  </div>

  <div className="space-y-3">
    {stageDeals.map((deal) => (
      <div
        key={deal.id}
        className="rounded-lg border bg-white p-4 shadow-sm"
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium">{deal.title}</h4>

        <button
  type="button"
  onClick={() => {
   dispatch(focusDealById(deal));
    dispatch(toggleDealDrawer());
  }}
  className="text-xs text-blue-600 hover:text-blue-800"
>
  Edit
</button>
          <button
            type="button"
            onClick={async () => {
              try {
                const findMongoId = (value) => {
                  if (
                    typeof value === "string" &&
                    /^[a-f\d]{24}$/i.test(value)
                  ) {
                    return value;
                  }

                  if (value && typeof value === "object") {
                    for (const key of ["$oid", "_id", "id", "value"]) {
                      const found = findMongoId(value[key]);
                      if (found) return found;
                    }
                  }

                  return null;
                };

                const dealId =
                  findMongoId(deal._id) || findMongoId(deal.id);

                if (!dealId) {
                  throw new Error("Could not determine deal ID");
                }

                await deleteDeal(dealId).unwrap();

                toast.success("Deal deleted successfully.");
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete deal.");
              }
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>

        <p className="mt-2 text-lg font-semibold">
          ₹{Number(deal.amount || 0).toLocaleString("en-IN")}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {deal.company?.name || "No company"}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {deal.closingDate
            ? new Date(deal.closingDate).toLocaleDateString("en-IN")
            : "No closing date"}
        </p>

        {deal.assignee?.name && (
          <p className="mt-2 text-xs text-muted-foreground">
            {deal.assignee.name}
          </p>
        )}
      </div>
    ))}

    {stageDeals.length === 0 && (
      <div className="rounded-lg border border-dashed p-5 text-center text-xs text-muted-foreground">
        No deals
      </div>
    )}
  </div>

  <button
    type="button"
    onClick={() => openCreateDeal(stage.value)}
    className="mt-4 w-full text-sm font-medium text-primary"
  >
    + Add Deal
  </button>
</div>
  );
})}
</div>
</div>
</div>
);
}