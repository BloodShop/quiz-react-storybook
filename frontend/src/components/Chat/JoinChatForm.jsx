import React from "react";
import "./chat.css";

export default function JoinChatForm({ joinRoom, setRoom }) {
    return (
        <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            <button onClick={joinRoom}>Join A Room</button>
        </div>
    );
}
