import React, { useEffect, useState } from "react";
import "./index.scss";
import { GrFormClose } from "react-icons/gr";
import { RxOpenInNewWindow } from "react-icons/rx";
import { BiSolidSend } from "react-icons/bi";
import { useSocketContext } from "@/app/context/SocketContext";

interface Message {
  sender: string | null;
  message: string;
  userId: string | null;
  timestamp: string;
}

const ChatBar = () => {
  const [isChatTabOpen, setIsChatTabOpen] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { socket, user } = useSocketContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageData = {
        message,
        sender: user?.userName,
        userId: user?.userId,
        timestamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      const isSentByCurrentUser = user?.userId === messageData.userId;
      setChat((prevChat) => [
        ...prevChat,
        {
          message,
          sender: isSentByCurrentUser ? "You" : messageData.sender,
          timestamp: messageData.timestamp,
        },
      ]);
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("messageResp", (data) => {
      setChat((prevChat) => [...prevChat, data]);
      console.log(data, chat);
    });
  }, [socket]);

  return (
    <div className={`chat-tab ${isChatTabOpen ? "open-chat-tab" : ""}`}>
      <div className="chat-bar">
        <div className="chat-bar-header">
          {"Chat"}
          <button onClick={() => setIsChatTabOpen(!isChatTabOpen)}>
            <div className="chat-icons">
              <RxOpenInNewWindow />
              <GrFormClose />
            </div>
          </button>
        </div>
        <div className="chat-bar-content">
          {chat.map((msg, index) => {
            return (
              <p
                key={index}
                className={`w-100 ${msg.sender === "You" ? "msg-sender" : ""}`}
              >
                {msg.message}
              </p>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="chat-bar-footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
            placeholder="Enter message"
          />
          <button className="btn-send">
            <BiSolidSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBar;
