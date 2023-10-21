import React from "react";
import Card from "react-bootstrap/Card";
import ChatBox from "./ChatBox";
import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import NavBar from "./NavBar";
import backgroundImage from "./onboarding.png";

const HomePage = () => {
  const user = useAuth();

  console.log("user", user);
  const navigate = useNavigate();

  const handleClickChat = () => {
    navigate("/chat");
  };

  const handleClickContent = () => {
    navigate("/mediacontent");
  };

  return (
    <div className="home-page">
      {<NavBar />}
      <div className="heading-home-page">
        <p>Hi, {user ? user.displayName : "Guest"}!</p>
        <p> Welcome to Oya!</p>
        <div className="image-home-page">
          <img
            src={backgroundImage}
            alt=""
            width={200}
            height={200}
            className="logo-home"
          />
        </div>
      </div>
      <p className="why-text"> Why here?</p>
      <Card
        style={{
          width: "18rem",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px",
        }}
        className="home-page-card col-md-8"
        onClick={handleClickChat}
      >
        <Card.Body className="ques-card">
          <Card.Img src={backgroundImage} alt="" width={50} height={50} />
          <Card.Text style={{ paddingLeft: "10px" }}>
            Have questions? Chat with a Counselor.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        style={{
          width: "18rem",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px",
        }}
        className="home-page-card"
        onClick={handleClickContent}
      >
        <Card.Body className="ques-card">
          <Card.Img src={backgroundImage} alt="" width={50} height={50} />
          <Card.Text style={{ paddingLeft: "10px" }}>
            Discover and Learn
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
