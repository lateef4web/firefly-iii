import { NextRequest, NextResponse } from "next/server";

const steps = [
  "Checking environment",
  "Migrating database",
  "Seeding data",
  "Finalizing setup"
];

export async function POST(req: NextRequest) {
  const { step } = await req.json();
  const index = typeof step === "number" ? step : 0;
  const done = index >= steps.length;
  const message = done ? "Setup finished" : steps[index];

  return NextResponse.json({ step: index, message, done });
}

