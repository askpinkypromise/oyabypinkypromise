import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NavBar from "./NavBar";

const FirestoreData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "content")); // Replace with your Firestore collection name
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div
      style={{
        backgroundColor: "#FFD6D6",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {<NavBar />}

      <div style={{ marginTop: "50px" }}>
        <input
          type="text"
          placeholder="What would you like to learn about?"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        />
      </div>
      <h2 style={{ marginTop: "30px", fontSize: "24px" }}>Curated for you</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div>
          <div style={{ overflowY: "auto", maxHeight: "500px", width: "100%" }}>
            {videoIds.map((videoId) => (
              <div key={videoId} style={{ marginBottom: "16px" }}>
                <iframe
                  title={`YouTube Video ${videoId}`}
                  src={`https://www.youtube.com/embed/${videoId}`}
                  style={{
                    border: "0",
                    height: "315px",
                    width: "560px",
                    maxWidth: "100%",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: "30px", fontSize: "24px" }}>
        Browse By category
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "15px",
            backgroundColor: "#FFB3B3",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Puberty
        </button>
        <button
          style={{
            padding: "15px",
            backgroundColor: "#FFB3B3",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Periods
        </button>
        <button
          style={{
            padding: "15px",
            backgroundColor: "#FFB3B3",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Acne
        </button>
        <button
          style={{
            padding: "15px",
            backgroundColor: "#FFB3B3",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Periods
        </button>
      </div>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      ></footer>
    </div>
  );
};

export default FirestoreData;
