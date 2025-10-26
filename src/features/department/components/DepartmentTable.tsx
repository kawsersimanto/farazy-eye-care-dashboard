"use client";

import { DataTable } from "@/components/data-table/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDepartment } from "@/features/department/department.interface";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  EyeIcon,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "../department.api";

export const DepartmentTable = () => {
  const [updateDepartmentFn, { isLoading: isUpdatingDepartment }] =
    useUpdateDepartmentMutation();
  const { data } = useGetDepartmentsQuery();
  const departments = data?.data || [];
  const [deleteDepartmentFn, { isLoading: isDeletingDepartment }] =
    useDeleteDepartmentMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] =
    useState<IDepartment | null>(null);

  const handleDeleteMany = (rows: IDepartment[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (department: IDepartment) => {
    const newStatus = !department.isActive;

    await handleMutationRequest(
      updateDepartmentFn,
      { id: department.id, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating department..."
          : "Deactivating department...",
        successMessage: () =>
          newStatus
            ? "Department activated successfully!"
            : "Department deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (department: IDepartment) => {
    setDepartmentToDelete(department);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!departmentToDelete) return;

    await handleMutationRequest(deleteDepartmentFn, departmentToDelete?.id, {
      loadingMessage: "Deleting Department",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setDepartmentToDelete(null);
  };

  const columns: ColumnDef<IDepartment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorKey: "name",
      header: "Department Name",
      size: 200,
    },
    {
      accessorKey: "alias",
      header: "Alias",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-100">
          {row.original.alias}
        </Badge>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 250,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "destructive"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      meta: {
        filterLabel: "Status",
        filterOptions: [
          { label: "Active", value: true },
          { label: "Inactive", value: false },
        ],
      },
      filterFn: multiSelectFilterFn,
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
              <Link href={`department/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`department/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingDepartment}
            >
              {row.original.isActive ? (
                <>
                  <Ban className="text-inherit" /> Deactivate
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
        data={departments}
        columns={columns}
        paginationMode="client"
        onDeleteSelected={handleDeleteMany}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/departments/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Department</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the department{" "}
            {departmentToDelete?.name}? Note: Once you delete the department,
            all the data associated with the department will be deleted forever.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingDepartment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingDepartment ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
