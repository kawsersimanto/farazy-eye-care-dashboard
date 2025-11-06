"use client";

import { DataTable } from "@/components/data-table/DataTable";
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
import { useGetBranchAdminsQuery } from "../branch-admin.api";

export const BranchAdminTable = () => {
  const branchId = useAppSelector(
    (state) => state?.auth?.user?.branchId
  ) as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [updateUserFn, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [deleteUserFn, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const { data, isLoading: isLoadingUsers } = useGetBranchAdminsQuery({
    branchId,
    page,
    limit,
  });

  const users = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleToggleActive = async (user: IUser) => {
    const newStatus = !user.isActive;

    await handleMutationRequest(
      updateUserFn,
      { id: user.id, isActive: newStatus },
      {
        loadingMessage: newStatus ? "Unblocking user..." : "Blocking user...",
        successMessage: () =>
          newStatus
            ? "User unblocked successfully!"
            : "User blocked successfully!",
      }
    );
  };

  const handleDelete = async (user: IUser) => {
    await handleMutationRequest(deleteUserFn, user?.id, {
      loadingMessage: "Deleting User...",
      successMessage: () => "User deleted successfully!",
    });
  };

  const handleDeleteMany = async (rows: IUser[], ids: string[]) => {
    console.log(rows, ids);
  };

  const columns: ColumnDef<IUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (value) {
              setSelectedIds(users.map((user) => user.id));
            } else {
              setSelectedIds([]);
            }
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
              setSelectedIds((prev) => [...prev, row.original.id]);
            } else {
              setSelectedIds((prev) =>
                prev.filter((id) => id !== row.original.id)
              );
            }
          }}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorFn: (row) => `${row.name}`,
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const imageUrl = row.original.profileImageUrl?.trim();
        const isValidUrl =
          imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/"));
        const src = isValidUrl ? imageUrl : "/placeholder.png";

        return (
          <div className="flex items-center gap-2">
            <Image
              src={src || "/placeholder.png"}
              alt={row.original.name || "User Image"}
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
      size: 100,
    },
    {
      id: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <Badge variant="outline" asChild>
          <Link href={`tel:${row.original.phone}`}>
            {row.original.phone || "-"}
          </Link>
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <Link href={`mailto:${row.original.email}`}>
          {row.original.email || "-"}
        </Link>
      ),
    },

    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-200">
          {row.original.role}
        </Badge>
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
              <Link href={`/branch-admin/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingUser || isDeletingUser}
            >
              {row.original.isActive ? (
                <>
                  <Ban className="text-inherit" /> Block
                </>
              ) : (
                <>
                  <Unlock className="text-inherit" /> Unblock
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              disabled={isDeletingUser}
            >
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      total={total}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={setPage}
      onPageSizeChange={(newLimit) => {
        setLimit(newLimit);
        setPage(1);
      }}
      onDeleteSelected={() => handleDeleteMany(users, selectedIds)}
      isLoading={isLoadingUsers}
      renderActions={() => (
        <Button variant="outline" size="sm" asChild>
          <Link href="/users/create">
            <PlusCircle /> Add New
          </Link>
        </Button>
      )}
    />
  );
};
