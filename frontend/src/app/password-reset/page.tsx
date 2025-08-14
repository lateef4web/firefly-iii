import React, { useState } from "react";
import LayoutGuest from "@/components/LayoutGuest";

export default function PasswordResetPage() {
    const [email, setEmail] = useState("");

    return (
        <LayoutGuest title="Reset Password">
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Reset Password</p>
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
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Send reset link
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-3 mb-1">
                        <a href="/login">Back to login</a>
                    </p>
                </div>
            </div>
        </LayoutGuest>
    );
}

