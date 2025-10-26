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
  useDeleteMedicineCategoryMutation,
  useGetMedicineCategoriesQuery,
  useUpdateMedicineCategoryMutation,
} from "../medicine-category.api";
import { IMedicineCategory } from "../medicine-category.interface";

export const MedicineCategoryTable = () => {
  const [updateMedicineCategoryFn, { isLoading: isUpdatingMedicineCategory }] =
    useUpdateMedicineCategoryMutation();
  const { data } = useGetMedicineCategoriesQuery();
  const medicineCategories = data?.data || [];
  const [deleteMedicineCategoryFn, { isLoading: isDeletingMedicineCategory }] =
    useDeleteMedicineCategoryMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<IMedicineCategory | null>(null);

  const handleDeleteMany = (rows: IMedicineCategory[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (category: IMedicineCategory) => {
    const newStatus = !category.isActive;

    await handleMutationRequest(
      updateMedicineCategoryFn,
      { id: category.id, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating medicine category..."
          : "Deactivating medicine category...",
        successMessage: () =>
          newStatus
            ? "Medicine category activated successfully!"
            : "Medicine category deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (category: IMedicineCategory) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    await handleMutationRequest(
      deleteMedicineCategoryFn,
      categoryToDelete?.id,
      {
        loadingMessage: "Deleting Medicine Category",
        successMessage: (res: ApiResponse<string>) => res?.message,
      }
    );

    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const columns: ColumnDef<IMedicineCategory>[] = [
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
      header: "Category Name",
      size: 200,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="line-clamp-1">{row.original.description}</div>
      ),
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
              <Link href={`/medicine/categories/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/medicine/categories/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingMedicineCategory}
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
        data={medicineCategories}
        columns={columns}
        paginationMode="client"
        onDeleteSelected={handleDeleteMany}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/medicine/categories/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{categoryToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the medicine category, all the data
              associated with the category will be deleted forever.
            </span>
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingMedicineCategory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingMedicineCategory ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
