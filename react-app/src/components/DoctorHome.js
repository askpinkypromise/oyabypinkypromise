import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();
    const [chats, setChats] = useState([
        {
            "uid": "user-id",
            "name": "Feya Shah",
            "text": "Hello"
        }
    ]);
    
    // useLayoutEffect(() => {
    //         const q = query(
    //             collection(db, "messages"),
    //             orderBy("createdAt", "desc"),
    //             limit(50)
    //         );

    //         const unsub = onSnapshot(q, (QuerySnapshot) => {
    //             const fetchedMessages = [];
    //             QuerySnapshot.forEach((doc) => {
    //                 fetchedMessages.push({ ...doc.data(), id: doc.id });
    //             });
    //             const sortedMessages = fetchedMessages.sort(
    //               (a, b) => a.createdAt - b.createdAt
    //             );
    
    //             const allUids = [];
    //             const allChats = [];
    
    //             sortedMessages.forEach(async (message) => { 
    //                 if(!allUids.includes(message.uid)) {
    //                     allUids.push(message.uid);
    //                     const docRef = await getDoc(doc(db, "users", message.uid));
    //                     var chat = {
    //                         "uid": message.uid,
    //                         "name": docRef.data().displayName,
    //                         "text": message.text
    //                     }
    //                     allChats.push(chat);
    //                 }
    //             });

    //             console.log("ALL CHATS");
    //             console.log(allChats);
    //             setChats({ ...chats, allChats });
    //             console.log("IN THE CHATS");
    //             console.log(chats);
    //         });  
    //   }, []);    


    const handleClickChat = (e, uid) => {
        e.preventDefault();
        navigate("/doctorChatBox", {
            state: { 
                uid: uid,
        }});
    }

    return (
        <div>
            {<NavBar/>}
            <div className="chats">
                {chats.map((chat) => (
                    <div key={chat.uid} className="chatHome" onClick={(e) => handleClickChat(e, chat.uid)}>
                        <p className="chatName">{chat.name}</p>
                        <p className="chatText">{chat.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorHome;