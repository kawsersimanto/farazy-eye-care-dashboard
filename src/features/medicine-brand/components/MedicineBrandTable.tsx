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
import { generateFilterOptions, multiSelectFilterFn } from "@/utils/table";
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
  useDeleteMedicineBrandMutation,
  useGetMedicineBrandsQuery,
  useUpdateMedicineBrandMutation,
} from "../medicine-brand.api";
import { IMedicineBrand } from "../medicine-brand.interface";

export const MedicineBrandTable = () => {
  const [updateMedicineBrandFn, { isLoading: isUpdatingMedicineBrand }] =
    useUpdateMedicineBrandMutation();
  const { data } = useGetMedicineBrandsQuery();
  const medicineBrands = data?.data || [];
  const [deleteMedicineBrandFn, { isLoading: isDeletingMedicineBrand }] =
    useDeleteMedicineBrandMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<IMedicineBrand | null>(
    null
  );

  const handleDeleteMany = (rows: IMedicineBrand[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (brand: IMedicineBrand) => {
    const newStatus = !brand.isActive;

    await handleMutationRequest(
      updateMedicineBrandFn,
      { id: brand.id, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating medicine brand..."
          : "Deactivating medicine brand...",
        successMessage: () =>
          newStatus
            ? "Medicine brand activated successfully!"
            : "Medicine brand deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (brand: IMedicineBrand) => {
    setBrandToDelete(brand);
    setDeleteDialogOpen(true);
  };

  const manufacturerFilterOptions = generateFilterOptions(
    medicineBrands,
    (medicineBrand) => medicineBrand.manufacturer,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const handleConfirmDelete = async () => {
    if (!brandToDelete) return;

    await handleMutationRequest(deleteMedicineBrandFn, brandToDelete?.id, {
      loadingMessage: "Deleting Medicine Brand",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setBrandToDelete(null);
  };

  const columns: ColumnDef<IMedicineBrand>[] = [
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
      size: 20,
    },
    {
      accessorKey: "name",
      header: "Brand Name",
      size: 180,
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-100">
          {row.original.manufacturer}
        </Badge>
      ),
      size: 180,
      meta: {
        filterLabel: "Manufacturer",
        filterOptions: manufacturerFilterOptions,
      },
      filterFn: multiSelectFilterFn,
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
              <Link href={`medicine-brand/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`medicine-brand/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingMedicineBrand}
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
        data={medicineBrands}
        columns={columns}
        paginationMode="client"
        onDeleteSelected={handleDeleteMany}
        renderActions={() => (
          <Button variant="outline" size="sm" asChild>
            <Link href="/medicine-brand/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{brandToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the medicine brand, all the data associated
              with the brand will be deleted forever.
            </span>
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingMedicineBrand}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingMedicineBrand ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
