import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import socketIoClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Chat.css";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom"
let socket;
let i = 0;
export default function Chat() {
  let navigate = useNavigate();
  // Checking if the user is logged in or not
  useEffect(() => {
    // if user is not loggedin he won't be able to use the chat app
    if (localStorage.getItem("chat-app-user") === null) {

      navigate("/register");
    }
   
  },[]);
  const ENDPOINT = "http://localhost:5000";
  let username = "me";
  if(localStorage.getItem("chat-app-user") !== null)
  {

    var val = localStorage.getItem("chat-app-user");
    var object = JSON.parse(val);
    console.log(object.username);
    username = object.username;
  }
  // let username = "me";
  console.log(localStorage.getItem("chat-app-user"));
  useEffect(() => {
    // console.log(localStorage.getItem("chat-app-user"));
    socket = socketIoClient(ENDPOINT);
    console.log(socket);
  }, []);

  // Get user name
  // let username = "me";
  const [messageList, setMessageList] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // this object contain all the information and we send this object to the socket server
      const messageData = {
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getHours(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prevlist) => [...prevlist, messageData]);
      setCurrentMessage("");
    }
  };

  // it will listen to any message they receive and we are  going to emit those messages from our backend
  // basciallly it receive any other message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Data we are going to send from our backend to our frontent

      setMessageList((prevlist) => [...prevlist, data]);
      socket.emit("receive", data);
      // console.log(data);
    });
  }, []);

  return (
    <>
      <div className="main-container">
      {/* LOGOUT */}
      <div class="btn" id="button-3">
        <div id="circle"></div>
        <a
        
          onClick={() => {
            localStorage.removeItem("chat-app-user");
            navigate("/login");
          }}
        >
          LOGOUT
        </a>
      </div>

      <ChatSection>
        <Logo>
          <h1>Sup!</h1>
        </Logo>

        <MessageArea>
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      {messageContent.message !== "" ? (
                        <>
                          <div className="message-content">
                            <p>{messageContent.message}</p>
                          </div>
                          <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              }
            })}
          </ScrollToBottom>
        </MessageArea>
        <div className="chat-bottom">
          <TextArea
            id="textarea"
            type="text"
            value={currentMessage}
            placeholder="Write a Message"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          ></TextArea>
          <button onClick={sendMessage}>
            {" "}
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </button>
        </div>
      </ChatSection>
      </div>
    </>
  );
}

const ChatSection = styled.section`
  width: 50%;
  max-width: 90%;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) 0 4px 6px -2px
    rgba(0, 0, 0, 0.05);
    @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 868px) {
    width: 80%;
  }
`;
const Logo = styled.div`
  padding: 20px;
  width: 100%;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-transform: uppercase;
    font-size: 20px;
    color: #444;
    margin-left: 10px;
  }
`; //  brand
const MessageArea = styled.div`
  height: 500px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 40px;
`;
const TextArea = styled.input`
  width: 100%;
  border: none;
  padding: 20px;
  font-size: 16px;
  outline: none;

  background: #fbfbfb;
`;
