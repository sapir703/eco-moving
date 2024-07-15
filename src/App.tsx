import React, {useState} from 'react';
import './App.css';
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import {firebaseConfig} from "./firebase/firebaseUtils";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import Navbar from "./Components/Navbar";
import { User as FirebaseUser } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const db = getFirestore(app)
  const [currentPage, setCurrentPage] = useState<string>("Deliveries") // ["Deliveries", "Complaints"
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();

  return (
      <div>
          <div className={'body'}>
          <Navbar user = {user} setUser={setUser} auth={auth} googleAuthProvider={googleAuthProvider} setCurrentPage={setCurrentPage}/>
          <Home user={user} setUser={setUser} currentPage={currentPage} auth={auth} googleAuthProvider={googleAuthProvider}/>
          </div>
        <Footer/>
      </div>
  )
}

export default App;
