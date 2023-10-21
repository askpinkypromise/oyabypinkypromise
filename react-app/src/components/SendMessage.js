import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";

async function addMessage(text, name, avatar, uid) {
  const messagesCollection = collection(db, "messages");

  try {
    await addDoc(messagesCollection, {
      text: text,
      name: name,
      avatar: avatar,
      createdAt: serverTimestamp(),
      uid: uid,
    });
    console.log("Message added successfully");
  } catch (error) {
    console.error("Error adding message:", error);
    // Handle the error as needed
  }
}

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if the user ID matches the specified ID
    // Make the API call
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const apiUrl =
          "https://oya-chat-copilot-ca265bb90486.herokuapp.com/api/response?message=when will my breasts&chat_log=Initial+chatlog+content";
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data["response"]);
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

    // Set up a listener for the "messages" collection
    console.log("fetch");
    fetchData();

    const messagesCollectionRef = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesCollectionRef, (querySnapshot) => {
      // This callback will be called whenever there's a change in the "messages" collection
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // A new message was added
          fetchData(); // Call the fetch data function when a new message is added
        }
        // You can also handle "modified" and "removed" changes if needed
      });
    });

    // Remember to unsubscribe from the listener when your component unmounts
    // This will prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array, runs once on component mount

  const sendMessage = async (event) => {
    console.log("IN SEND MESSAGE FUNCTION");
    const user = auth.currentUser;
    console.log("User:", user);

    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    console.log("user", uid, displayName, photoURL);
    try {
      await addMessage(message, "Akanksha", "", auth.currentUser?.uid);
      console.log("Message added successfully");
    } catch (error) {
      console.error("Error adding message:", error);
      // Handle the error here, such as displaying an error message to the user or taking appropriate action.
    }
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
