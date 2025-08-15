import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutEmptyProps {
    children: ReactNode;
    title?: string;
}

export default function LayoutEmpty({children, title}: LayoutEmptyProps) {
    const pageTitle = title ? `${title} » Firefly III` : "Firefly III";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="text-center text-4xl">
                    <Link href="/" className="font-bold">
                        <strong>Firefly</strong>III
                    </Link>
                </div>
                {children}
            </div>
        </>
    );
}
