"use client";

import { useEffect, useState } from "react";

interface InstallResponse {
  step: number;
  message: string;
  done: boolean;
}

export default function InstallPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const runStep = async () => {
    setLoading(true);
    const res = await fetch("/api/install", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step }),
    });
    const data: InstallResponse = await res.json();
    setLogs(prev => [...prev, data.message]);
    setLoading(false);
    if (data.done) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    runStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Setup Wizard</h1>
      <div className="border rounded p-2 h-64 overflow-y-auto mb-4">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
        {loading && <div>Running...</div>}
      </div>
      {!done && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={runStep}
          disabled={loading}
        >
          {loading ? "Working..." : "Run next step"}
        </button>
      )}
      {done && <div className="text-green-700">Installation complete!</div>}
    </main>
  );
}

