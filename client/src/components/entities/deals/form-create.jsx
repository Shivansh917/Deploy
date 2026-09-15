import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateDealMutation } from "@/features/api/deals";
import dealSchema, { assignees, stages } from "@/data/deals";
import { DealPopovers, DealSelects } from "./form-select";
import { useDispatch } from "react-redux";
import { toggleDealDrawer } from "@/features/deals/slice";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
export default function CreateDealForm() {
  const dispatch = useDispatch();

  const [createDeal, { isLoading }] = useCreateDealMutation();

  const form = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "",
    stage:
  sessionStorage.getItem("dealCreateStage") ||
  stages?.[0]?.value ||
  stages?.[0] ||
  "",
     assignee: "",
      amount: "",
      closingDate: new Date(),
nextStep: "Contact client",
    notes: "New deal",
      attachments: [],
    },
    mode: "onSubmit",
  });
useEffect(() => {
  const savedStage = sessionStorage.getItem("dealCreateStage");

  if (savedStage) {
    form.setValue("stage", savedStage);
  }
}, [form]);
  async function onSubmit(data) {
    if (isLoading) return;

    try {
     console.log("DEAL DATA:", data);
await createDeal(data).unwrap();
      toast.success("Deal created successfully.");
      dispatch(toggleDealDrawer());
    } catch (err) {
      console.error(err);
      toast.error("Failed to create deal.");
    }
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-1">Create Deal</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Add a new deal to your sales pipeline.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Title</label>
                <FormControl>
                  <Input placeholder="Enter deal title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Stage</label>
                <FormControl>
                  <DealSelects
                    value={field.value}
                    onChange={field.onChange}
                    options={stages}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Amount</label>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter deal value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closingDate"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Closing Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? format(field.value, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextStep"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Next Step</label>
                <FormControl>
                  <Input
                    placeholder="Enter next step"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Assignee</label>
<DealPopovers
  setValue={form.setValue}
  options={assignees}
>
  <Button
    type="button"
    variant="outline"
    className="w-full justify-start"
  >
   {typeof field.value === "object"
  ? field.value?.name
  : field.value || "Select assignee"}
  </Button>
</DealPopovers>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Notes</label>
                <FormControl>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border bg-transparent px-3 py-2 text-sm"
                    placeholder="Add notes..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => dispatch(toggleDealDrawer())}
            >
              Cancel
            </Button>

            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Deal"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}