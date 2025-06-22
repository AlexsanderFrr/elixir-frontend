// src/components/GlobalChatPopup.js
import React, { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { useChatPopup } from "../contexts/ChatPopupContext";
import ChatBot from "../pages/ChatBot";

const GlobalChatPopup = () => {
  const { isOpen, closePopup } = useChatPopup();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[49">
      <div
        className={`relative bg-white shadow-xl rounded-2xl border flex flex-col transition-all duration-300
          ${isExpanded ? "w-[600px] h-[500px]" : "w-[320px] h-[300px]"}`}
      >
        <div className="flex-1 overflow-auto p-3">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default GlobalChatPopup;
