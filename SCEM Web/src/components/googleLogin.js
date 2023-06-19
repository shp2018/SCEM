import {GoogleLogin} from 'react-google-login';
import React from "react";
import { firestore } from "../firebase";
import { doc, setDoc } from "@firebase/firestore";

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

function Glogin(){
    const onSuccess= (res)=>{
        const ref = doc(firestore,"users",res.profileObj.googleId);
      let data = {
        fullname:res.profileObj.name,
        email:res.profileObj.email,
        locked:false
      }
      try {
        setDoc(ref,data)
      } catch (e) {
        console.log(e);
      }
    }
    const onFailure= (res)=>{
        console.log("LOGIN FAILED! res: ",res)
    }
    return(

       
            <GoogleLogin
            clientId = {clientId}
            buttonText = "Sign in with Google"
            onSuccess = {onSuccess}
            onFailure = {onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn = {true}
            className="btnGoogle"
            ></GoogleLogin>

   
        


   )
}
export default Glogin;