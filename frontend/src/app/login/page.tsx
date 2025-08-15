import React, { useState } from "react";
import LayoutGuest from "@/components/LayoutGuest";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LayoutGuest title="Login">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow">
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
                    <div>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="remember" className="flex items-center gap-2">
                            <input id="remember" type="checkbox" className="rounded" />
                            <span>Remember me</span>
                        </label>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
                    </div>
                </form>
                <p className="mt-3 text-sm">
                    <a href="/password-reset" className="text-blue-600 hover:underline">Forgot my password</a>
                </p>
            </div>
        </LayoutGuest>
    );
}

