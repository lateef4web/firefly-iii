import React from "react";
import { promises as fs } from "fs";
import path from "path";

async function getPwaHtml(): Promise<string> {
    const filePath = path.join(process.cwd(), "public", "v3", "index.html");
    try {
        return await fs.readFile(filePath, "utf8");
    } catch {
        return "<p>PWA not available</p>";
    }
}

export default async function PwaPage() {
    const html = await getPwaHtml();
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

