import Layout from '../../../../components/Layout';
import WebhookForm from '../../WebhookForm';

interface Props {
    params: { id: string };
}

async function getWebhook(id: string) {
    return { title: `Webhook ${id}`, url: 'https://example.com/webhook', trigger: 'STORE_TRANSACTION', response: 'TRANSACTIONS' };
}

export default async function EditWebhookPage({ params }: Props) {
    const webhook = await getWebhook(params.id);
    return (
        <Layout title="Edit Webhook">
            <h1 className="text-2xl mb-4">Edit Webhook</h1>
            <WebhookForm initialData={webhook} webhookId={params.id} />
        </Layout>
    );
}

