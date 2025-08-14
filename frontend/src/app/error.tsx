'use client';

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="p-4 space-y-4 font-sans">
            <h3 className="text-red-600">Sorry, an error occurred.</h3>
            <p className="text-danger">{error.message || "General unknown error"}</p>
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

