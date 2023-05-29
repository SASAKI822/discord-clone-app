import React from "react";
import "./Login.scss";
import { Button } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
const Login = () => {
  const signIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      signInWithRedirect(auth, provider);
    });
  };
  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./discordIcon.png" alt="" />
      </div>
      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;
