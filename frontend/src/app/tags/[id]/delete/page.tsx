import Layout from '../../../../components/Layout';
import DeleteTagForm from '../../DeleteTagForm';

interface Props {
    params: { id: string };
}

export default function DeleteTagPage({ params }: Props) {
    return (
        <Layout title="Delete Tag">
            <h1 className="text-2xl mb-4">Delete Tag</h1>
            <p className="mb-4">Are you sure you want to delete this tag?</p>
            <DeleteTagForm tagId={params.id} />
        </Layout>
    );
}
