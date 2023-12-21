// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders/own",{credentials:'include',})
    const data = await response.json()
    resolve({data})
});
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users/own",{credentials:'include',})
    const data = await response.json()
    resolve({data})
});
}

export function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users",
    {method:'PATCH',
    credentials:'include',
    body:JSON.stringify(update),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data})
});
}


export function signOutUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/logout",{credentials:'include',})
    const data = await response.json()
    resolve({data})
   
});
}