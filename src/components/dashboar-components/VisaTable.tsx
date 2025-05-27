"use client";

import React from "react";
import { VisaApplication } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentButton from "../PaymentButton";
import DataTable from "../DataTable";

interface VisaTableProps {
  data: VisaApplication[];
  currentPage?: number;
  rowsPerPage?: number;

  token: string;
}

const VisaTable: React.FC<VisaTableProps> = ({
  data,
  token,
  currentPage,
  rowsPerPage,
  totalCount,
  onPageChange,
}) => {
  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "destinationCountry", label: "Destination" },
    {
      key: "travelDate",
      label: "Travel Date",
      render: (row: VisaApplication) =>
        new Date(row.travelDate).toLocaleDateString(),
    },
    {
      key: "travelDurationInDays",
      label: "Duration",
      render: (row: VisaApplication) => `${row.travelDurationInDays} days`,
    },
    {
      key: "applicationStatus",
      label: "Status",
      render: (row: VisaApplication) => (
        <span
          className={`capitalize font-medium ${
            row.applicationStatus.toLowerCase() === "pending"
              ? "text-yellow-600"
              : row.applicationStatus.toLowerCase() === "under review"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {row.applicationStatus}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row: VisaApplication) => (
        <span className="capitalize">{row.priority}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: VisaApplication) => (
        <div className="flex items-center space-x-2 justify-end">
          <PaymentButton
            token={token}
            currentUser={row._id}
            totalAmount={999}
            productId="product_123"
            selectedAddressId={{ id: "addr_789" }}
          />
          <Button variant="outline" size="sm" asChild>
            <Link href={`/pages/dashboard/client/visatrack?visa_id=${row._id}`}>
              View
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable<VisaApplication> columns={columns} data={data} />;
};

export default VisaTable;
