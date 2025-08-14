"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import PiggyBankGoal from "@/components/PiggyBankGoal";
import PiggyBankTransactions from "@/components/PiggyBankTransactions";

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

interface PiggyBank {
  id: number;
  name: string;
  target: number;
  saved: number;
  transactions: Transaction[];
}

export default function PiggyBankDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [piggy, setPiggy] = useState<PiggyBank | null>(null);

  useEffect(() => {
    fetch(`/api/piggy-banks/${id}`)
      .then((r) => r.json())
      .then(setPiggy)
      .catch(() => {
        setPiggy({
          id: Number(id),
          name: "Vacation",
          target: 1000,
          saved: 250,
          transactions: [
            { id: 1, description: "Initial deposit", amount: 100 },
            { id: 2, description: "Saved money", amount: 150 },
          ],
        });
      });
  }, [id]);

  if (!piggy) {
    return (
      <Layout title="Piggy Bank">
        <p>Loading…</p>
      </Layout>
    );
  }

  return (
    <Layout title={piggy.name}>
      <div className="space-y-6">
        <PiggyBankGoal target={piggy.target} current={piggy.saved} />
        <div>
          <h2 className="text-xl font-bold mb-2">Transactions</h2>
          <PiggyBankTransactions transactions={piggy.transactions} />
        </div>
      </div>
    </Layout>
  );
}
