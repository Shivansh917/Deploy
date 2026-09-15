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
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Customers",
    value: "78",
    subtitle: "All customers",
    icon: Users,
  },
  {
    title: "Total Leads",
    value: "3",
    subtitle: "New leads",
    icon: UserPlus,
  },
  {
    title: "Active Sales",
    value: "₹31,000",
    subtitle: "Active pipeline",
    icon: TrendingUp,
  },
  {
    title: "Pending Tasks",
    value: "64",
    subtitle: "Tasks in CRM",
    icon: ClipboardList,
  },
];

const pipelineStages = [
  {
    name: "Lead",
    deals: 3,
    value: "₹85,000",
    width: "w-full",
  },
  {
    name: "Contacted",
    deals: 1,
    value: "₹10,000",
    width: "w-2/5",
  },
  {
    name: "Proposal",
    deals: 1,
    value: "₹1,000",
    width: "w-1/5",
  },
  {
    name: "Proposal Sent",
    deals: 1,
    value: "₹20,000",
    width: "w-1/4",
  },
  {
    name: "Negotiation",
    deals: 0,
    value: "₹0",
    width: "w-0",
  },
];

const activities = [
  {
    title: "Website Development Deal",
    description: "Lead · ₹50,000",
    icon: BriefcaseBusiness,
  },
  {
    title: "Software Testing",
    description: "Lead · ₹25,000",
    icon: TrendingUp,
  },
  {
    title: "Contact",
    description: "Contacted · ₹10,000",
    icon: Users,
  },
  {
    title: "proposal sent",
    description: "Proposal Sent · ₹20,000",
    icon: ArrowUpRight,
  },
];

const revenueData = [
  { label: "Lead", amount: 85000 },
  { label: "Contacted", amount: 10000 },
  { label: "Proposal", amount: 1000 },
  { label: "Proposal Sent", amount: 20000 },
  { label: "Negotiation", amount: 0 },
];

export default function Dashboard() {
  const totalRevenue = revenueData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="h-full flex-1 space-y-6 overflow-y-auto p-6 pt-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Home</p>

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
              <h2 className="text-lg font-semibold">Revenue Summary</h2>

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
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Current pipeline value
            </p>
          </div>

          {/* Revenue Bars */}
          <div className="mt-8 space-y-5">
            {revenueData.map((item) => {
              const percentage =
                totalRevenue > 0
                  ? (item.amount / totalRevenue) * 100
                  : 0;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-foreground"
                      style={{ width: `${percentage}%` }}
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
            <h2 className="text-lg font-semibold">Sales Pipeline</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current deals by stage.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {pipelineStages.map((stage) => (
              <div key={stage.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{stage.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {stage.value}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    {stage.deals}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full bg-foreground ${stage.width}`}
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
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
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
            })}
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
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">
                3 active sales opportunities
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Deals are currently moving through the pipeline.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">
                3 new leads
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Review and follow up with your new leads.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">
                Task workload available
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Check the Tasks module for pending work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5" />

          <div>
            <h2 className="text-lg font-semibold">
              Quick Overview
            </h2>

            <p className="text-sm text-muted-foreground">
              {totalRevenue === 0
                ? "No sales data available."
                : `Your current pipeline contains ₹${totalRevenue.toLocaleString(
                    "en-IN"
                  )} in deal value.`}
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