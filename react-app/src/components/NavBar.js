import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import logoImage from './logo.png';

const NavBar = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="nav-bar">
      <img src={logoImage} alt="" width={80} height={40} className="image-logo-nav"/>
    </div>
  );
};

export default NavBar;