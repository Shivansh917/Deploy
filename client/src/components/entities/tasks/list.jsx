import { useGetTasksListQuery } from "@/features/api/tasks";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import LoadingSkeleton from "./../skeleton";

export default function TaskList() {
  const { data: tasks, error, isLoading } = useGetTasksListQuery();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    console.error(error);
    toast.error("Couldn't load tasks 😟");
  }

  const totalTasks = tasks?.length || 0;

  const completedTasks =
    tasks?.filter((task) => task.status === "done").length || 0;

  const inProgressTasks =
    tasks?.filter((task) => task.status === "in progress").length || 0;

  const pendingTasks = totalTasks - completedTasks - inProgressTasks;

  const completedPercentage =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

  const inProgressPercentage =
    totalTasks > 0 ? ((inProgressTasks / totalTasks) * 100).toFixed(2) : 0;

  const pendingPercentage =
    totalTasks > 0 ? ((pendingTasks / totalTasks) * 100).toFixed(2) : 0;

  return (
    <div className="h-full w-full flex-1 flex-col space-y-6 p-6 md:flex">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Task Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Organize, assign and track tasks efficiently
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border bg-blue-50 p-6">
          <p className="text-sm font-semibold text-gray-700">Total Tasks</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {totalTasks}
          </p>
          <p className="mt-1 text-sm text-gray-500">All Tasks</p>
        </div>

        {/* Completed */}
        <div className="rounded-xl border bg-green-50 p-6">
          <p className="text-sm font-semibold text-gray-700">Completed</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {completedTasks}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {completedPercentage}%
          </p>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border bg-orange-50 p-6">
          <p className="text-sm font-semibold text-gray-700">In Progress</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {inProgressTasks}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {inProgressPercentage}%
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-red-50 p-6">
          <p className="text-sm font-semibold text-gray-700">Pending</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {pendingTasks}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {pendingPercentage}%
          </p>
        </div>
      </div>

      {/* Existing working table */}
      <div className="flex-1 rounded-xl border bg-white">
        <DataTable data={tasks || []} columns={columns} />
      </div>
    </div>
  );
}