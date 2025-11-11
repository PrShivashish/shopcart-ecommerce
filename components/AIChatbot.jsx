// gocart-main/components/AIChatbot.jsx
'use client'
import { useState, useRef, useEffect } from 'react';
import { BotIcon, SendIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! I\'m GoCart AI. Ask me about our best headphones, smart watches, or other gadgets!' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [messages, isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage }),
            });

            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Error: Failed to connect to the AI service.' }]);
            } else {
                // Inject HTML link using regex replacement for demonstration purposes
                const productLinkText = data.response.replace(
                    /(Product ID:\s*(\w+))/g,
                    (match, p1, p2) => `${p1} (<a href="/product/${p2}" target="_blank" class="text-green-400 hover:underline">View Product</a>)`
                );
                setMessages(prev => [...prev, { sender: 'bot', text: productLinkText, html: true }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to the server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const BotMessage = ({ text, html }) => (
        <div className="flex items-start space-x-2">
            <BotIcon size={18} className="text-green-500 flex-shrink-0" />
            <div className="bg-slate-100 p-3 rounded-lg max-w-[80%]">
                {html ? <div className="text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: text }} /> : <p className="text-sm text-slate-700">{text}</p>}
            </div>
        </div>
    );

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-50"
            >
                <BotIcon size={24} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border border-slate-300 rounded-lg shadow-2xl flex flex-col z-50">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <BotIcon size={20} className="text-green-600" /> GoCart AI
                        </h3>
                        <button onClick={() => setIsOpen(false)}><XIcon size={20} className="text-slate-500" /></button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'user' ? (
                                    <div className="bg-green-600 text-white p-3 rounded-lg max-w-[80%] text-sm">{msg.text}</div>
                                ) : (
                                    <BotMessage text={msg.text} html={msg.html} />
                                )}
                            </div>
                        ))}
                        {isLoading && <p className="text-xs text-slate-400 text-center">AI is typing...</p>}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-slate-200 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about products..."
                            disabled={isLoading}
                            className="flex-1 border border-slate-300 rounded-l-md p-2 outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-green-600 text-white p-2.5 rounded-r-md hover:bg-green-700 disabled:bg-slate-400 transition"
                        >
                            <SendIcon size={18} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AIChatbot;