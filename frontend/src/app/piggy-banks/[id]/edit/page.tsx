"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";

export default function EditPiggyBankPage() {
  const params = useParams();
  const id = params?.id as string;
  const [name, setName] = useState("");
  const [target, setTarget] = useState(0);

  useEffect(() => {
    fetch(`/api/piggy-banks/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setName(data.name);
        setTarget(data.target);
      })
      .catch(() => {
        setName("Vacation");
        setTarget(1000);
      });
  }, [id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, name, target });
  };

  return (
    <Layout title="Edit Piggy Bank">
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
