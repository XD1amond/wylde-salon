"use client";

import { useEffect, useRef, useState } from "react";

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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Wylde AI. I can recommend a stylist and book your appointment. What look are you going for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ChatDraft>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ── Listen for homepage "open chat" button ─────────────── */
  useEffect(() => {
    function handler() {
      setClosing(false);
      setOpen(true);
    }
    document.addEventListener("wylde:open-chat", handler);
    return () => document.removeEventListener("wylde:open-chat", handler);
  }, []);

  /* ── Auto-scroll messages ────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function openChat() {
    setClosing(false);
    setOpen(true);
  }

  function closeChat() {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 220);
  }

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, draft }),
      });
      const payload = await response.json();
      setDraft(payload?.draft ?? {});
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: payload?.message ?? "I hit an issue. Please try again.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Connection issue. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Floating toggle button ──────────────────────────── */}
      <button
        type="button"
        onClick={open ? closeChat : openChat}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[var(--accent-deep)] text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl animate-pop-in"
        style={{ animationDelay: "0.6s" }}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        W
      </button>

      {/* ── Chat panel ──────────────────────────────────────── */}
      {open && (
        <aside
          className="fixed bottom-24 right-6 z-50 w-[min(92vw,360px)] rounded-2xl border border-[var(--line)] bg-white shadow-2xl"
          style={{
            animation: closing
              ? "chatOut 0.22s cubic-bezier(0.22,1,0.36,1) forwards"
              : "chatIn 0.28s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          <header className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
            <h3 className="display-font text-2xl text-[var(--accent-deep)]">Wylde AI</h3>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-md px-2 py-1 text-sm text-[var(--text-muted)] transition hover:bg-[var(--background-soft)]"
              aria-label="Close AI chat"
            >
              ✕
            </button>
          </header>

          <div className="h-72 space-y-3 overflow-y-auto bg-[#fcfaf6] px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-[#f0e8dc] text-[var(--foreground)]"
                    : "ml-auto bg-[var(--accent-deep)] text-white"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[60%] rounded-xl bg-[#f0e8dc] px-3 py-2 text-sm text-[var(--text-muted)]">
                <span className="animate-pulse">···</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-[var(--line)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              placeholder="What stylist should I choose?"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)] disabled:opacity-60"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
