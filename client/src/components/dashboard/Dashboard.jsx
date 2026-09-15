import {
  Users,
  UserPlus,
  TrendingUp,
  ClipboardList,
  IndianRupee,
  Bell,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  BriefcaseBusiness,
} from "lucide-react";

import { useGetContactsListQuery } from "@/features/api/contacts";
import { useGetDealsListQuery } from "@/features/api/deals";
import { useGetTasksListQuery } from "@/features/api/tasks";

const stageMap = [
  {
    name: "Lead",
    stages: ["New Lead"],
  },
  {
    name: "Contacted",
    stages: ["Qualified Lead"],
  },
  {
    name: "Proposal",
    stages: ["In Draft"],
  },
  {
    name: "Proposal Sent",
    stages: ["Proposal Sent"],
  },
  {
    name: "Negotiation",
    stages: ["Negotiation"],
  },
  {
    name: "Won",
    stages: ["Deal Won"],
  },
];

export default function Dashboard() {
  const {
    data: contacts = [],
    isLoading: contactsLoading,
  } = useGetContactsListQuery();

  const {
    data: deals = [],
    isLoading: dealsLoading,
  } = useGetDealsListQuery();

  const {
    data: tasks = [],
    isLoading: tasksLoading,
  } = useGetTasksListQuery();

  const activeDeals = deals.filter(
    (deal) =>
      deal.stage !== "Deal Won" &&
      deal.stage !== "Deal Lost"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  const totalPipelineValue = deals.reduce(
    (total, deal) => total + Number(deal.amount || 0),
    0
  );

  const activeSalesValue = activeDeals.reduce(
    (total, deal) => total + Number(deal.amount || 0),
    0
  );

  const totalLeads = deals.filter(
    (deal) => deal.stage === "New Lead"
  ).length;

  const pipelineData = stageMap.map((stage) => {
    const stageDeals = deals.filter((deal) =>
      stage.stages.includes(deal.stage)
    );

    const value = stageDeals.reduce(
      (total, deal) => total + Number(deal.amount || 0),
      0
    );

    return {
      ...stage,
      deals: stageDeals.length,
      value,
    };
  });

  const maxPipelineValue = Math.max(
    ...pipelineData.map((stage) => stage.value),
    1
  );

  const recentDeals = [...deals]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.closingDate || 0) -
        new Date(a.createdAt || a.closingDate || 0)
    )
    .slice(0, 3);

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 2);

  const isLoading =
    contactsLoading || dealsLoading || tasksLoading;

  const summaryCards = [
    {
      title: "Total Customers",
      value: isLoading ? "..." : contacts.length,
      subtitle: "All customers",
      icon: Users,
    },
    {
      title: "Total Leads",
      value: isLoading ? "..." : totalLeads,
      subtitle: "New leads",
      icon: UserPlus,
    },
    {
      title: "Active Sales",
      value: isLoading
        ? "..."
        : `₹${activeSalesValue.toLocaleString("en-IN")}`,
      subtitle: `${activeDeals.length} active deals`,
      icon: TrendingUp,
    },
    {
      title: "Pending Tasks",
      value: isLoading ? "..." : pendingTasks.length,
      subtitle: "Tasks to complete",
      icon: ClipboardList,
    },
  ];

  const recentActivities = [
    ...recentDeals.map((deal) => ({
      title: deal.title || "Untitled Deal",
      description: `${deal.stage || "Deal"} · ₹${Number(
        deal.amount || 0
      ).toLocaleString("en-IN")}`,
      icon: BriefcaseBusiness,
      date: new Date(deal.createdAt || deal.closingDate || 0),
    })),

    ...recentTasks.map((task) => ({
      title: task.title || "Task",
      description: `Task · ${
        task.status || "Pending"
      }`,
      icon: CheckCircle2,
      date: new Date(task.createdAt || 0),
    })),
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);

  return (
    <div className="h-full flex-1 space-y-6 overflow-y-auto p-6 pt-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-muted-foreground">
            Home
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here is your CRM business overview.
          </p>
        </div>

        <div className="rounded-lg border bg-white px-4 py-2 text-sm shadow-sm">
          Business Overview
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
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
                    {card.value}
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

      {/* Revenue + Pipeline */}
      <div className="grid gap-4 xl:grid-cols-5">
        {/* Revenue Summary */}
        <div className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Revenue Summary
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Current deal value across the sales pipeline.
              </p>
            </div>

            <div className="rounded-xl bg-muted p-3">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-3xl font-semibold">
              ₹{totalPipelineValue.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Total pipeline value
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {pipelineData.map((stage) => {
              const percentage =
                (stage.value / maxPipelineValue) * 100;

              return (
                <div key={stage.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {stage.name}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      ₹{stage.value.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-foreground"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales Pipeline */}
        <div className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-2">
          <div>
            <h2 className="text-lg font-semibold">
              Sales Pipeline
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current deals by stage.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {pipelineData.map((stage) => (
              <div key={stage.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {stage.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ₹{stage.value.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    {stage.deals}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-foreground"
                    style={{
                      width: `${
                        stage.deals > 0
                          ? Math.max(
                              (stage.value / maxPipelineValue) * 100,
                              8
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities + Notifications */}
      <div className="grid gap-4 xl:grid-cols-5">
        {/* Recent Activities */}
        <div className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />

            <div>
              <h2 className="text-lg font-semibold">
                Recent Activities
              </h2>

              <p className="text-sm text-muted-foreground">
                Latest CRM activity.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={`${activity.title}-${index}`}
                    className="flex items-center gap-3 rounded-lg border p-4"
                  >
                    <div className="rounded-lg bg-muted p-2.5">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                );
              })
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm font-medium">
                  No recent activities
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  CRM activity will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />

            <div>
              <h2 className="text-lg font-semibold">
                Notifications
              </h2>

              <p className="text-sm text-muted-foreground">
                Important updates and alerts.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {totalLeads > 0 && (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">
                  {totalLeads} new lead
                  {totalLeads !== 1 ? "s" : ""}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Review and follow up with new leads.
                </p>
              </div>
            )}

            {pendingTasks.length > 0 && (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">
                  {pendingTasks.length} pending task
                  {pendingTasks.length !== 1 ? "s" : ""}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Check the Tasks module for pending work.
                </p>
              </div>
            )}

            {activeDeals.length > 0 && (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">
                  {activeDeals.length} active sale
                  {activeDeals.length !== 1 ? "s" : ""}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Active opportunities are moving through the
                  pipeline.
                </p>
              </div>
            )}

            {totalLeads === 0 &&
              pendingTasks.length === 0 &&
              activeDeals.length === 0 && (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <Bell className="mx-auto h-7 w-7 text-muted-foreground" />

                  <p className="mt-3 text-sm font-medium">
                    No new notifications
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Important CRM alerts will appear here.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
         <Activity className="h-5 w-5" />

          <div>
            <h2 className="text-lg font-semibold">
              Quick Overview
            </h2>

            <p className="text-sm text-muted-foreground">
              {deals.length} total deals,{" "}
              {contacts.length} customers and{" "}
              {tasks.length} tasks are currently available
              in the CRM.
            </p>
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs sm:flex">
            <CheckCircle2 className="h-4 w-4" />
            CRM Active
          </div>
        </div>
      </div>
    </div>
  );
}