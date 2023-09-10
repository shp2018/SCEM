import {userExist} from "./userExist";
import {getDocRef} from "./getdata"
import {updateDoc } from "@firebase/firestore";

export function passWordChange(userKey,newPassword){
    if(userExist(userKey)){
        const docRef = getDocRef(userKey)
        const pwData = {
            password: newPassword
          };
        updateDoc(docRef, pwData)
        
    }
    
    else{
        return false
    }
 
}



