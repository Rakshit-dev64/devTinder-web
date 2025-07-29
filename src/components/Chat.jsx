import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Chat = () => {
  const { otherUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + otherUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        profileURL: msg?.senderId?.profileURL,
        text: msg?.text,
      };  
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user || !otherUserId) return; // dont create connection if i dont have users
    const socket = createSocketConnection();
    // as soon as page is loaded, the socket connection is made and joinchat event is emmited
    socket.emit("joinchat", {
      firstName: user.firstName,
      profileURL: user.profileURL,
      userId,
      otherUserId,
    }); // if you want to use user._id then You need to give the key a proper name -> userId : user._id

    socket.on("messageRecieved", ({ firstName, text, profileURL }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, profileURL, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, otherUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendmessage", {
      firstName: user.firstName,
      profileURL: user.profileURL,
      userId,
      otherUserId,
      text: newMessage,
    });
    setNewMessage(" ");
  };

  if (!user) return;
  return (
    <div className="flex flex-col items-center mt-8 px-4 text-white font-medium tracking-wide animate-fadeIn">
      <div className="w-full max-w-4xl mx-auto shadow-2xl shadow-black/50 h-[85vh] flex flex-col rounded-3xl border border-gray-700 overflow-hidden list-item-modern">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-bold text-2xl text-white flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Messages
          </h1>
        </div>
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent animate-fadeIn">
        {messages.map((msg, index) => {
          const isCurrentUser = user.firstName === msg.firstName;
          return (
            <div 
              key={index} 
              className={`flex items-center gap-3 animate-fadeIn ${
                isCurrentUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-600 transition-all duration-300">
                  <img
                    alt={`${msg.firstName}'s avatar`}
                    src={msg.profileURL}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Message Content */}
              <div className={`max-w-xs lg:max-w-md ${
                isCurrentUser ? 'text-right' : 'text-left'
              }`}>
                {/* Name and Time */}
                <div className={`flex items-center gap-2 mb-1 ${
                  isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <span className="text-sm font-medium text-gray-300">
                    {msg.firstName}
                  </span>
                  <time className="text-xs text-gray-500">12:45</time>
                </div>
                
                {/* Message Bubble */}
                <div className={`inline-block px-4 py-2 rounded-2xl max-w-full break-words shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  isCurrentUser 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
                
                {/* Delivery Status */}
                <div className={`text-xs text-gray-500 mt-1 ${
                  isCurrentUser ? 'text-right' : 'text-left'
                }`}>
                  Delivered
                </div>
              </div>
            </div>
          );
        })}
        </div>
        
        {/* Input Area */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                className="w-full bg-gray-700 text-white rounded-full px-6 py-3 pl-4 pr-12 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01" />
                </svg>
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:scale-95 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;