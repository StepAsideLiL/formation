"use client";

import { TGetVariantForResponseData } from "@/lib/fetcher/getVariantForResponse";
import { TFormSchema } from "@/lib/store";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function FormResponse({
  form,
}: {
  form: TGetVariantForResponseData;
}) {
  const formSchema = JSON.parse(form.formSchema) as TFormSchema[];
  const fields = formSchema.map((s) => s.id);
  const fieldLabels = formSchema.reduce(
    (acc, curr) => {
      acc[curr.id] = curr.label;
      return acc;
    },
    {} as Record<string, string>,
  );

  const data = form.formData.map(
    (data) => JSON.parse(data) as Record<string, string>,
  );

  const columnHelper = createColumnHelper<Record<string, string>>();

  const columns = [
    ...fields.map((field) =>
      columnHelper.accessor(field, {
        id: field,
        header: fieldLabels[field],
        cell: (info) => data[info.row.index][field],
      }),
    ),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
