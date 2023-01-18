import React, { useEffect, useRef, useState } from "react";
import "./chat.css";

export default function ChatRoom({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState(""),
        [messageList, setMessageList] = useState([]),
        dummy = useRef();

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            dummy.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <main className="chat-body">
                <div className="message-container">
                    {messageList.map((messageContent) => (
                        <div
                            className="message"
                            id={
                                username === messageContent.author
                                    ? "you"
                                    : "other"
                            }
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={dummy}></div>
                </div>
            </main>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}
