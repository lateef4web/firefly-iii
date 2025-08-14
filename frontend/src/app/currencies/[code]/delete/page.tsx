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
            <div className="box box-danger">
                <div className="box-body">
                    <p>Are you sure you want to delete {code}?</p>
                </div>
                <div className="box-footer flex justify-end space-x-2">
                    <button onClick={() => router.back()} className="btn btn-default">Cancel</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </Layout>
    );
}
