import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import type { Booking } from "@/types/Bookings.types";

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
}

export default function ChatModal({ open, onOpenChange, booking }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ from: "admin" | "customer"; text: string }>>([
    { from: "customer", text: "Hi, can I reschedule?" },
    { from: "admin", text: "Sure, what time works for you?" },
  ]);

  if (!booking) return null;

  const send = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "admin", text: message.trim() }]);
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60">
        <DialogHeader>
          <DialogTitle>Chat with {booking.customerName}</DialogTitle>
        </DialogHeader>
        <div className="h-64 overflow-y-auto space-y-2 p-2 bg-white/60 rounded-lg border">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-xl text-sm ${m.from === "admin" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
          <Button onClick={send} className="bg-emerald-600 text-white hover:bg-emerald-700">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
