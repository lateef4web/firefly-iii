import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8080";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const formData = await req.formData();
    const res = await fetch(`${API_BASE}/api/v1/attachments/${params.id}/upload`, {
        method: "POST",
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
        body: formData,
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
