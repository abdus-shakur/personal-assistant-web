import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/family_2.json";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FamilyTreePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();
  function launchPage(){
    navigate('/family-tree-content')
  }
  return (
    <div style={{ position: "relative" }}>
      <Lottie
        options={defaultOptions}
        style={{
          position: "relative",
          zindex: "0",
          height: "90vh",
          width: "90vw",
        }}
      ></Lottie>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "30%",
          minWidth: "25rem",
          right: 0,
          top: 0,
          border: "1px solid grey",
        }}
      >
        <div class="login-form">
          <span>
            <h1>Login</h1>
          </span>
          <div>
            <TextField label="Username"></TextField>
            <TextField label="Password"></TextField>
          </div>
          <Button onClick={()=>launchPage()}>Login</Button>
        </div>
      </div>
    </div>
  );
}
