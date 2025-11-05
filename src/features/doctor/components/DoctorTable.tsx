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
  PlusCircle,
  Trash,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetDoctorsQuery } from "../doctor.api";

export const DoctorTable = () => {
  const branchId = useAppSelector(
    (state) => state?.auth?.user?.branchId
  ) as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateUserFn, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const { data } = useGetDoctorsQuery({ branchId, limit, page });
  const [deleteUserFn, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const doctors = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<IUser | null>(null);

  const handleDeleteMany = (rows: IUser[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleToggleAvailable = async (doctor: IUser) => {
    const newAvailability = !doctor.doctorProfile?.isAvailable;

    await handleMutationRequest(
      updateUserFn,
      {
        id: doctor.id!,
        doctorProfile: { isAvailable: newAvailability },
      },
      {
        loadingMessage: newAvailability
          ? "Marking doctor as available..."
          : "Marking doctor as unavailable...",
        successMessage: () =>
          newAvailability
            ? "Doctor marked as available!"
            : "Doctor marked as unavailable!",
      }
    );
  };

  const openDeleteDialog = (doctor: IUser) => {
    setDoctorToDelete(doctor);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete?.id) return;

    await handleMutationRequest(deleteUserFn, doctorToDelete?.id, {
      loadingMessage: "Deleting Doctor",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });

    setDeleteDialogOpen(false);
    setDoctorToDelete(null);
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

        const degrees = row.original.doctorProfile?.degrees?.length
          ? row.original.doctorProfile.degrees.join(", ")
          : null;

        return (
          <div className="flex items-center gap-2">
            <Image
              src={src}
              alt={row.original.name || "Doctor Photo"}
              height={80}
              width={80}
              className="h-[50px] w-[50px] object-contain rounded-lg border border-border"
              unoptimized
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
            <div className="flex flex-col">
              <span className="font-medium">
                {row.original.name || "Not Set"}
              </span>
              {degrees && (
                <span className="text-sm text-muted-foreground">{degrees}</span>
              )}
            </div>
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CopyableCell value={row.original.email}>
          <span className="text-sm">{row.original.email || "-"}</span>
        </CopyableCell>
      ),
      size: 120,
    },
    {
      accessorKey: "doctorProfile.registrationNo",
      header: "Registration No.",
      cell: ({ row }) => (
        <CopyableCell value={row.original.doctorProfile?.registrationNo || "-"}>
          <span className="text-sm">
            {row.original.doctorProfile?.registrationNo || "-"}
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <CopyableCell value={row.original.phone}>
          {row.original.phone || "-"}
        </CopyableCell>
      ),
    },
    {
      accessorKey: "doctorProfile.title",
      header: "Title",
      cell: ({ row }) => (
        <span>{row.original.doctorProfile?.title || "-"}</span>
      ),
      size: 120,
    },
    {
      accessorKey: "doctorProfile.yearsExperience",
      header: "Years Experience",
      cell: ({ row }) => (
        <span>{row.original.doctorProfile?.yearsExperience ?? "-"}</span>
      ),
      size: 140,
    },
    {
      accessorKey: "doctorProfile.consultationFee",
      header: "Consultation Fee",
      cell: ({ row }) => (
        <span>
          {row.original.doctorProfile?.consultationFee
            ? `৳ ${row.original.doctorProfile.consultationFee}`
            : "N/A"}
        </span>
      ),
      size: 140,
    },
    {
      accessorKey: "doctorProfile.isAvailable",
      header: "Availability",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.doctorProfile?.isAvailable ? "default" : "secondary"
          }
        >
          {row.original.doctorProfile?.isAvailable
            ? "Available"
            : "Unavailable"}
        </Badge>
      ),
      meta: {
        filterLabel: "Availability",
        filterOptions: [
          { label: "Available", value: true },
          { label: "Unavailable", value: false },
        ],
      },
      filterFn: multiSelectFilterFn,
      size: 110,
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
              <Link href={`doctors/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleAvailable(row.original)}
              disabled={isUpdatingUser}
            >
              {row.original.doctorProfile?.isAvailable ? (
                <>
                  <Ban className="text-inherit" /> Mark Unavailable
                </>
              ) : (
                <>
                  <Unlock className="text-inherit" /> Mark Available
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
        data={doctors}
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
            <Link href="/doctors/create">
              <PlusCircle /> Add New
            </Link>
          </Button>
        )}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-bold">{doctorToDelete?.name}?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="">
              Note: Once you delete the doctor, all the data associated with it
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
