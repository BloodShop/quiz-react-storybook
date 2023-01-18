import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatRoom from "../components/Chat/ChatRoom";
import JoinChatForm from "../components/Chat/JoinChatForm";

export default function Chat({ socket }) {
    const { user } = useSelector((state) => state.auth),
        [room, setRoom] = useState(""),
        [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <>
            {!showChat ? (
                <JoinChatForm joinRoom={joinRoom} setRoom={setRoom} />
            ) : (
                <ChatRoom
                    socket={socket}
                    username={user.fullName}
                    room={room}
                />
            )}
        </>
    );
}
