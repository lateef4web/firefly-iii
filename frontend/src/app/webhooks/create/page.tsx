import Layout from '../../../components/Layout';
import WebhookForm from '../WebhookForm';

export default function CreateWebhookPage() {
    return (
        <Layout title="Create Webhook">
            <h1 className="text-2xl mb-4">Create Webhook</h1>
            <WebhookForm />
        </Layout>
    );
}

