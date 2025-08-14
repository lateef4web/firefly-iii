import Head from "next/head";
import React, { ReactNode } from "react";

interface LayoutInstallProps {
    children: ReactNode;
    title?: string;
    scripts?: ReactNode;
}

export default function LayoutInstall({children, title, scripts}: LayoutInstallProps) {
    const pageTitle = title ? `${title} » Firefly III` : "Firefly III - Installation and update";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="login-box">
                <div className="login-logo">
                    <strong>Firefly</strong>III<br/>
                    <span style={{fontFamily: "monospace", fontSize: "16pt"}}>installation and upgrade</span>
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
