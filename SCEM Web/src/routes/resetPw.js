import React, {useState} from "react";
import '../css/resetPw.css';
import {useLocation, useNavigate} from "react-router-dom";

function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();

    let email, trueOTP;

    if (location.state != null) {
        email = location.state.email;
        trueOTP = location.state.OTP;
    }

    // eslint-disable-next-line
    const [userEmail, setUserEmail] = useState(email);
    // eslint-disable-next-line
    const [userPassword, setUserPassword] = useState('');
    const [userOTP, setUserOTP] = useState(0);

    //console.log(trueOTP);

    const checkForm = e => {
        e.preventDefault();

        if (JSON.stringify(trueOTP) === userOTP) {
            //changePassword(userEmail, userPassword);
            alert("Password change success.");
            navigate('/login');
            trueOTP = 9000000;
        } else {
            alert("OTP incorrect, please provide the correct OTP sent in your email.");
        }
    }

    return (
        <div id={"reset-page"}>
            <div id={"reset-backButton"}>
                <a href={"/forgotpassword"}
                   className={"arrow left"}>
                </a>
            </div>
            <div id={"reset-header"}>
                <h3 id={"reset-resetPasswordText"}> Reset Password </h3>
            </div>
            <p id={"reset-subtitle"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <form onSubmit={checkForm}>
                <div>
                    <input type={"text"}
                           defaultValue={email}
                           placeholder={"Email"}
                           id={"reset-emailInput"}
                           onChange={() => setUserEmail(document.getElementById("reset-emailInput").value)}
                    />
                </div>
                <div>
                    <input type={"text"}
                           placeholder={"OTP"}
                           id={"reset-otp"}
                           maxLength={"6"}
                           onChange={() => setUserOTP(document.getElementById("reset-otp").value)}
                    />

                </div>
                <div>
                    <input type={"password"}
                           placeholder={"Password"}
                           id={"reset-password"}
                           onChange={() => setUserPassword(document.getElementById("reset-password").value)}
                    />
                </div>
                <div>
                    <input type={"password"}
                           placeholder={"Confirm Password"}
                           id={"reset-confirmPassword"}/>
                </div>
                <button type={"submit"}
                        id={"reset-button"}>
                    Reset
                </button>
            </form>
        </div>

    );
}

export default ResetPassword;