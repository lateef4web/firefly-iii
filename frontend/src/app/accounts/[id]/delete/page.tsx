import Layout from '../../../../components/Layout';
import DeleteAccountForm from '../../DeleteAccountForm';

interface Props {
    params: { id: string };
}

export default function DeleteAccountPage({ params }: Props) {
    return (
        <Layout title="Delete Account">
            <h1 className="text-2xl mb-4">Delete Account</h1>
            <p className="mb-4">Are you sure you want to delete this account?</p>
            <DeleteAccountForm accountId={params.id} />
        </Layout>
    );
}

