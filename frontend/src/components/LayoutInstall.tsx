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
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="text-center text-4xl">
                    <strong>Firefly</strong>III<br/>
                    <span className="block font-mono text-base">installation and upgrade</span>
                </div>
                {children}
                <div className="text-center text-gray-500 text-sm">
                    <small>
                        Developed by James Cole, the source code is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.html" className="text-blue-600">AGPL-3.0-or-later</a>.
                    </small>
                </div>
            </div>
            {scripts}
        </>
    );
}
