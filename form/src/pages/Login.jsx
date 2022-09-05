import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Login() {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    // if (localStorage.getItem("chat-app-user")) {
    //   navigate("/");
    // }
    // console.log(localStorage.getItem("chat-app-user"));
  });

  const handleValidation = () => {
    const { password, username } = values;

    if (password === "" || username === "") {
      // console.log("Not matching!");
      toast.error("Both fields are required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      // console.log(data);

      if (data.status === false) {
        console.log("something wrong1");
        toast.error("Invalid Credentials", toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.checkUser)); // will pass the user info in local storage
        navigate("/chat");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="main-container">
    
      <MainContainer>
        <WelcomeText>Welcome Text</WelcomeText>
        <form onSubmit={(event) => handleSubmit(event)}>
          <InputContainer>
            <Inputstyled
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              placeholder="Username"
            ></Inputstyled>
            <Inputstyled
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Password"
            ></Inputstyled>
          </InputContainer>
          <ButtonContainer>
            <Button content="Sign In"></Button>
          </ButtonContainer>
        </form>
        <LoginWith>
          Don't have account?{" "}
          <NavLink to="/register" className="navlink-comp">
            Register
          </NavLink>
        </LoginWith>
        {/* <HorizontalRule></HorizontalRule> */}
      </MainContainer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* height: 60%; */
  width: 30%;
  padding: 8% 0%;
  /* padding-bottom: 19%; */
  /* padding-top: 19%; */
  /* padding: 120px; */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

  @media (max-width:1046px) {
    width: 60%;
    /* height: auto; */
  }
  @media (max-width: 868px) {
    /* flex-direction: column; */
    width: 60%;
    /* height: auto; */
  }
  @media (max-width: 768px) {
    /* font-size: 1rem; */
    /* flex-direction: column; */
    width: 70%;
    /* height: auto; */
  }
  @media (max-width:350px)
  {
    width: 100%;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const LoginWith = styled.h6`
  cursor: pointer;
  letter-spacing: 0px;
  font-size: 12px;
`;

const Inputstyled = styled.input`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 185, 0.37);
  border-radius: 2rem;
  width: 100%;
  margin-top: 1rem;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #00000099;
    font-weight: 100;
    font-size: 1rem;
  }
`;
