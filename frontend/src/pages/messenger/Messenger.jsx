import { React, useContext, useState, useEffect, useRef } from "react";
import "./messenger.css";

import Conversation from "../../components/conversations/conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/chatOnline";
import { AuthContext } from "../../components/context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, SetCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();



  const getFriends = async () => {
    try {
      const res = await axios.get(`/users/search/${JSON.parse(localStorage.getItem("user"))._id}/${newSearch}`, {
        headers: {
          token:
            "bearer " +
            JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      });
      setFriends(res.data);
      setNewSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", JSON.parse(localStorage.getItem("user"))._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id, {
          headers: {
            token:
              "bearer " +
              JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        });
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat?._id, {
          headers: {
            token:
              "bearer " +
              JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      conversationId: currentChat._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find((m) => m !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/message", message, {
        headers: {
          token:
            "bearer " +
            JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>

      <div className="messenger">
        <div className="chatmenu">
          <div className="chatmenuWrapper">

            {
              conversation.map((c, i) => (
                <div onClick={() => SetCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} key={i} friends={friends} />
                </div>
              ))
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user?._id}
                        key={i}

                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Send Message "
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitbutto" onClick={handleSubmit}>
                    Send
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start conversation.{" "}
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <input placeholder="Search for friend" className="chatMenuInput" onChange={(e) => setNewSearch(e.target.value)} value={newSearch} />
            <button className="chatMenuButton" onClick={getFriends}>Search</button>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={SetCurrentChat}
              friend={friends}
            />
          </div>
        </div>
      </div>
    </>
  );
}
