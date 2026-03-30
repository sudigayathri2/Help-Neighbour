import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, Send, Check, CheckCheck, Wifi, WifiOff } from "lucide-react";
import { getSocket } from "./socket";

const API_BASE = import.meta.env.VITE_API_BASE || "";

interface ChatMessage {
  id: string;
  taskId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface Props {
  taskId: string;
  taskTitle: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  currentUserId: string;
  currentUserName: string;
  onClose: () => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getDateLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString();
}

export const ChatModal: React.FC<Props> = ({
  taskId,
  taskTitle,
  receiverId,
  receiverName,
  receiverAvatar,
  currentUserId,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isReceiverOnline, setIsReceiverOnline] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socket = getSocket();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/messages?taskId=${taskId}`, {
          headers: { "x-user-id": currentUserId },
        });
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskId, currentUserId]);

  useEffect(() => {
    if (!socket) return;

    setSocketConnected(socket.connected);
    socket.emit("mark_read", { taskId, senderId: receiverId });

    const onConnect = () => setSocketConnected(true);
    const onDisconnect = () => setSocketConnected(false);

    const onReceive = (msg: ChatMessage) => {
      if (msg.taskId !== taskId) return;
      setMessages((prev) => [...prev, msg]);
      socket.emit("mark_read", { taskId, senderId: receiverId });
    };

    const onSent = (msg: ChatMessage) => {
      if (msg.taskId !== taskId) return;
      setMessages((prev) => [...prev, msg]);
    };

    const onTyping = ({ taskId: tid, senderId, isTyping: typing }: { taskId: string; senderId: string; isTyping: boolean }) => {
      if (tid !== taskId || senderId !== receiverId) return;
      setIsTyping(typing);
    };

    const onRead = ({ taskId: tid, byUserId }: { taskId: string; byUserId: string }) => {
      if (tid !== taskId || byUserId !== receiverId) return;
      setMessages((prev) =>
        prev.map((m) => (m.senderId === currentUserId ? { ...m, isRead: true } : m))
      );
    };

    const onOnlineUsers = (userIds: string[]) => setIsReceiverOnline(userIds.includes(receiverId));
    const onOffline = ({ userId }: { userId: string }) => { if (userId === receiverId) setIsReceiverOnline(false); };
    const onOnline = ({ userId }: { userId: string }) => { if (userId === receiverId) setIsReceiverOnline(true); };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onReceive);
    socket.on("message_sent", onSent);
    socket.on("typing", onTyping);
    socket.on("messages_read", onRead);
    socket.on("online_users", onOnlineUsers);
    socket.on("user_went_offline", onOffline);
    socket.on("user_came_online", onOnline);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onReceive);
      socket.off("message_sent", onSent);
      socket.off("typing", onTyping);
      socket.off("messages_read", onRead);
      socket.off("online_users", onOnlineUsers);
      socket.off("user_went_offline", onOffline);
      socket.off("user_came_online", onOnline);
    };
  }, [socket, taskId, receiverId, currentUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || !socket) return;
    socket.emit("send_message", { taskId, receiverId, content: text });
    socket.emit("typing", { taskId, receiverId, isTyping: false });
    setInput("");
  }, [input, socket, taskId, receiverId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!socket) return;
    socket.emit("typing", { taskId, receiverId, isTyping: true });
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      socket?.emit("typing", { taskId, receiverId, isTyping: false });
    }, 1500);
  };

  const grouped: { label: string; messages: ChatMessage[] }[] = [];
  let currentLabel = "";
  for (const msg of messages) {
    const label = getDateLabel(msg.createdAt);
    if (label !== currentLabel) {
      grouped.push({ label, messages: [] });
      currentLabel = label;
    }
    grouped[grouped.length - 1].messages.push(msg);
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: "500px" }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white shrink-0">
          <div className="relative">
            <img
              src={receiverAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${receiverName}`}
              className="w-9 h-9 rounded-full object-cover bg-indigo-400"
              alt={receiverName}
            />
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-indigo-600 ${isReceiverOnline ? "bg-green-400" : "bg-slate-400"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">{receiverName}</p>
            <p className="text-xs text-indigo-200 truncate">
              {isReceiverOnline ? "Online" : "Offline"} · {taskTitle}
            </p>
          </div>
          {socketConnected
            ? <Wifi size={14} className="text-indigo-200 shrink-0" />
            : <WifiOff size={14} className="text-red-300 shrink-0" />
          }
          <button onClick={onClose} className="p-1 rounded-full hover:bg-indigo-500 transition-colors ml-1">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 bg-slate-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2">
              <span className="text-3xl">👋</span>
              <p>Say hi to {receiverName}!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {grouped.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-2 my-2">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{group.label}</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>
                  <div className="space-y-1">
                    {group.messages.map((msg) => {
                      const isMine = msg.senderId === currentUserId;
                      return (
                        <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${isMine ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white text-slate-800 rounded-bl-sm border border-slate-100"}`}>
                            <p className="break-words leading-snug">{msg.content}</p>
                            <div className={`flex items-center gap-1 mt-0.5 ${isMine ? "justify-end" : "justify-start"}`}>
                              <span className={`text-[10px] ${isMine ? "text-indigo-200" : "text-slate-400"}`}>{formatTime(msg.createdAt)}</span>
                              {isMine && (msg.isRead
                                ? <CheckCheck size={10} className="text-indigo-200" />
                                : <Check size={10} className="text-indigo-300" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="flex justify-start mt-2">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${receiverName}…`}
            maxLength={1000}
            className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !socketConnected}
            className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-indigo-700 transition-colors shrink-0"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
};