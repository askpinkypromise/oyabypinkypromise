import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState hook
import backgroundImage from "./onboarding.png";

const Welcome = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const googleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful sign-in
        const user = userCredential.user;
        if(user.uid === "hSJJ5oSAKNOYPSDeITLZT1rddVA2") {
          navigate("/doctorAdmin");
        }
        else {
          navigate("/home");
        }
      })
      .catch((error) => {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Sign-in failed: ${errorCode} - ${errorMessage}`);
        // You can display an error message to the user or perform other error handling here.
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = username; // Get the email from the username input
    const pass = password; // Get the password from the password input

    console.log(email);
    console.log(pass);
    // Call the emailSignIn function with the captured email and password
    googleSignIn(email, pass);
  };

  return (
    <main className="welcome">
      <h2 className="heading">Oya By Pinky Promise</h2>
      <img src={backgroundImage} alt="" width={200} height={300} />
      <div className="getstarted">
        <h2 className="started">Get Started</h2>
        <form onSubmit={handleSubmit} className="formUserName">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username here"
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "8px", margin: "4px 0" }} // Adjust height, padding, and margin
            />
          </div>
          <div
            className="form-group"
            style={{
              height: "90px",
              marginTop: "50px",
            }}
          >
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", margin: "4px 0" }}
            />
          </div>
          <input type="submit" className="new-button" value="Get Started" />
        </form>
      </div>
      {/* Display error message if there is an error */}
      {error && <p className="error-message">{error}</p>}
    </main>
  );
};

export default Welcome;
