import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(req: NextRequest) {
    const res = await fetch(`${API_BASE}/api/v1/attachments`, {
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
        cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // create empty attachment
    const createRes = await fetch(`${API_BASE}/api/v1/attachments`, {
        method: "POST",
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
    });
    const created = await createRes.json();
    const id = created?.data?.id;

    if (file && id) {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        await fetch(`${API_BASE}/api/v1/attachments/${id}/upload`, {
            method: "POST",
            headers: {
                Authorization: req.headers.get("authorization") || "",
            },
            body: uploadForm,
        });
    }

    return NextResponse.json({ id });
}
