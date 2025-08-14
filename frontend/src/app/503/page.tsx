import React from "react";
import Link from "next/link";

export default function ServiceUnavailable() {
    return (
        <div className="p-4 space-y-4 font-sans">
            <h3 className="text-red-600">Firefly III is in maintenance mode.</h3>
            <p>Be right back!</p>
            <p className="text-danger">Firefly III is down for some necessary maintenance. Please check back in a second.</p>
            <p>
                <Link href="/">Return to the index.</Link>
            </p>
        </div>
    );
}

