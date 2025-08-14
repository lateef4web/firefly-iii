import Link from 'next/link';
import Layout from '../../components/Layout';

async function getAccounts() {
    return [
        {id: '1', name: 'Checking'},
        {id: '2', name: 'Savings'},
    ];
}

export default async function AccountsIndex() {
    const accounts = await getAccounts();
    return (
        <Layout title="Accounts">
            <h1 className="text-2xl mb-4">Accounts</h1>
            <div className="mb-4">
                <Link href="/accounts/create" className="text-blue-500 underline">
                    Create Account
                </Link>
            </div>
            <ul className="space-y-2">
                {accounts.map((account) => (
                    <li key={account.id}>
                        <Link href={`/accounts/${account.id}`} className="text-blue-600 underline">
                            {account.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

