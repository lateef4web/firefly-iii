"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function CreatePiggyBankPage() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, target });
  };

  return (
    <Layout title="Create Piggy Bank">
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Target amount</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </Layout>
  );
}
