"use client";

import { DataTable } from "@/components/data-table/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ApiResponse } from "@/types/api";
import { formatTime, getDayName } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Edit,
  Eye,
  Lock,
  MoreHorizontal,
  PlusCircle,
  Trash,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useDeleteScheduleMutation,
  useGetDoctorScheduleByIdQuery,
  useUpdateScheduleMutation,
} from "../schedule.api";
import { ISchedule } from "../schedule.interface";

export const ScheduleTable = () => {
  const { profile } = useAuth();
  const id = profile?.id as string;
  const { data } = useGetDoctorScheduleByIdQuery(id, {
    skip: !id,
  });

  const schedules = data?.data || [];

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<ISchedule | null>(
    null
  );

  const [updateScheduleFn, { isLoading: isUpdatingSchedule }] =
    useUpdateScheduleMutation();
  const [deleteScheduleFn, { isLoading: isDeletingSchedule }] =
    useDeleteScheduleMutation();

  const handleToggleActive = async (schedule: ISchedule) => {
    const newActiveStatus = !schedule.isActive;

    await handleMutationRequest(
      updateScheduleFn,
      {
        id: schedule.id,
        isActive: newActiveStatus,
      },
      {
        loadingMessage: newActiveStatus
          ? "Activating schedule..."
          : "Deactivating schedule...",
        successMessage: () =>
          newActiveStatus ? "Schedule activated!" : "Schedule deactivated!",
      }
    );
  };

  const openDeleteDialog = (schedule: ISchedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!scheduleToDelete?.id) return;

    await handleMutationRequest(deleteScheduleFn, scheduleToDelete.id, {
      loadingMessage: "Deleting Schedule",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  const columns: ColumnDef<ISchedule>[] = [
    {
      accessorKey: "dayOfWeek",
      header: "Day",
      cell: ({ row }) => (
        <span className="font-medium">
          {getDayName(row.original.dayOfWeek)}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      cell: ({ row }) => <span>{formatTime(row.original.startTime)}</span>,
      size: 120,
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      cell: ({ row }) => <span>{formatTime(row.original.endTime)}</span>,
      size: 120,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      size: 100,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {dayjs(row.original.createdAt).format("MMM DD, YYYY")}
        </span>
      ),
      size: 120,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/schedules/${row.original.id}`}>
                <Eye className="text-inherit" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/schedules/${row.original.id}/edit`}>
                <Edit className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingSchedule}
            >
              {row.original.isActive ? (
                <>
                  <Lock className="text-inherit" /> Deactivate
                </>
              ) : (
                <>
                  <Unlock className="text-inherit" /> Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openDeleteDialog(row.original)}>
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 20,
    },
  ];

  return (
    <>
      <DataTable
        data={schedules}
        columns={columns}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/schedules/create">
              <PlusCircle /> Add Schedule
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this schedule?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Once you delete this schedule, it cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <div>
                <span className="text-sm text-muted-foreground">Day:</span>{" "}
                <strong className="font-medium text-sm">
                  {getDayName(scheduleToDelete?.dayOfWeek || "")}
                </strong>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Time:</span>{" "}
                <strong className="font-medium text-sm">
                  {formatTime(scheduleToDelete?.startTime || "")} -{" "}
                  {formatTime(scheduleToDelete?.endTime || "")}
                </strong>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingSchedule}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingSchedule ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
