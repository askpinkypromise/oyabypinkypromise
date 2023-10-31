import React, { useEffect, useRef, useState } from "react";
import {useLocation} from 'react-router-dom';
import Message from "./Message";
import SendMessage from "./SendMessage";
import {
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import {
    getDoc,
    addDoc,
    collection,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import NavBar from "./NavBar";
import { useAuth } from "../AuthContext";

const DoctorChatBox = () => {

    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    const location = useLocation();
    const user = useAuth();

    useEffect(() => {

        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc")
        );
      
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
              if(doc.data().uid === location.state.uid || (doc.data().uid === "hSJJ5oSAKNOYPSDeITLZT1rddVA2" && doc.data().to === location.state.uid)) {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
              }
            });
            const sortedMessages = fetchedMessages.sort(
              (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
          })
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
        <SendMessage scroll={scroll} userId={location.state.uid} lastMessage={messages[0]}/>
        </div>
        </main>
    );
}

export default DoctorChatBox;