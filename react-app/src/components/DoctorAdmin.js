import { doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import {
    getDoc,
    addDoc,
    collection,
    onSnapshot,
    serverTimestamp,
  } from "firebase/firestore";
import {
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import NavBar from "./NavBar";

const DoctorAdmin = () => {
    const [chats, setChats] = useState([]);
    const user = useAuth();
    const [uids, setUids] = useState([]);
    const [chatDisplay, setChatDisplay] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [lastmessages, setLastMessages] = useState([]);        


    const buildChats = () => {
        console.log("BUILD EFFECT");
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
          );
      
          onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
              (a, b) => a.createdAt - b.createdAt
            );    

        var allChats = [];
        var allUids = [];

        console.log(allUids);

        allUids.forEach(() => allUids.pop());

        sortedMessages.forEach(async (message) => { 
            if(!allUids.includes(message.uid)) {
                allUids.push(message.uid);
                const docRef = await getDoc(doc(db, "users", message.uid));
                var chat = {
                    "uid": message.uid,
                    "name": docRef.data().displayName,
                    "text": message.text
                }
                console.log("CHAT");
                allChats.concat(chat);
            }
        });

        return allChats;
    }); 
    }


    useEffect(() => { 
        var allChats = buildChats();
        console.log("all chats in the use effect");
        console.log(allChats);
    }, []);

    // const handleClick = (e, uid) => {
    //     e.preventDefault();
    //     console.log("UID");
    //     console.log(uid);
    // }

 

  return (
    <div>
    {<NavBar/>}
    <div className="chats">
      {chats.map((chat) => (
        <div key={chat.uid} className="chatHome">
            <p className="chatName">{chat.name}</p>
            <p className="chatText">{chat.text}</p>
        </div>
      ))}
    </div>
    </div>

  );
};

export default DoctorAdmin;