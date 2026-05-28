import { useState, useEffect, useRef } from 'react';
import Sidebar from "../../Pages/Page2/Sidebar";
import Navbar from "../../Pages/Page2/Navbar";

export default function ChatLayout() {
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');
    const [currentTopic, setCurrentTopic] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const fetchChats = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/chat/retrive", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            const chatContent = data.flatMap(chat => [
                { sender: "user", message: chat.usermessage },
                { sender: "ai", message: chat.aimessage }
            ]);
            setChats(chatContent);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    const sendChat = async () => {
        if (!input.trim()) return;

        setCurrentTopic(input);
        const userChat = { sender: "user", message: input };
        setChats((prev) => [...prev, userChat]);

        const currentChat = input;
        setInput('');

        try {
            const response = await fetch("http://localhost:8000/api/chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: currentChat, user_id: '123' })
            });

            const data = await response.json();
            const aiChat = { sender: "ai", message: data.message };
            setChats((prev) => [...prev, aiChat]);
        } catch (error) {
            console.error(error);
            setChats((prev) => [
                ...prev,
                { sender: "ai", message: "Sorry, something went wrong! Please try again." }
            ]);
        }
    };

    return (
        <div className='h-screen bg-[#0c0c0e] flex text-zinc-200 font-sans overflow-hidden'>
            <Sidebar />

            <div className='flex-1 flex flex-col min-w-0'>
                {/* Navbar Wrapper */}
                <div className='w-full border-b border-zinc-800/80 bg-[#121214]/50 backdrop-blur-sm'>
                    <Navbar />
                </div>

                {/* Main Chat Container */}
                <div className='flex-1 p-6 flex flex-col overflow-hidden max-w-5xl w-full mx-auto'>
                    
                    {/* Header */}
                    <div className='border-b border-zinc-800 pb-4 mb-2'>
                        <h2 className='text-zinc-400 text-sm font-medium uppercase tracking-wider'>
                            Memora AI Chat
                        </h2>
                        {currentTopic && (
                            <p className='text-white text-xl font-semibold mt-1 truncate'>
                                {currentTopic}
                            </p>
                        )}
                    </div>

                    {/* Chat Messages Space */}
                    <div className='flex-1 overflow-y-auto py-4 pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800'>
                        {chats.length === 0 ? (
                            /* Empty State Placeholder */
                            <div className='h-full flex flex-col items-center justify-center text-center opacity-40 px-4 mt-12'>
                                <div className='w-16 h-16 bg-[#245f3b]/20 text-[#419360] rounded-full flex items-center justify-center text-2xl mb-4 border border-[#245f3b]/30'>
                                    ✨
                                </div>
                                <h3 className='text-lg font-medium text-white mb-1'>Start a new conversation</h3>
                                <p className='text-sm max-w-sm'>Ask Memora AI anything to begin your tailored chat session.</p>
                            </div>
                        ) : (
                            chats.map((chat, index) => (
                                <div
                                    key={index} 
                                    className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`
                                        p-3.5 px-4
                                        rounded-2xl
                                        text-[15px]
                                        leading-relaxed
                                        break-words
                                        max-w-[75%]
                                        shadow-sm
                                        transition-all
                                        ${
                                            chat.sender === "user"
                                            ? "bg-[#245f3b] text-white rounded-br-none font-medium"
                                            : "bg-[#18181b] text-zinc-100 border border-zinc-800/80 rounded-bl-none"
                                        }
                                    `}>
                                        {chat.message}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input System Bar */}
                    <div className='pt-4 bg-[#0c0c0e]'>
                        <div className='flex gap-3 bg-[#141416] p-2 rounded-xl border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-all shadow-inner'>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendChat();
                                }}
                                placeholder='Ask Memora AI a question...'
                                className='flex-1 p-2 px-3 bg-transparent text-white placeholder-zinc-500 outline-none text-sm'
                            />

                            <button
                                onClick={sendChat}
                                disabled={!input.trim()}
                                className='px-5 py-2 rounded-lg bg-[#245f3b] hover:bg-[#2d7449] disabled:opacity-40 disabled:hover:bg-[#245f3b] text-white text-sm font-medium transition-all shadow-md active:scale-95'
                            >
                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}