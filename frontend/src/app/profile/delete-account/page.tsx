import Layout from '../../../components/Layout';
import DeleteAccountForm from '../DeleteAccountForm';

export default function DeleteAccountPage() {
    return (
        <Layout title="Delete Account">
            <h1 className="text-2xl mb-4 text-red-600">Delete Account</h1>
            <DeleteAccountForm />
        </Layout>
    );
}
