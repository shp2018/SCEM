import {userExist} from "./userExist";
import {getData} from "./getdata"

export function passWordValidate(userKey,password){
    if(userExist(userKey)){
        const data = getData(userKey)
        if(data.password== password){
            return true
        }
        else{
            return false
    }
    }
    else{
        return false
    }
 
}



