import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const res = await fetch(`${API_BASE}/api/v1/attachments/${params.id}`, {
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
        cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.text();
    const res = await fetch(`${API_BASE}/api/v1/attachments/${params.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("authorization") || "",
        },
        body,
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await fetch(`${API_BASE}/api/v1/attachments/${params.id}`, {
        method: "DELETE",
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
    });
    return NextResponse.json({ ok: true });
}
