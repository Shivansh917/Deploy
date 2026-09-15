import {
  Users,
  BriefcaseBusiness,
  TrendingUp,
  ClipboardList,
  IndianRupee,
  CheckCircle2,
  Clock3,
  CircleDot,
  Activity,
} from "lucide-react";

import { useGetContactsListQuery } from "@/features/api/contacts";
import { useGetDealsListQuery } from "@/features/api/deals";
import { useGetTasksListQuery } from "@/features/api/tasks";

export default function Stats() {
  const { data: contacts = [], isLoading: contactsLoading } =
    useGetContactsListQuery();

  const { data: deals = [], isLoading: dealsLoading } =
    useGetDealsListQuery();

  const { data: tasks = [], isLoading: tasksLoading } =
    useGetTasksListQuery();

  const activeDeals = deals.filter(
    (deal) =>
      deal.stage !== "Deal Won" &&
      deal.stage !== "Deal Lost"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const pendingTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      task.status !== "In Progress"
  );

  const totalPipelineValue = deals.reduce(
    (total, deal) => total + Number(deal.amount || 0),
    0
  );

  const activePipelineValue = activeDeals.reduce(
    (total, deal) => total + Number(deal.amount || 0),
    0
  );

  const stageData = [
    {
      name: "Lead",
      count: deals.filter((deal) => deal.stage === "New Lead").length,
      value: deals
        .filter((deal) => deal.stage === "New Lead")
        .reduce(
          (total, deal) => total + Number(deal.amount || 0),
          0
        ),
    },
    {
      name: "Contacted",
      count: deals.filter(
        (deal) => deal.stage === "Qualified Lead"
      ).length,
      value: deals
        .filter((deal) => deal.stage === "Qualified Lead")
        .reduce(
          (total, deal) => total + Number(deal.amount || 0),
          0
        ),
    },
    {
      name: "Proposal",
      count: deals.filter(
        (deal) => deal.stage === "In Draft"
      ).length,
      value: deals
        .filter((deal) => deal.stage === "In Draft")
        .reduce(
          (total, deal) => total + Number(deal.amount || 0),
          0
        ),
    },
    {
      name: "Proposal Sent",
      count: deals.filter(
        (deal) => deal.stage === "Proposal Sent"
      ).length,
      value: deals
        .filter(
          (deal) => deal.stage === "Proposal Sent"
        )
        .reduce(
          (total, deal) => total + Number(deal.amount || 0),
          0
        ),
    },
    {
      name: "Negotiation",
      count: deals.filter(
        (deal) => deal.stage === "Negotiation"
      ).length,
      value: deals
        .filter(
          (deal) => deal.stage === "Negotiation"
        )
        .reduce(
          (total, deal) => total + Number(deal.amount || 0),
          0
        ),
    },
  ];

  const maxStageValue = Math.max(
    ...stageData.map((stage) => stage.value),
    1
  );

  const statsCards = [
    {
      title: "Total Customers",
      value: contacts.length,
      subtitle: "Customers in CRM",
      icon: Users,
    },
    {
      title: "Total Deals",
      value: deals.length,
      subtitle: "All sales deals",
      icon: BriefcaseBusiness,
    },
    {
      title: "Active Deals",
      value: activeDeals.length,
      subtitle: "Open opportunities",
      icon: TrendingUp,
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      subtitle: "All CRM tasks",
      icon: ClipboardList,
    },
  ];

  const isLoading =
    contactsLoading ||
    dealsLoading ||
    tasksLoading;

  return (
    <div className="h-full flex-1 space-y-6 overflow-y-auto p-6 pt-5">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">
          Analytics
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Statistics
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your CRM performance and business activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>

                  <p className="mt-3 text-3xl font-semibold">
                    {isLoading ? "..." : card.value}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-3">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-muted p-3">
              <IndianRupee className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Pipeline Value
              </p>

              <p className="mt-1 text-2xl font-semibold">
                ₹
                {isLoading
                  ? "..."
                  : totalPipelineValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-muted p-3">
              <TrendingUp className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Pipeline Value
              </p>

              <p className="mt-1 text-2xl font-semibold">
                ₹
                {isLoading
                  ? "..."
                  : activePipelineValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Performance + Task Performance */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Deal Performance */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">
              Deal Performance
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Distribution of deals across pipeline stages.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {stageData.map((stage) => (
              <div key={stage.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {stage.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ₹
                      {stage.value.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    {stage.count}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-foreground"
                    style={{
                      width: `${Math.max(
                        (stage.value / maxStageValue) * 100,
                        stage.count > 0 ? 8 : 0
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Performance */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">
              Task Performance
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current task distribution by status.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" />

                <div>
                  <p className="text-sm font-medium">
                    Completed
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Finished tasks
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-muted px-3 py-1 text-sm">
                {isLoading ? "..." : completedTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5" />

                <div>
                  <p className="text-sm font-medium">
                    In Progress
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Currently being worked on
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-muted px-3 py-1 text-sm">
                {isLoading ? "..." : inProgressTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <CircleDot className="h-5 w-5" />

                <div>
                  <p className="text-sm font-medium">
                    Pending
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Waiting to be completed
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-muted px-3 py-1 text-sm">
                {isLoading ? "..." : pendingTasks.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <ActivityIcon />

          <div>
            <h2 className="text-lg font-semibold">
              Business Summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isLoading
                ? "Loading CRM statistics..."
                : `${contacts.length} customers, ${deals.length} deals and ${tasks.length} tasks are currently recorded in the CRM.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon() {
  return <Activity className="h-5 w-5" />;
}