
import {getData} from "./getdata"


export function userExist(userKey){
    let exists = false
    const data = getData(userKey)
    if(data!== undefined) {
        exists = true
    }
    return exists
  

}

