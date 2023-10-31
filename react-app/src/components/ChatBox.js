import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import NavBar from "./NavBar";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const user = useAuth();
  console.log("user uid", user.uid);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        if(doc.data().uid === user.uid || doc.data().to === user.uid) {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        }
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      {<NavBar />}
      <div className="messages-wrapper" style={{ paddingTop: "60px" }}>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      
      <div>
        <span ref={scroll}></span>
      <SendMessage scroll={scroll} userId={user.uid}/>
      </div>
    </main>
  );
};

export default ChatBox;
