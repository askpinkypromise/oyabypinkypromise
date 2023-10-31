import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useAuth } from "../AuthContext";
// import { join } from "path";

async function addMessage(text, name, avatar, uid, userId) {
  console.log("ADD MESSAGE");
  console.log(text);
  console.log(uid);
  const messagesCollection = collection(db, "messages");
  try {
    if(uid === "hSJJ5oSAKNOYPSDeITLZT1rddVA2") {
      console.log(userId);
      var to = userId;
    } else {
      var to = "doctor";
    }
    await addDoc(messagesCollection, {
      text: text,
      name: name,
      avatar: avatar,
      createdAt: serverTimestamp(),
      uid: uid,
      to: to,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    // Handle the error as needed
  }
}

const SendMessage = ({ scroll, userId, lastMessage }) => {
  const [message, setMessage] = useState("");
  const user = useAuth();
  console.log(lastMessage);


  const fetchData = async () => {
    try {
      const apiUrl = `https://oya-chat-copilot-ca265bb90486.herokuapp.com/api/response?message=${lastMessage}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setMessage(data["response"]); // Set the message from the API response
        scroll.current.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("API Request Failed:", response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle Firestore or other errors here
    }
  };

  useEffect(() => {
    // Check if the user ID matches the specified ID
    // Make the API call

    console.log(lastMessage);

    if(user.uid === "hSJJ5oSAKNOYPSDeITLZT1rddVA2") {
      fetchData();
    }

    // Set up a listener for the "messages" collection
   // fetchData();

    const messagesCollectionRef = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesCollectionRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {  
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  const sendMessage = async (event) => {
    const user = auth.currentUser;
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    try {
      await addMessage(message, displayName, "", auth.currentUser?.uid, userId);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <textarea
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        rows={10}
        cols={50}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
