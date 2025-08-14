import Layout from '../../../components/Layout';
import AccountForm from '../AccountForm';

export default function CreateAccountPage() {
    return (
        <Layout title="Create Account">
            <h1 className="text-2xl mb-4">Create Account</h1>
            <AccountForm />
        </Layout>
    );
}

