import React, { useState } from "react";
import styled from "styled-components";
// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
// import Input from "./components/Input";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

export default function Register() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, cpassword, username, email } = values;
    // console.log(values);
    if (password !== cpassword) {
      // console.log("Not matching");
      toast.error(
        "Password and Confirm Password should be same!",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "username should be greater than threee characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password length should be equal or greater than 8 characters"
      );
      return false;
    } else if (email === "") {
      toast.error("Emmail is required!");
      return false;
    }

    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;

      console.log(registerRoute);
      // console.log("Validation!");

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user)); // will pass the user info in local storage
      }

      navigate("/");
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
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="Email"
        ></Inputstyled>
        <Inputstyled
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="Password"
        ></Inputstyled>
        <Inputstyled
          type="password"
          name="cpassword"
          onChange={(e) => handleChange(e)}
          placeholder="Confirm Password"
        ></Inputstyled>
      </InputContainer>
      <ButtonContainer>
        <Button content="Sign Up"></Button>
      </ButtonContainer>
      </form>
      
      <LoginWith>
        Already registered? 
        {"  "}

        <NavLink to="/login" className="navlink-comp">
          Login
        </NavLink>
      </LoginWith>
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
  /* height: 100%; */
  /* position: absolute; */
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
  margin-top:1rem ;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus{
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius:2rem;
  }
  &::placeholder{
    color: #00000099;
    font-weight: 100;
    font-size: 1rem;
    
  }
`;
