"use client";

import { useState } from "react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatDraft = {
  clientName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  serviceId?: string;
  stylistId?: string;
};

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "I can match you with a stylist and book your appointment. Tell me your hair goal to start.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ChatDraft>({});

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, draft }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Chat failed");
      }

      setDraft(payload.draft ?? {});
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: payload.message ?? "I ran into an issue, please try again.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "I had trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chatbot" className="glass-card rounded-3xl p-6 md:p-8">
      <h3 className="display-font text-3xl text-[var(--accent-deep)]">AI Booking Concierge</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Ask for stylist recommendations and book by chat.
      </p>

      <div className="mt-6 h-80 space-y-3 overflow-y-auto rounded-2xl border border-[var(--line)] bg-white p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
              message.role === "assistant"
                ? "bg-[#f4eee5] text-[var(--foreground)]"
                : "ml-auto bg-[var(--accent-deep)] text-white"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form className="mt-4 flex gap-2" onSubmit={sendMessage}>
        <input
          className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Example: I want balayage with Alexis on 2026-03-20 at 2pm..."
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </section>
  );
}
