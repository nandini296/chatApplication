import React from "react";
import styled from "styled-components";

export default function Button({ content }) {
  return <ButtonStyled type="submit">{content}</ButtonStyled>;
}

const ButtonStyled = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1rem;
  /* width: 65%; */
  /* height: 3rem; */
  padding:13px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 2rem;

  border-width: 4px;
    border-style: solid;
    border-top-color: #03217b;
    border-left-color: #03217b;
    border-right-color: #14163c;
    border-bottom-color: #14163c;
  &:hover{
    background: transparent;
    /* padding: 10px; */
    /* border: 3px solid linear-gradient(to right, #14163c 0%, #03217b 79%); */
    border-width: 4px;
    border-style: solid;
    border-top-color: #03217b;
    border-left-color: #03217b;
    border-right-color: #14163c;
    border-bottom-color: #14163c;
  }
`;
