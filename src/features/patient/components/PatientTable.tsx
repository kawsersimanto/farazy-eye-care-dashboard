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
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/features/user/user.api";
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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetPatientsQuery } from "../patient.api";

export const PatientTable = () => {
  const branchId = useAppSelector(
    (state) => state?.auth?.user?.branchId
  ) as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateUserFn, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const { data } = useGetPatientsQuery({ branchId, page, limit });
  const [deleteUserFn, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const patients = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<IUser | null>(null);

  const handleDeleteMany = (rows: IUser[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleActive = async (patient: IUser) => {
    const newStatus = !patient.isActive;

    await handleMutationRequest(
      updateUserFn,
      { id: patient.id!, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating patient..."
          : "Deactivating patient...",
        successMessage: () =>
          newStatus
            ? "Patient activated successfully!"
            : "Patient deactivated successfully!",
      }
    );
  };

  const openDeleteDialog = (patient: IUser) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!patientToDelete?.id) return;

    await handleMutationRequest(deleteUserFn, patientToDelete?.id, {
      loadingMessage: "Deleting Patient",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setPatientToDelete(null);
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
      cell: ({ row }) => {
        const imageUrl = row.original.profileImageUrl?.trim();
        const isValidUrl =
          imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/"));
        const src = isValidUrl ? imageUrl : "/placeholder.png";

        return (
          <div className="flex items-center gap-2">
            <Image
              src={src}
              alt={row.original.name || "Branch Logo"}
              height={80}
              width={80}
              className="h-[50px] w-[50px] object-contain rounded-lg border-border border"
              unoptimized
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
            {row.original.name}
          </div>
        );
      },
      size: 150,
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
        <CopyableCell value={row.original.phone}>
          {row.original.phone || "N/A"}
        </CopyableCell>
      ),
      size: 130,
    },
    {
      accessorKey: "patientProfile.gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.patientProfile?.gender || "N/A"}
        </Badge>
      ),
      size: 100,
    },
    {
      accessorKey: "patientProfile.bloodGroup",
      header: "Blood Group",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-red-50">
          {row.original.patientProfile?.bloodGroup || "N/A"}
        </Badge>
      ),
      size: 120,
    },
    {
      accessorKey: "patientProfile.dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const dob = row.original.patientProfile?.dateOfBirth;
        return <span>{dob ? new Date(dob).toLocaleDateString() : "N/A"}</span>;
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
              <Link href={`patients/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`patients/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingUser}
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
        data={patients}
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
            <Link href="/patients/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{patientToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the patient, all the data associated with it
              will be deleted forever.
            </span>
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeletingUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingUser ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
