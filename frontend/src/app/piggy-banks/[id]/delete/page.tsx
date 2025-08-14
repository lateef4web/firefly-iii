"use client";

import React from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";

export default function DeletePiggyBankPage() {
  const params = useParams();
  const id = params?.id as string;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, delete: true });
  };

  return (
    <Layout title="Delete Piggy Bank">
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <p>Are you sure you want to delete this piggy bank?</p>
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
    </Layout>
  );
}
