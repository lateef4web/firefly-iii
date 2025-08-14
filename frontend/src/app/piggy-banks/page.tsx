"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import PiggyBankGoal from "@/components/PiggyBankGoal";

interface PiggyBank {
  id: number;
  name: string;
  target: number;
  saved: number;
}

export default function PiggyBanksPage() {
  const [piggies, setPiggies] = useState<PiggyBank[]>([]);

  useEffect(() => {
    fetch("/api/piggy-banks")
      .then((r) => r.json())
      .then(setPiggies)
      .catch(() => {
        setPiggies([
          { id: 1, name: "Vacation", target: 1000, saved: 250 },
        ]);
      });
  }, []);

  return (
    <Layout title="Piggy Banks">
      <div className="space-y-4">
        <div>
          <Link href="/piggy-banks/create" className="btn btn-success">
            Create new piggy bank
          </Link>
        </div>
        <ul className="space-y-4">
          {piggies.map((pb) => (
            <li key={pb.id} className="p-4 border rounded">
              <div className="flex items-center justify-between">
                <Link href={`/piggy-banks/${pb.id}`}>{pb.name}</Link>
                <PiggyBankGoal target={pb.target} current={pb.saved} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
