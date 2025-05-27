"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/button";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}


const DataTable = <T extends object>({
  columns,
  data,
  currentPage,
  rowsPerPage,
  totalCount,
  onPageChange,
}: DataTableProps<T>) => {


  console.log("DataTable Props:", {
    columns,
    data,
    currentPage,
    rowsPerPage,
    totalCount,
  });
  



  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div>
      <Table className="border border-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200">
            {columns.map((col) => (
              <TableHead key={col.key} className="border-r border-gray-200 last:border-r-0">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-gray-200">
              {columns.map((col) => (
                <TableCell key={col.key} className="border-r border-gray-200 last:border-r-0">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};


export default DataTable;
