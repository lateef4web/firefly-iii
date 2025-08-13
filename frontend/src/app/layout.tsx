import type {Metadata} from "next";
import "../styles/globals.scss";
import React from "react";

export const metadata: Metadata = {
    title: "Firefly III",
    description: "Financial management firefly",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
