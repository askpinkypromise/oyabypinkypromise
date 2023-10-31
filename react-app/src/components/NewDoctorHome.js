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
import { Await } from "react-router-dom";

class NewDoctorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };

        this.buildChats = this.buildChats.bind(this);
        this.hello = this.hello.bind(this);
    }   

    async hello (sortedMessages) {
        var allChats = [];
        var allUids = [];
        for await (const message of sortedMessages) {
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
        }
        return allChats;
};

    async buildChats() {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        var sortedMessages = [];

        onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });

            sortedMessages = fetchedMessages.sort(
              (a, b) => a.createdAt - b.createdAt
            );
        });

        var allChats = [];

        allChats = await this.hello(sortedMessages);

        allChats.forEach((item) => {
            this.setState({
                chats: [...this.state.chats, item] 
            })
        })
            

            

            
            // var bar = new Promise((resolve, reject) => {
            //     sortedMessages.forEach(async (message) => { 
            //         if(!allUids.includes(message.uid)) {
            //             allUids.push(message.uid);
            //             const docRef = await getDoc(doc(db, "users", message.uid));
            //             var chat = {
            //                 "uid": message.uid,
            //                 "name": docRef.data().displayName,
            //                 "text": message.text
            //             }
            //             allChats.push(chat);
            //         }
            //     });
            //     resolve();
            // });
            
            // bar.then(() => {
            //     console.log("IN BAR FUNCTION");
            //     allChats.forEach(async (item) => {
            //         console.log("ITEM");
            //         console.log(item);
            //         this.setState({
            //             chats: [...this.state.chats, item] 
            //         })
            //     })
    
            //     for (const entry of Array.prototype.entries.call(allChats)) {
            //         console.log("ENTRY");
            //         console.log(entry);
            //     }
    
            //     if(allChats.length == 0) {
            //         console.log("EMPTY");
            //     } else {
            //         console.log("NOT EMPTY");
            //     }
    
            // });            

            // console.log("ALL CHATS");
            // console.log(allChats);

            
           
            // console.log("IN THE CHATS");
            // console.log(this.state.chats);
}


    

    componentDidMount() {
        this.buildChats();
        if(this.state.chats.length == 0) {
            this.buildChats();
        }
    }

    render() {
        return (
            <div>
                {this.state.chats}
            </div>
        );
    }
    
}

export default NewDoctorHome;