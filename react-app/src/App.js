import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import HomePage from "./components/HomePage";
import Welcome from "./components/Welcome";
import MediaContent from "./components/MediaContent";
import DoctorHome from "./components/DoctorHome";

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import DoctorAdmin from "./components/DoctorAdmin";
import NewDoctorHome from "./components/NewDoctorHome";
import DoctorChatBox from "./components/DoctorChatBox";

function App() {
  // const [user] = useAuthState(auth);

  return (
    <div className="App">
      {/* <NavBar />
  //     {!user ? (
  //       <Welcome />
  //     ) : (
  //       <>
  //         <HomePage />
  //       </>
  //     )} */}
      {/* <NavBar/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />}></Route>
          <Route exact path="/home" element={<HomePage />}></Route>
          <Route exact path="/chat" element={<ChatBox />}></Route>
          <Route exact path="/mediacontent" element={<MediaContent />}></Route>
          <Route exact path="/doctorAdmin" element={<DoctorHome />}></Route>
          <Route exact path="/doctorChatBox" element={<DoctorChatBox />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
