import Layout from '../../components/Layout';
import PreferencesForm from './PreferencesForm';

export default function PreferencesPage() {
    return (
        <Layout title="Preferences">
            <h1 className="text-2xl mb-4">Preferences</h1>
            <PreferencesForm />
        </Layout>
    );
}
