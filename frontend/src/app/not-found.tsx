import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="p-4 space-y-4 font-sans">
            <h3 className="text-red-600">Firefly III cannot find this page.</h3>
            <p>The page you have requested does not exist. Please check that you have not entered the wrong URL.</p>
            <p>If you were redirected to this page automatically, please accept our apologies.</p>
            <p>
                If you are sure this page should exist, please open a ticket on
                <a className="text-blue-500" href="https://github.com/firefly-iii/firefly-iii/issues"> GitHub</a>.
            </p>
            <p>
                <Link href="/">Follow this link back to the index.</Link>
            </p>
        </div>
    );
}

