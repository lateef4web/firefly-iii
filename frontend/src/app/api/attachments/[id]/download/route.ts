import { NextRequest } from "next/server";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const res = await fetch(`${API_BASE}/api/v1/attachments/${params.id}/download`, {
        headers: {
            Authorization: req.headers.get("authorization") || "",
        },
    });

    return new Response(res.body, {
        headers: {
            "Content-Type": res.headers.get("Content-Type") || "application/octet-stream",
        },
        status: res.status,
    });
}
