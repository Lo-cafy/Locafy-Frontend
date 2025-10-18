import React, { useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const ProviderChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ from: "provider" | "admin"; text: string }>>([
    { from: "admin", text: "Hello! How can I help you today?" },
    { from: "provider", text: "I have a question about a booking." },
  ]);

  const send = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "provider", text: message.trim() }]);
    setMessage("");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Chat with Admin</h1>
        <p className="text-sm text-gray-500">Start a conversation with the admin team.</p>
      </div>

      <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow">
        <div className="h-[55vh] md:h-[60vh] overflow-y-auto space-y-2 p-2 bg-white/60 rounded-lg border">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "provider" ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${m.from === "provider" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <Button onClick={send} className="bg-emerald-600 text-white hover:bg-emerald-700">Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProviderChat;
