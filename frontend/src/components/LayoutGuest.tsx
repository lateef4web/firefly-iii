import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutGuestProps {
    children: ReactNode;
    title?: string;
    scripts?: ReactNode;
}

export default function LayoutGuest({children, title, scripts}: LayoutGuestProps) {
    const pageTitle = title ? `${title} » Firefly III` : "Firefly III";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="login-box">
                <div className="login-logo">
                    <Link href="/">
                        <strong>Firefly</strong>III
                    </Link>
                </div>
                {children}
            </div>
            <div className="text-center text-muted">
                <small>
                    Developed by James Cole, the source code is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.html">AGPL-3.0-or-later</a>.
                </small>
            </div>
            {scripts}
        </>
    );
}
