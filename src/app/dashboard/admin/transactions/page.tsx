
"use client";

import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  bookingId: string;
  transactionId: string;
  serviceTitle: string;
  category: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  amount: number;
  paymentStatus: string;
  paymentDate: string;
  createdAt: string;
}

interface TransactionResponse {
  success: boolean;
  totalTransactions: number;
  totalRevenue: number;
  transactions: Transaction[];
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/transactions`,
          {
            credentials: "include",
          }
        );

        const data: TransactionResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Failed to load transactions");
        }

        setTransactions(data.transactions);
        setTotalTransactions(data.totalTransactions);
        setTotalRevenue(data.totalRevenue);
      } catch (error) {
        console.error("Transactions fetch error:", error);
        setError("Could not load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Transactions
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Monitor all payment transactions and revenue.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Transactions
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {totalTransactions}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Revenue
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {formatAmount(totalRevenue)}
          </h2>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All Transactions
          </h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No transactions found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Transaction ID
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Service
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Customer
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Technician
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Amount
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Payment Date
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {transaction.transactionId}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {transaction.serviceTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.category}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {transaction.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.customerEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {transaction.technicianName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.technicianEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {formatAmount(transaction.amount)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(transaction.paymentDate)}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {transaction.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
