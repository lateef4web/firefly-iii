import Layout from '../../../components/Layout';
import ChangePasswordForm from '../ChangePasswordForm';

export default function ChangePasswordPage() {
    return (
        <Layout title="Change Password">
            <h1 className="text-2xl mb-4">Change Password</h1>
            <ChangePasswordForm />
        </Layout>
    );
}
