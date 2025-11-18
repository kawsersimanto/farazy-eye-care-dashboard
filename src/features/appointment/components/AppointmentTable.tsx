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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { ApiResponse } from "@/types/api";
import { formatDate, getTodayISO } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { dateRangeFilterFn } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  Edit,
  EyeIcon,
  MoreHorizontal,
  Phone,
  PlusCircle,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../appointment.api";
import { IAppointment } from "../appointment.interface";

export const AppointmentTable = () => {
  const { profile } = useAuth();
  const branchId = profile?.branchId ? profile?.branchId : "";
  const date = getTodayISO();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data } = useGetAppointmentsQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
    branchId,
    date,
  });
  const [deleteAppointmentFn, { isLoading: isDeletingAppointment }] =
    useDeleteAppointmentMutation();

  const appointments = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  const handleDelete = async (appointment: IAppointment) => {
    console.log("delete appointment:", appointment.id);
    await handleMutationRequest(deleteAppointmentFn, appointment?.id, {
      loadingMessage: "Deleting Appointment",
      successMessage: (res: ApiResponse<{ success: boolean; id: string }>) =>
        res?.message,
    });
  };

  const handleDeleteMany = (rows: IAppointment[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const getGenderLabel = (gender: string) => {
    const genderMap: Record<string, string> = {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
    };
    return genderMap[gender] || gender;
  };

  const getPaymentStatusVariant = (
    status: "PENDING" | "PAID" | "FAILED"
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "PAID":
        return "default";
      case "PENDING":
        return "secondary";
      case "FAILED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const columns: ColumnDef<IAppointment>[] = [
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
      accessorKey: "appointmentNo",
      header: "Appointment #",
      cell: ({ row }) => {
        return (
          <div className="font-medium text-sm">
            {row.original.appointmentNo}
          </div>
        );
      },
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Patient Name",
      cell: ({ row }) => {
        return <div className="text-sm font-medium">{row.original.name}</div>;
      },
      size: 200,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            <span className="text-sm">{row.original.phone}</span>
          </div>
        );
      },
      size: 150,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        return (
          <Badge variant="outline">{getGenderLabel(row.original.gender)}</Badge>
        );
      },
    },
    {
      accessorKey: "scheduledAt",
      header: "Scheduled Date",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-sm">
              {formatDate(row.original.scheduledAt)}
            </span>
          </div>
        );
      },
      meta: {
        filterLabel: "Scheduled Date",
        filterType: "dateRange",
      },
      filterFn: dateRangeFilterFn,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        return (
          <Badge variant={getPaymentStatusVariant(row.original.paymentStatus)}>
            {row.original.paymentStatus}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.createdAt),
      meta: {
        filterLabel: "Created Date",
        filterType: "dateRange",
      },
      filterFn: dateRangeFilterFn,
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
              <Link href={`/appointments/${row.original.id}`}>
                <EyeIcon className="text-inherit" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/appointments/${row.original.id}/edit`}>
                <Edit className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              disabled={isDeletingAppointment}
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
      data={appointments}
      columns={columns}
      total={total}
      page={page}
      limit={limit}
      searchMode="server"
      onSearch={handleSearch}
      searchQuery={searchInput}
      totalPages={totalPages}
      onPageChange={setPage}
      onDeleteSelected={handleDeleteMany}
      onPageSizeChange={(newLimit) => {
        setLimit(newLimit);
        setPage(1);
      }}
      renderActions={() => (
        <Button variant="outline" size="sm" asChild>
          <Link href="/appointments/create">
            <PlusCircle /> Add New
          </Link>
        </Button>
      )}
    />
  );
};
