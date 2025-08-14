"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../../components/Layout";

export default function EditAttachment({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/attachments/${params.id}`)
            .then((r) => r.json())
            .then((d) => {
                setTitle(d.data?.title || "");
                setNotes(d.data?.notes || "");
            });
    }, [params.id]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/attachments/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, notes }),
        });
        router.push("/attachments");
    };

    return (
        <Layout title="Edit attachment">
            <h1 className="text-2xl mb-4">Edit attachment</h1>
            <form onSubmit={submit} className="space-y-4 max-w-md">
                <div>
                    <label className="block">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border" />
                </div>
                <div>
                    <label className="block">Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Layout>
    );
}
