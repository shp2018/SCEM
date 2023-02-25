import {GoogleLogin} from 'react-google-login';

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

function Glogin(){
    const onSuccess= (res)=>{
        console.log("LOGIN SUCCESS! Current user: ",res.profileObj)
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