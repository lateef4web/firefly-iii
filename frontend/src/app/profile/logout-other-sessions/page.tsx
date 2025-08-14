import Layout from '../../../components/Layout';
import LogoutOthersForm from '../LogoutOthersForm';

export default function LogoutOthersPage() {
    return (
        <Layout title="Logout Other Sessions">
            <h1 className="text-2xl mb-4">Logout Other Sessions</h1>
            <LogoutOthersForm />
        </Layout>
    );
}
