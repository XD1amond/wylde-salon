import { processChatMessage } from "@/lib/chatbot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const message = typeof payload?.message === "string" ? payload.message : "";
  const draft = typeof payload?.draft === "object" && payload?.draft ? payload.draft : {};

  if (!message.trim()) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 400 },
    );
  }

  const result = await processChatMessage(message, draft);
  return NextResponse.json({ ok: true, ...result });
}
