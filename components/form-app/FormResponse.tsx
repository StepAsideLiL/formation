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
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
import { Checkbox } from "@/components/ui/checkbox";

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
    columnHelper.accessor("Select", {
      id: "select",
      header: () => <Checkbox className="hover:cursor-pointer" />,
      cell: () => {
        return <Checkbox className="hover:cursor-pointer" />;
      },
    }),
    ...fields.map((field) =>
      columnHelper.accessor(field, {
        id: field,
        header: () => <span className="font-black">{fieldLabels[field]}</span>,
        cell: (info) => {
          return data[info.row.index][field];
        },
      }),
    ),
    columnHelper.accessor("Action", {
      id: "action",
      header: () => null,
      cell: () => {
        return (
          <Button variant={"outline"} size={"icon"}>
            <Icons.DotMenuVertical />
          </Button>
        );
      },
    }),
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
                if (header.id === "action") {
                  return (
                    <TableHead key={header.id} className="w-10 border">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                }

                if (header.id === "select") {
                  return (
                    <TableHead key={header.id} className="w-8 border">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                }

                return (
                  <TableHead key={header.id} className="border">
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
                {row.getVisibleCells().map((cell) => {
                  console.log(cell.getContext());
                  if (cell.column.columnDef.id === "action") {
                    return (
                      <TableCell key={cell.id} className="border">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
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
