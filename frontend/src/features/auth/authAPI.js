import { isRejected } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/auth/signup",
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



export function LoginUser(loginInfo) {
try{
  return new Promise(async (resolve,reject) =>{
    const response = await fetch("/auth/login",
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

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check',
      {
        credentials:'include',
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }
  });
}