import Link from 'next/link';
import Layout from '../../../components/Layout';

interface Props {
    params: { id: string };
}

async function getAccount(id: string) {
    return { id, name: `Account ${id}`, iban: 'DE00', bic: 'TESTBIC', accountNumber: '123456', notes: 'Demo account' };
}

export default async function ShowAccountPage({ params }: Props) {
    const account = await getAccount(params.id);
    return (
        <Layout title={account.name}>
            <h1 className="text-2xl mb-4">{account.name}</h1>
            <p>IBAN: {account.iban}</p>
            <p>BIC: {account.bic}</p>
            <p>Account Number: {account.accountNumber}</p>
            <p>Notes: {account.notes}</p>
            <div className="mt-4 space-x-4">
                <Link href={`/accounts/${account.id}/edit`} className="text-blue-500 underline">Edit</Link>
                <Link href={`/accounts/${account.id}/delete`} className="text-red-500 underline">Delete</Link>
            </div>
        </Layout>
    );
}

