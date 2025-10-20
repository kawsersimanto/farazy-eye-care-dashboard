"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header/DataTableColumnHeader";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IArticleCategory } from "@/features/article/article.interface";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/features/article/articleCategory.api";
import { ApiResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { generateFilterOptions, multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const CategoryTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];
  const [deleteCategoryFn, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const total = 0;
  const totalPages = 0;

  const categoryOptions = generateFilterOptions(
    categories,
    (category) => category.name,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const handleDelete = async (category: IArticleCategory) => {
    await handleMutationRequest(deleteCategoryFn, category?.id, {
      loadingMessage: "Deleting category",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });
  };

  const handleDeleteMany = (rows: IArticleCategory[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const columns: ColumnDef<IArticleCategory>[] = [
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),

      meta: {
        filterOptions: categoryOptions,
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => formatDate(row.original.updatedAt),
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
              <Link href={`/articles/categories/${row.original?.id}`}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isDeleting}
              onClick={() => handleDelete(row.original)}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={categories}
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
          <Link href="/articles/categories/create">
            <PlusCircle /> Add New
          </Link>
        </Button>
      )}
    />
  );
};
