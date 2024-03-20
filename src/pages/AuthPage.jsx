import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import * as ENV_VAR from "../config/env"

import { loginDataManagerService, registerUser } from "./Utils/Service/auth";
import { Button, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function AuthPage(props) {
  const {gotoLandingPage} = props;
  let [authMode, setAuthMode] = useState("signin")
  const [cred,setCred] = useState({email:'',password:'',mobileNumber:'1234'});

  const handleCredChange = (event)=>{
    setCred((prev)=>({
      ...prev,
      [event.target.name]:event.target.value
    }))
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    loginDataManagerService(cred.username,cred.password);
    
  }

  const navigate = useNavigate();
  const [snackDetail,setSnackDetail] = useState({show:false,message:null});

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setSnackDetail({show:true})

  }
  
  // console.log("is Git hub  : "+ENV_VAR.IS_GITHUB)
  // console.log("is Localhost : "+ENV_VAR.IS_LOCALHOST)

  if (authMode === "signin") {
    return (
      <div className="container" >
      <div className="Auth-form-container" style={{border:'2px solid',borderRadius:'0.8rem',padding:'2rem',maxWidth:'25rem',margin:'auto',marginTop:'1rem',height:'100%'}}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>User Name</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="Enter User Name"
                name="username"
                onChange={handleCredChange}
                value={cred.username}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleCredChange}
                value={cred.password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
            
              <div className="d-grid gap-2 mt-3">
              <button onClick={()=>navigate(gotoLandingPage)} className="btn btn-primary" >
                Bypass Login
              </button>
              </div>
           
          </div>
        </form>
      </div>
      </div>
    )
  }

  // var navi = useNavigate();

  const handleRegisterUser = (event)=>{
    event.preventDefault();
    console.log(event.name);
    registerUser(cred).then(response=>{
      console.log(response.data);
      // navigate("http://localhost:3000/");
      setSnackDetail({
        show:true,
        message:`User Registration : ${response.data.username} Completed Successfully!`
      })
      setAuthMode("signin");
    }).catch(error=>{
      let errorMessage = error.response.data.errorMessage;
      setSnackDetail({
        show:true,
        message:errorMessage
      })
    });
  }

  const passwordMatches = cred.password===cred.confirmPassword;

  const closeSnackBar = ()=>{
    setSnackDetail((prev)=>({...prev,show:false}))
  }
  

  return (<React.Fragment>
    <Snackbar open={snackDetail.show} action={ <><IconButton onClick = {closeSnackBar} color="inherit"><Close/></IconButton></>} anchorOrigin={{vertical:'top',horizontal:'right'}} message={snackDetail.message} onClose={closeSnackBar} autoHideDuration={3000}>
    </Snackbar>
    <div className="container" >
    <div className="Auth-form-container" style={{border:'2px solid',borderRadius:'0.8rem',padding:'2rem',maxWidth:'25rem',margin:'auto',marginTop:'1rem',height:'100%'}}>
      <form className="Auth-form" onSubmit={handleRegisterUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g User Name"
              type="text"
              name="name"
              minLength={3}
              required
              onChange={handleCredChange}
              value={cred.name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
            type="email"
              name="email"
              onChange={handleCredChange}
              value={cred.email}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleCredChange}
              value={cred.password}
              className="form-control mt-1"
              placeholder="New Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleCredChange}
              value={cred.confirmPassword}
              className="form-control mt-1"
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Mobile Number</label>
            <input
              // type="tel"
              name="mobileNumber"
              pattern="^\d{10}$"
              maxLength={10}
              minLength={10}
              onChange={handleCredChange}
              value={cred.mobileNumber}
              className="form-control mt-1"
              placeholder="Mobile Number"
              title={`Mobile number ${cred.mobileNumber} should contain only the 10 digit number without spaces / couuntry code`}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" title="tet" disabled={!passwordMatches} className="btn btn-primary" >
              Register
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </div>
    </React.Fragment>
  )
}