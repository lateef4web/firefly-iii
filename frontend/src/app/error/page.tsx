import React from "react";
import Link from "next/link";

interface ErrorPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
    const message = typeof searchParams.message === "string" ? searchParams.message : "General unknown error";
    return (
        <div className="p-4 space-y-4 font-sans">
            <h3 className="text-red-600">Sorry, an error occurred.</h3>
            <p dangerouslySetInnerHTML={{ __html: message }} />
            <p>
                If you do not know how to handle this error, please open an issue on
                <a className="text-blue-500" href="https://github.com/firefly-iii/firefly-iii/issues"> GitHub</a>
                or <a className="text-blue-500" href="mailto:james@firefly-iii.org">send me a message</a>.
            </p>
            <p>
                <Link href="/">Follow this link back to the index.</Link>
            </p>
        </div>
    );
}

