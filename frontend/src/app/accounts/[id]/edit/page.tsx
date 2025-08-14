import Layout from '../../../../components/Layout';
import AccountForm from '../../AccountForm';

interface Props {
    params: { id: string };
}

async function getAccount(id: string) {
    return { name: `Account ${id}`, iban: 'DE00', bic: 'TESTBIC', accountNumber: '123456', notes: 'Demo account' };
}

export default async function EditAccountPage({ params }: Props) {
    const account = await getAccount(params.id);
    return (
        <Layout title="Edit Account">
            <h1 className="text-2xl mb-4">Edit Account</h1>
            <AccountForm initialData={account} accountId={params.id} />
        </Layout>
    );
}

