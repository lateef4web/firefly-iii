"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";

export default function AddToPiggyBankPage() {
  const params = useParams();
  const id = params?.id as string;
  const [amount, setAmount] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, amount });
  };

  return (
    <Layout title="Add to Piggy Bank">
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Amount to add</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </Layout>
  );
}
