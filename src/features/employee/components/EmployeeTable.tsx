"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
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
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "@/features/employee/employee.api";
import { IUser } from "@/features/user/user.interface";
import { useAppSelector } from "@/redux/hook";
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

export const EmployeeTable = () => {
  const branchId = useAppSelector(
    (state) => state?.auth?.user?.branchId
  ) as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateEmployeeFn, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();
  const { data } = useGetEmployeesQuery({ branchId, page, limit });
  const [deleteEmployeeFn, { isLoading: isDeletingEmployee }] =
    useDeleteEmployeeMutation();

  const employees = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<IUser | null>(null);

  const handleDeleteMany = (rows: IUser[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (employee: IUser) => {
    const newStatus = !employee.isActive;

    await handleMutationRequest(
      updateEmployeeFn,
      { id: employee.id!, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating employee..."
          : "Deactivating employee...",
        successMessage: () =>
          newStatus
            ? "Employee activated successfully!"
            : "Employee deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (employee: IUser) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete?.id) return;

    await handleMutationRequest(deleteEmployeeFn, employeeToDelete?.id, {
      loadingMessage: "Deleting Employee",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const columns: ColumnDef<IUser>[] = [
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
      header: "Name",
      size: 150,
      cell: ({ row }) => (
        <span className="text-sm">{row.original.name || "-"}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CopyableCell value={row.original.email}>
          <span className="text-sm">{row.original.email || "N/A"}</span>
        </CopyableCell>
      ),
      size: 180,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <CopyableCell value={row.original.phone || "-"}>
          {row.original.phone || "-"}
        </CopyableCell>
      ),
      size: 130,
    },
    {
      accessorKey: "employeeProfile.department",
      header: "Department",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.employeeProfile?.department || "-"}
        </Badge>
      ),
      size: 130,
    },
    {
      accessorKey: "employeeProfile.position",
      header: "Position",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.employeeProfile?.position || "-"}
        </Badge>
      ),
      size: 130,
    },
    {
      accessorKey: "employeeProfile.joinedAt",
      header: "Joined Date",
      cell: ({ row }) => {
        const joinedAt = row.original.employeeProfile?.joinedAt;
        return (
          <span>
            {joinedAt ? new Date(joinedAt).toLocaleDateString() : "-"}
          </span>
        );
      },
      size: 130,
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
      size: 90,
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
              <Link href={`employees/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`employees/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingEmployee}
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
        data={employees}
        columns={columns}
        total={total}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={setPage}
        onDeleteSelected={handleDeleteMany}
        onPageSizeChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/employees/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{employeeToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the employee, all the data associated with
              it will be deleted forever.
            </span>
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingEmployee}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingEmployee ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
