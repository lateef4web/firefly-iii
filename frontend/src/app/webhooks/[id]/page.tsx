import Link from 'next/link';
import Layout from '../../../components/Layout';

interface Props {
    params: { id: string };
}

async function getWebhook(id: string) {
    return { id, title: `Webhook ${id}`, url: 'https://example.com/webhook', trigger: 'STORE_TRANSACTION', response: 'TRANSACTIONS', secret: 'SECRET' };
}

export default async function ShowWebhookPage({ params }: Props) {
    const webhook = await getWebhook(params.id);
    return (
        <Layout title={webhook.title}>
            <h1 className="text-2xl mb-4">{webhook.title}</h1>
            <p>Trigger: {webhook.trigger}</p>
            <p>Response: {webhook.response}</p>
            <p>URL: <code>{webhook.url}</code></p>
            <p>Secret: <code>{webhook.secret}</code></p>
            <div className="mt-4 space-x-4">
                <Link href={`/webhooks/${webhook.id}/edit`} className="text-blue-500 underline">Edit</Link>
                <Link href={`/webhooks/${webhook.id}/delete`} className="text-red-500 underline">Delete</Link>
            </div>
        </Layout>
    );
}

