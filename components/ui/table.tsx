"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TableRowData = Record<string, unknown>;
type ColumnAlign = "left" | "center" | "right";
type PaginationItem = number | "ellipsis";

const alignStyles: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export type DataTableColumn<T extends TableRowData> = {
  id: string;
  header: ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T, rowIndex: number) => ReactNode;
  align?: ColumnAlign;
  headerClassName?: string;
  cellClassName?: string;
};

export type DataTablePagination = {
  pageSize?: number;
  initialPage?: number;
};

export type DataTableProps<T extends TableRowData> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey?: keyof T | ((row: T, rowIndex: number) => string);
  pagination?: DataTablePagination;
  emptyState?: ReactNode;
  className?: string;
  tableClassName?: string;
};

export function DataTable<T extends TableRowData>({
  columns,
  rows,
  rowKey,
  pagination,
  emptyState = "No records available.",
  className,
  tableClassName,
}: DataTableProps<T>) {
  const pageSize = pagination?.pageSize ?? 6;
  const [currentPage, setCurrentPage] = useState(pagination?.initialPage ?? 1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  useEffect(() => {
    setCurrentPage((page) => Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, currentPage, pageSize]);

  const pageItems = useMemo(() => getPaginationItems(currentPage, totalPages), [currentPage, totalPages]);

  const onPageChange = (nextPage: number) => {
    setCurrentPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className={cn("min-w-full border-separate border-spacing-0 text-sm", tableClassName)}>
          <thead>
            <tr className="bg-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    "border-b border-r border-slate-300 px-4 py-3 last:border-r-0",
                    alignStyles[column.align ?? "left"],
                    // "first:rounded-tl-lg last:rounded-tr-lg",
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
                  {emptyState}
                </td>
              </tr>
            ) : (
              pageRows.map((row, rowIndex) => (
                <tr
                  key={resolveRowKey(row, rowIndex, rowKey)}
                  className={cn(
                    "text-slate-700",
                    rowIndex % 2 === 0 ? "bg-slate-50" : "bg-slate-100/70",
                    "last:border-b-0"
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "border-b border-r border-slate-200 px-4 py-3 align-middle last:border-r-0",
                        alignStyles[column.align ?? "left"],
                        column.cellClassName
                      )}
                    >
                      {renderCell(row, rowIndex, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 px-4 py-4 text-sm text-slate-600">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "px-1 transition-colors",
              currentPage === 1 ? "cursor-not-allowed text-slate-400" : "hover:text-slate-900"
            )}
          >
            Prev
          </button>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-slate-500">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={cn(
                  "h-8 min-w-8 rounded-md border px-2 transition-colors",
                  item === currentPage
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
                )}
                aria-current={item === currentPage ? "page" : undefined}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "px-1 transition-colors",
              currentPage === totalPages
                ? "cursor-not-allowed text-slate-400"
                : "hover:text-slate-900"
            )}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

function renderCell<T extends TableRowData>(row: T, rowIndex: number, column: DataTableColumn<T>): ReactNode {
  if (column.cell) {
    return column.cell(row, rowIndex);
  }

  if (column.accessorKey) {
    return row[column.accessorKey] as ReactNode;
  }

  return null;
}

function resolveRowKey<T extends TableRowData>(
  row: T,
  rowIndex: number,
  rowKey?: keyof T | ((row: T, rowIndex: number) => string)
): string {
  if (typeof rowKey === "function") {
    return rowKey(row, rowIndex);
  }

  if (rowKey) {
    return String(row[rowKey]);
  }

  return String(rowIndex);
}

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

