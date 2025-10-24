"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header/DataTableColumnHeader";
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
import { IBranch } from "@/features/branch/branch.interface";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  EyeIcon,
  MoreHorizontal,
  PlusCircle,
  Trash,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useDeleteBranchMutation,
  useGetBranchesQuery,
  useUpdateBranchMutation,
} from "../branch.api";

export const BranchTable = () => {
  const [updateBranchFn, { isLoading: isUpdatingBranch }] =
    useUpdateBranchMutation();
  const { data } = useGetBranchesQuery();
  const branches = data?.data || [];
  const [deleteBranchFn, { isLoading: isDeletingBranch }] =
    useDeleteBranchMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<IBranch | null>(null);

  const handleDeleteMany = (rows: IBranch[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (branch: IBranch) => {
    const newStatus = !branch.isActive;

    await handleMutationRequest(
      updateBranchFn,
      { id: branch.id, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating branch..."
          : "Deactivating branch...",
        successMessage: () =>
          newStatus
            ? "Branch activated successfully!"
            : "Branch deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (branch: IBranch) => {
    setBranchToDelete(branch);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!branchToDelete) return;

    await handleMutationRequest(deleteBranchFn, branchToDelete?.id, {
      loadingMessage: "Deleting Branch",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setBranchToDelete(null);
  };

  const columns: ColumnDef<IBranch>[] = [
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Name" />
      ),
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-100">
          {row.original.code}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
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
              <Link href={`branches/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingBranch}
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
        data={branches}
        columns={columns}
        paginationMode="client"
        onDeleteSelected={handleDeleteMany}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/branches/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Branch</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the branch {branchToDelete?.name}?
            Note Once you delete the branch all the data associated with the
            branch will be deleted forever.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingBranch}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingBranch ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
