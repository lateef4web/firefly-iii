"use client";

import { useRouter } from "next/navigation";
import Layout from "../../../../components/Layout";
import { useEffect, useState } from "react";

export default function DeleteAttachment({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [name, setName] = useState("");

    useEffect(() => {
        fetch(`/api/attachments/${params.id}`)
            .then((r) => r.json())
            .then((d) => setName(d.data?.filename || ""));
    }, [params.id]);

    const destroy = async () => {
        await fetch(`/api/attachments/${params.id}`, { method: "DELETE" });
        router.push("/attachments");
    };

    return (
        <Layout title="Delete attachment">
            <h1 className="text-2xl mb-4">Delete attachment</h1>
            <p className="mb-4">Are you sure you want to delete {name}?</p>
            <button onClick={destroy} className="btn btn-danger mr-2">Delete</button>
            <button onClick={() => router.back()} className="btn">Cancel</button>
        </Layout>
    );
}
