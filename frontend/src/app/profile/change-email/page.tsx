import Layout from '../../../components/Layout';
import ChangeEmailForm from '../ChangeEmailForm';

export default function ChangeEmailPage() {
    return (
        <Layout title="Change Email">
            <h1 className="text-2xl mb-4">Change Email</h1>
            <ChangeEmailForm />
        </Layout>
    );
}
