import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutDefaultProps {
    children: ReactNode;
    title?: string;
    styles?: ReactNode;
    definitions?: ReactNode;
    scripts?: ReactNode;
}

export default function LayoutDefault({children, title, styles, definitions, scripts}: LayoutDefaultProps) {
    const pageTitle = title ? `${title} » Firefly III` : "Firefly III";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {styles}
                {definitions}
            </Head>
            <div id="app" className="min-h-screen flex flex-col">
                <header className="bg-gray-800 text-white p-4">
                    <Link href="/" className="text-xl font-bold">
                        <span className="sr-only">Firefly III</span>
                        FF
                    </Link>
                </header>
                <div className="flex flex-1">
                    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                        <nav className="space-y-2 text-sm">
                            <Link
                                href="/"
                                className="block px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/accounts"
                                className="block px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                Accounts
                            </Link>
                        </nav>
                    </aside>
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </div>
                <footer className="bg-gray-100 text-center p-4">
                    <strong>
                        <a href="https://github.com/firefly-iii/firefly-iii" className="text-blue-600">
                            Firefly III
                        </a>
                    </strong>
                </footer>
            </div>
            {scripts}
        </>
    );
}
