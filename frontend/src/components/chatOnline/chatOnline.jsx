import axios from "axios";
import React, { useEffect } from "react";
import "./chatOnline.css";
//
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat, friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = React.useState([]);
  const [onlineFriends, setOnlineFriends] = React.useState([]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversation/find/${currentId}/${user._id}`, {
        headers: {
          token:
            "bearer " +
            JSON.parse(localStorage.getItem("user")).accesstoken,
        },
      }
      )


      if (res.data !== null) {

        setCurrentChat(res.data);
      } else {
        const newChat = await axios.post(`/conversation/`, {
          senderId: currentId,
          receiverId: user._id,
        }, {
          headers: {
            token:
              "bearer " +
              JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        });

        setCurrentChat(newChat.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/search/", {
          headers: {
            token:
              "bearer " +
              JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        });
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends);
  }, [friends]);

  return (
    <div>
      {friend?.map((o) => (

        <>
          <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={"data:image/png;base64,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"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineUsername">{o?.username}</span>
          </div>
        </>
      ))
      }
    </div >
  );
}
