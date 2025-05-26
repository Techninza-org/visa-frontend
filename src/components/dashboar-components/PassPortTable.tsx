"use client";

import React from "react";

import { VisaApplication } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Table from "../ui/Table";
import PaymentButton from "../PaymentButton";

interface PassportProps {
  data: VisaApplication[];
  token: string;
}

const PassportTable: React.FC<PassportProps> = ({ data, token }) => {
  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "gender", label: "Gender"  },
    { key: "maritalStatus", label: "Marital Status"  },
    { key: "phone", label: "Mobile"  },
    { key: "email", label: "Email"  },
 
  
    {
      key: "applicationStatus",
      label: "Status",
      render: (row: VisaApplication) => (
        <span
          className={`capitalize font-medium ${
            row.status.toLowerCase() === "pending"
              ? "text-yellow-600"
              : row.status.toLowerCase() === "under review"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {row.status}
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
          {/* <PaymentButton
          token={token}
          currentUser={row._id}
          totalAmount={999}
          productId="product_123"
          selectedAddressId={{ id: "addr_789" }}
        /> */}
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/pages/dashboard/client/passporttrack?pass_id=${row._id}`}
            >
              View
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return <Table<VisaApplication> columns={columns} data={data} />;
};

export default PassportTable;
