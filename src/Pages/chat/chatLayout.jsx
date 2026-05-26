import { useState } from 'react';
import Sidebar from "../../Pages/Page2/Sidebar";
import Navbar from "../../Pages/Page2/Navbar";
// import Logo from "../../logo";

export default function ChatLayout() {

    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');
    const [currentTopic, setCurrentTopic] = useState("");

    const sendChat = async () => {

        if (!input.trim()) return;
          setCurrentTopic(input);

        const userChat = {
            sender: 'user',
            message: input
        };

     
        setChats((prev) => [...prev, userChat]);

        const currentChat = input;
        setInput('');

        try {
            const response = await fetch(
                'http://localhost:8000/api/chat/send',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: currentChat,
                        user_id: '123'
                    })
                }
            );

            const data = await response.json();
            console.log(data);

            const aiChat = {
                sender: 'ai',
                message: data.message
            };

            setChats((prev) => [...prev, aiChat]);

        } catch (error) {
            console.error(error);

            setChats((prev) => [
                ...prev,
                {
                    sender: 'ai',
                    message: 'Sorry, something went wrong!'
                }
            ]);
        }
    };

    return (
        <div className='h-screen bg-[#121212] flex'>
            <Sidebar />

            <div className='flex-1 flex flex-col'>

                <div className='w-full border-b border-gray-800'>
                    <Navbar />
                </div>

                <div className='flex-1 p-4 flex flex-col overflow-hidden'>

                    <h2 className='text-white text-2xl border-b border-gray-600 pb-3'>
                        Memora AI Chat:
                        <br />
                        {currentTopic}
                    </h2>

                    
                    <div className='flex-1 overflow-y-auto py-4 px-2 space-y-4'>

                        {chats.map((chat, index) => (
                            <div
                                key={index} className=
                                {`
                                max-w-[70%]
                                p-3
                                rounded-xl
                                text-white
                                wrap-break-words
                                max-w-[75%]
                            
                                ${
                                    chat.sender === "user"
                                    ? "bg-[#245f3b] ml-auto"
                                    : "bg-[#1e1e1e]"
                                }
                                `}
                            >
                                {chat.message}
                            </div>
                        ))}

                    </div>

                  
                    <div className='border-t
                     border-gray-800 pt-4 flex gap-3'>

                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendChat();
                                }
                            }}
                            placeholder='write your question...'
                            className='
                            flex-1
                            p-3
                            rounded-lg
                            bg-[#1e1e1e]
                            text-white
                            border
                            border-gray-700
                            outline-none'
                        />

                        <button
                            onClick={sendChat}
                            className='
                            px-5
                            rounded-lg
                            bg-[#245f3b]
                            hover:bg-[#419360]
                            text-white'
                        >
                            Send
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}