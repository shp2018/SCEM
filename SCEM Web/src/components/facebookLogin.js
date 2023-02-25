import FacebookLogin from 'react-facebook-login';
const appId = "717074913221679"

function FbLogin(){
    const responseFacebook = (response) => {
        console.log(response);
      }

    return(
       
        <FacebookLogin
        appId={appId}
        fields="name,email,picture"
        callback={responseFacebook}
        textButton = "Sign In with Facebook" 
        cssClass="btnFacebook"
        icon={<img id="fblogo"src="facebooklogo.png"/>}
      />
     

    )

}
export default FbLogin;