import Link from 'next/link';
import Layout from '../../../components/Layout';

export default function SecuritySettings() {
    return (
        <Layout title="Security settings">
            <h1 className="text-2xl mb-4">Security settings</h1>
            <ul className="list-disc pl-6 space-y-2">
                <li>
                    <Link href="/profile/change-email" className="text-blue-600 underline">
                        Change email
                    </Link>
                </li>
                <li>
                    <Link href="/profile/change-password" className="text-blue-600 underline">
                        Change password
                    </Link>
                </li>
                <li>
                    <Link href="/profile/mfa" className="text-blue-600 underline">
                        Manage multi-factor authentication
                    </Link>
                </li>
                <li>
                    <Link href="/profile/delete-account" className="text-red-600 underline">
                        Delete account
                    </Link>
                </li>
            </ul>
        </Layout>
    );
}

