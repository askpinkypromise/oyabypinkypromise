import React, { useContext, useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import NavBar from "./NavBar";
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

const DoctorHome = () => {

    const [chats, setChats] = useState([]);
    
    useEffect(() => {
            const q = query(
                collection(db, "messages"),
                orderBy("createdAt", "desc"),
                limit(50)
            );

            const unsub = onSnapshot(q, (QuerySnapshot) => {
                const fetchedMessages = [];
                QuerySnapshot.forEach((doc) => {
                    fetchedMessages.push({ ...doc.data(), id: doc.id });
                });
                const sortedMessages = fetchedMessages.sort(
                  (a, b) => a.createdAt - b.createdAt
                );
    
                const allUids = [];
                const allChats = [];
    
                sortedMessages.forEach(async (message) => { 
                    if(!allUids.includes(message.uid)) {
                        allUids.push(message.uid);
                        const docRef = await getDoc(doc(db, "users", message.uid));
                        var chat = {
                            "uid": message.uid,
                            "name": docRef.data().displayName,
                            "text": message.text
                        }
                        allChats.push(chat);
                    }
                });

                const someChats = [...chats];
                someChats.push(...allChats);
                setChats(someChats);
            });  
      }, [chats]);    

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
}

export default DoctorHome;