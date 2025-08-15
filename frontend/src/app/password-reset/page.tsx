import React, { useState } from "react";
import LayoutGuest from "@/components/LayoutGuest";

export default function PasswordResetPage() {
    const [email, setEmail] = useState("");

    return (
        <LayoutGuest title="Reset Password">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow">
                <p className="mb-4 text-center font-semibold">Reset Password</p>
                <form method="post" className="space-y-4">
                    <div>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Email"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">
                        Send reset link
                    </button>
                </form>
                <p className="mt-3 text-sm text-center">
                    <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
                </p>
            </div>
        </LayoutGuest>
    );
}

