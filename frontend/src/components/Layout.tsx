import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({children, title}: LayoutProps) {
    const pageTitle = title ? `${title} » Firefly III` : "Firefly III";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="wrapper" id="app">
                <header className="main-header">
                    <Link href="/" className="logo">
                        <span className="logo-mini">FF</span>
                        <span className="logo-lg"><strong>Firefly</strong>III</span>
                    </Link>
                </header>
                <aside className="main-sidebar">
                    <section className="sidebar"></section>
                </aside>
                <div className="content-wrapper">
                    <section className="content-header"></section>
                    <section className="content">{children}</section>
                </div>
                <footer className="main-footer">
                    <strong><a href="https://github.com/firefly-iii/firefly-iii">Firefly III</a></strong>
                </footer>
            </div>
        </>
    );
}
