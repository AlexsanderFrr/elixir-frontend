import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import '../css/Chatbot.css';
import { useChatPopup } from '../contexts/ChatPopupContext';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Olá! Sou o assistente virtual da Elixir Natural. Como posso te ajudar hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const { closePopup } = useChatPopup();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setChatLog((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-elixir.onrender.com/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await response.json();
      const botMessage = {
        sender: 'bot',
        text: data.resposta || 'Desculpe, não tenho uma resposta para isso no momento.',
      };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      setChatLog((prev) => [...prev, {
        sender: 'bot',
        text: 'Desculpe, houve um erro ao tentar obter a resposta.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="chatbot-header">
        <h3>Assistente Virtual</h3>
        <div className="chatbot-controls">
          <button 
            className="expand-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Reduzir" : "Expandir"}
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
          </button>
          <button className="close-btn" onClick={closePopup} title="Fechar">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {chatLog.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <strong>{msg.sender === 'user' ? 'Você' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;