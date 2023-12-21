import { isRejected } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/auth/signup",
    {method:'POST',
    credentials:'include',
    body:JSON.stringify(userData),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data})
});
}

export function signOutUser() {
  return new Promise(async (resolve) =>{
    
    resolve({data:'success'})
});
}

export function checkUser(loginInfo) {
try{
  return new Promise(async (resolve,reject) =>{
    const response = await fetch("http://localhost:8080/auth/login",
    {method:'POST',
    credentials:'include',
    body:JSON.stringify(loginInfo),
    headers:{'content-type':'application/json'}
    })
    
    if(response.ok){
      const data = await response.json()
      resolve({data})
    }else{
      const err = await response.json()
      reject({err})
    }
    
});
}catch(err){
    console.log(err)
}
}

