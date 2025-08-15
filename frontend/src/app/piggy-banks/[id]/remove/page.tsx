"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";

export default function RemoveFromPiggyBankPage() {
  const params = useParams();
  const id = params?.id as string;
  const [amount, setAmount] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, amount });
  };

  return (
    <Layout title="Remove from Piggy Bank">
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Amount to remove</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Remove
        </button>
      </form>
    </Layout>
  );
}
