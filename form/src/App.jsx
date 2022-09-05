import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// npm i socket.io-client    = it's a library which allows socket.io to connect to react.js
