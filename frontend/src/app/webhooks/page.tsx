import Link from 'next/link';
import Layout from '../../components/Layout';

async function getWebhooks() {
    return [
        { id: '1', title: 'Monthly Updates', trigger: 'STORE_TRANSACTION', response: 'TRANSACTIONS', url: 'https://example.com/hook1' },
        { id: '2', title: 'Slack Notifications', trigger: 'UPDATE_TRANSACTION', response: 'NONE', url: 'https://example.com/hook2' },
    ];
}

export default async function WebhooksIndex() {
    const webhooks = await getWebhooks();
    return (
        <Layout title="Webhooks">
            <h1 className="text-2xl mb-4">Webhooks</h1>
            <div className="mb-4">
                <Link href="/webhooks/create" className="text-blue-500 underline">
                    Create Webhook
                </Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 text-left">Title</th>
                        <th className="border p-2 text-left">Trigger</th>
                        <th className="border p-2 text-left">Response</th>
                        <th className="border p-2 text-left">URL</th>
                        <th className="border p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {webhooks.map((hook) => (
                        <tr key={hook.id}>
                            <td className="border p-2">
                                <Link href={`/webhooks/${hook.id}`} className="text-blue-600 underline">
                                    {hook.title}
                                </Link>
                            </td>
                            <td className="border p-2">{hook.trigger}</td>
                            <td className="border p-2">{hook.response}</td>
                            <td className="border p-2"><code>{hook.url}</code></td>
                            <td className="border p-2 space-x-2">
                                <Link href={`/webhooks/${hook.id}/edit`} className="text-blue-500 underline">Edit</Link>
                                <Link href={`/webhooks/${hook.id}/delete`} className="text-red-500 underline">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

