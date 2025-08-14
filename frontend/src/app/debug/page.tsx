import React from "react";
import Link from "next/link";

interface DebugData {
    now: string;
    ffVersion: string;
    table: string;
    logContent: string;
    backText: string;
}

async function getDebugData(): Promise<DebugData> {
    const res = await fetch("/api/debug", { cache: "no-store" });
    return res.json();
}

export default async function DebugPage() {
    const data = await getDebugData();
    return (
        <div className="p-4 space-y-4 font-sans">
            <p dangerouslySetInnerHTML={{ __html: data.table }} />
            <textarea
                rows={30}
                cols={100}
                defaultValue={`Debug information generated at ${data.now} for Firefly III version ${data.ffVersion}.\n\n${data.table}`}
                className="w-full font-mono text-xs"
                readOnly
            />
            <p>
                <Link href="/">{data.backText}</Link>
            </p>
            <textarea
                rows={30}
                cols={100}
                defaultValue={data.logContent}
                className="w-full font-mono text-xs"
                readOnly
            />
            <p>
                <Link href="/">{data.backText}</Link>
            </p>
        </div>
    );
}

