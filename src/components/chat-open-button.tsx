"use client";

interface ChatOpenButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatOpenButton({ children, className }: ChatOpenButtonProps) {
  return (
    <button
      type="button"
      onClick={() => document.dispatchEvent(new CustomEvent("wylde:open-chat"))}
      className={className}
    >
      {children}
    </button>
  );
}
