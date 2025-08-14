import Layout from '../../../../components/Layout';
import DeleteWebhookForm from '../../DeleteWebhookForm';

interface Props {
    params: { id: string };
}

async function getWebhook(id: string) {
    return { id, title: `Webhook ${id}` };
}

export default async function DeleteWebhookPage({ params }: Props) {
    const webhook = await getWebhook(params.id);
    return (
        <Layout title="Delete Webhook">
            <h1 className="text-2xl mb-4">Delete {webhook.title}</h1>
            <p className="mb-4">Are you sure you want to delete this webhook?</p>
            <DeleteWebhookForm webhookId={params.id} />
        </Layout>
    );
}

