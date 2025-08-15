import type {Metadata} from "next";
import "../styles/globals.scss";
import "../styles/adminlte-filtered.scss";
import "../styles/app.scss";
import "../styles/grid-ff3-theme.css";
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
