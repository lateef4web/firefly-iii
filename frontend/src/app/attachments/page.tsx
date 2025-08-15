"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

interface Attachment {
    id: number;
    filename: string;
    size: number;
    mime: string;
}

export default function AttachmentIndex() {
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    const load = async () => {
        const res = await fetch("/api/attachments");
        const json = await res.json();
        setAttachments(json.data || []);
    };

    useEffect(() => {
        load();
    }, []);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }
        const formData = new FormData();
        formData.append("file", input.files[0]);
        await fetch("/api/attachments", { method: "POST", body: formData });
        input.value = "";
        await load();
    };

    const download = (id: number) => {
        window.location.href = `/api/attachments/${id}/download`;
    };

    return (
        <Layout title="Attachments">
            <h1 className="text-2xl mb-4">Attachments</h1>
            <form onSubmit={handleUpload} className="mb-4">
                <input type="file" name="file" />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Upload
                </button>
            </form>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attachments.map((att) => (
                        <tr key={att.id}>
                            <td>{att.id}</td>
                            <td>{att.filename}</td>
                            <td>{att.size}</td>
                            <td>{att.mime}</td>
                            <td>
                                <Link href={`/attachments/${att.id}/edit`} className="mr-2 text-blue-500">Edit</Link>
                                <Link href={`/attachments/${att.id}/delete`} className="mr-2 text-red-500">Delete</Link>
                                <button onClick={() => download(att.id)} className="text-green-600">Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}
