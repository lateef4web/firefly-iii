"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

interface Account {
    id: number;
    name: string;
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        async function loadAccounts() {
            try {
                const response = await fetch("/api/accounts");
                if (response.ok) {
                    const data = await response.json();
                    setAccounts(data);
                }
            } catch {
                // API not available yet
            }
        }
        loadAccounts();
    }, []);

    return (
        <Layout title="Accounts">
            <div className="box" id="account-index">
                <div className="box-header with-border">
                    <h3 className="box-title">Accounts</h3>
                    <div className="box-tools pull-right">
                        <Link href="/accounts/create" className="btn btn-success">
                            + New account
                        </Link>
                    </div>
                </div>
                <div className="box-body">
                    {accounts.length > 0 ? (
                        <ul>
                            {accounts.map(account => (
                                <li key={account.id}>{account.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No accounts yet.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

