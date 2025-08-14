import Link from 'next/link';
import Layout from '../../components/Layout';

export default function SettingsIndex() {
    return (
        <Layout title="Settings">
            <h1 className="text-2xl mb-4">Settings</h1>
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl mb-2">General</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <Link href="/settings/general" className="text-blue-600 underline">
                                Personal preferences
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl mb-2">Security</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <Link href="/settings/security" className="text-blue-600 underline">
                                Security options
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </Layout>
    );
}

