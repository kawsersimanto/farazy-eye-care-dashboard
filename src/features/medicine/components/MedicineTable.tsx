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
  useDeleteMedicineMutation,
  useGetMedicinesQuery,
  useUpdateMedicineMutation,
} from "../medicine.api";
import { IMedicine } from "../medicine.interface";

export const MedicineTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateMedicineFn, { isLoading: isUpdatingMedicine }] =
    useUpdateMedicineMutation();
  const { data } = useGetMedicinesQuery();
  const [deleteMedicineFn, { isLoading: isDeletingMedicine }] =
    useDeleteMedicineMutation();

  const medicines = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<IMedicine | null>(
    null
  );

  const handleDeleteMany = (rows: IMedicine[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (medicine: IMedicine) => {
    const newStatus = !medicine.isActive;

    await handleMutationRequest(
      updateMedicineFn,
      { id: medicine.id!, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating medicine..."
          : "Deactivating medicine...",
        successMessage: () =>
          newStatus
            ? "Medicine activated successfully!"
            : "Medicine deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (medicine: IMedicine) => {
    setMedicineToDelete(medicine);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!medicineToDelete?.id) return;

    await handleMutationRequest(deleteMedicineFn, medicineToDelete?.id, {
      loadingMessage: "Deleting Medicine",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setMedicineToDelete(null);
  };

  const columns: ColumnDef<IMedicine>[] = [
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
      header: "Medicine Name",
      size: 150,
    },
    {
      accessorKey: "genericName",
      header: "Generic Name",
      size: 150,
    },
    {
      accessorKey: "strength",
      header: "Strength",
      cell: ({ row }) => <span>{row.original.strength || "N/A"}</span>,
      size: 100,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => <span>{row.original.unit || "N/A"}</span>,
      size: 100,
    },
    {
      accessorKey: "brand.name",
      header: "Brand",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-100">
          {row.original.brand?.name || "N/A"}
        </Badge>
      ),
      size: 120,
    },
    {
      accessorKey: "category.name",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50">
          {row.original.category?.name || "N/A"}
        </Badge>
      ),
      size: 120,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span>{row.original.type || "N/A"}</span>,
      size: 100,
    },
    {
      accessorKey: "mrp",
      header: "MRP",
      cell: ({ row }) => (
        <span className="font-semibold">
          &#2547;
          {row.original.mrp?.toFixed(2) || "N/A"}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: "isPrescriptionOnly",
      header: "Prescription Required",
      cell: ({ row }) => (
        <Badge
          variant={row.original.isPrescriptionOnly ? "default" : "secondary"}
        >
          {row.original.isPrescriptionOnly ? "Yes" : "No"}
        </Badge>
      ),
      size: 140,
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
              <Link href={`medicine/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`medicine/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingMedicine}
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
        data={medicines}
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
            <Link href="/medicine/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{medicineToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the medicine, all the data associated with
              it will be deleted forever.
            </span>
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingMedicine}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingMedicine ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
