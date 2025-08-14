import Layout from '../../components/Layout';
import Link from 'next/link';
import AvatarUpload from '../../components/AvatarUpload';

export default function ProfilePage() {
    return (
        <Layout title="Profile">
            <h1 className="text-2xl mb-4">Profile</h1>
            <div className="mb-6">
                <h2 className="text-xl mb-2">Avatar</h2>
                <AvatarUpload />
            </div>
            <ul className="list-disc pl-5 space-y-2">
                <li><Link className="text-blue-600" href="/profile/change-email">Change Email</Link></li>
                <li><Link className="text-blue-600" href="/profile/change-password">Change Password</Link></li>
                <li><Link className="text-blue-600" href="/profile/logout-other-sessions">Logout Other Sessions</Link></li>
                <li><Link className="text-blue-600" href="/profile/delete-account">Delete Account</Link></li>
                <li><Link className="text-blue-600" href="/profile/new-backup-codes">Backup Codes</Link></li>
            </ul>
        </Layout>
    );
}
