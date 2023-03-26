import {userExist} from "./userExist";
import {getData} from "./getdata"

export function accountStatus(userKey){
    if(userExist(userKey)){
        const data = getData(userKey)
        if(data.status== "unlocked"){
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





// export function accountStatus(userKey){
//     const status = false
//     const pos = "users/"+userKey
//     if(userExist(userKey)){
//         //this line could need changes
//         var ref = firebase.database().ref(pos);
//         ref.once("value")
//         .then(function(snapshot) {
//           if(snapshot.child("status").val()=="unlocked"){
//             status = true

//           }
//           });
//         return status

//     }
   

// }
