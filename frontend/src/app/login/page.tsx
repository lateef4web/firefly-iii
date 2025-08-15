'use client';

import React, { useState } from "react";
import LayoutGuest from "@/components/LayoutGuest";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LayoutGuest title="Login">
            <div className="card">
                <div className="card-body login-card-body">
                    <form method="post">
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="form-check">
                                    <input id="remember" className="form-check-input" type="checkbox" />
                                    <label htmlFor="remember" className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-3 mb-1">
                        <a href="/password-reset">Forgot my password</a>
                    </p>
                </div>
            </div>
        </LayoutGuest>
    );
}

