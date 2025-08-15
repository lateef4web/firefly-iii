'use client';

import {useRouter, useParams} from 'next/navigation';
import Layout from '../../../../components/Layout';

export default function DeleteCurrency() {
    const router = useRouter();
    const params = useParams();
    const code = params?.code as string;

    const handleDelete = async () => {
        await fetch(`/api/v1/currencies/${code}`, {method: 'DELETE'});
        router.push('/currencies');
    };

    return (
        <Layout title={`Delete ${code}`}>
            <div className="bg-red-50 border border-red-400 rounded">
                <div className="p-4">
                    <p>Are you sure you want to delete {code}?</p>
                </div>
                <div className="flex justify-end space-x-2 border-t p-4">
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Layout>
    );
}
