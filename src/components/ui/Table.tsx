// components/shared/Table.tsx
import React from "react";

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const Table = <T extends { _id?: string | number }>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white sticky top-0 z-10 shadow-sm">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider select-none"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-400 italic"
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item._id ?? idx}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-gray-700"
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
