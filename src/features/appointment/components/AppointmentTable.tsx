"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { setSelectedPatient } from "@/features/prescription/store/prescription.slice";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch } from "@/redux/hook";
import { formatDate, getTodayDateOnly } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  Edit,
  EyeIcon,
  FilePlus,
  MoreHorizontal,
  Phone,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "../appointment.api";
import { IAppointment } from "../appointment.interface";

export const AppointmentTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useAuth();
  const branchId = profile?.branchId ? profile?.branchId : "";
  const doctorId = profile?.id ? profile?.id : "";
  const date = getTodayDateOnly();
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
    doctorId,
  });
  const [updateAppointmentFn, { isLoading: isUpdatingAppointment }] =
    useUpdateAppointmentMutation();

  const appointments = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  const handlePaymentStatusChange = async (
    appointment: IAppointment,
    newStatus: "PENDING" | "PAID" | "FAILED"
  ) => {
    await handleMutationRequest(
      updateAppointmentFn,
      { id: appointment?.id, paymentStatus: newStatus },
      {
        loadingMessage: "Updating Payment Status",
        successMessage: () => "Payment Status Updated Successfully!",
      }
    );
  };

  const handleDeleteMany = (rows: IAppointment[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const handleGenderChange = async (
    appointment: IAppointment,
    newGender: "MALE" | "FEMALE"
  ) => {
    await handleMutationRequest(
      updateAppointmentFn,
      { id: appointment?.id, gender: newGender },
      {
        loadingMessage: "Updating Gender",
        successMessage: () => "Gender Updated Successfully!",
      }
    );
  };

  const handlePrescribe = (appointment: IAppointment) => {
    dispatch(
      setSelectedPatient({
        id: appointment.id,
        name: appointment.name || "",
        phone: appointment.phone || "",
        age: appointment.age || 0,
        gender: appointment.gender || "MALE",
      })
    );
    router.push("/prescription/create");
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
        return <div className="text-sm">{row.original.appointmentNo}</div>;
      },
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Patient Name",
      cell: ({ row }) => {
        return <div className="text-sm">{row.original.name}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            <CopyableCell value={row.original.phone || "-"} className="text-sm">
              {row.original.phone || "-"}
            </CopyableCell>
          </div>
        );
      },
      size: 150,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {row.original.age ? row.original.age + " Years" : "-"}
            </span>
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
          <Select
            value={row.original.gender}
            onValueChange={(value) =>
              handleGenderChange(row.original, value as "MALE" | "FEMALE")
            }
            disabled={isUpdatingAppointment}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">
                <Badge variant="outline">Male</Badge>
              </SelectItem>
              <SelectItem value="FEMALE">
                <Badge variant="outline">Female</Badge>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        return (
          <Select
            value={row.original.paymentStatus}
            onValueChange={(value) =>
              handlePaymentStatusChange(
                row.original,
                value as "PENDING" | "PAID" | "FAILED"
              )
            }
            disabled={isUpdatingAppointment}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50">
                    PENDING
                  </Badge>
                </span>
              </SelectItem>
              <SelectItem value="PAID">
                <span className="flex items-center gap-2">
                  <Badge variant="secondary" className="border border-border">
                    PAID
                  </Badge>
                </span>
              </SelectItem>
              <SelectItem value="FAILED">
                <span className="flex items-center gap-2">
                  <Badge
                    variant="destructive"
                    className="bg-red-100 border border-border text-foreground"
                  >
                    FAILED
                  </Badge>
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "scheduledAt",
      header: "Scheduled At",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-sm capitalize">
              {formatDate(row.original.scheduledAt)}
            </span>
          </div>
        );
      },
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
            <DropdownMenuItem onClick={() => handlePrescribe(row.original)}>
              <FilePlus className="text-inherit" />
              Prescribe
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/appointments/${row.original.id}/edit`}>
                <Edit className="text-inherit" />
                Edit
              </Link>
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
