// src/contexts/ChatPopupContext.js
import React, { createContext, useContext, useState } from "react";

const ChatPopupContext = createContext();

export const ChatPopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen((prev) => !prev);

  return (
    <ChatPopupContext.Provider value={{ isOpen, openPopup, closePopup, togglePopup }}>
      {children}
    </ChatPopupContext.Provider>
  );
};

export const useChatPopup = () => useContext(ChatPopupContext);
