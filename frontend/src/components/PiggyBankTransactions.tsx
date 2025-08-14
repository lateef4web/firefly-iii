import React from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

export default function PiggyBankTransactions({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="text-left">Description</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td className="text-right">{t.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
