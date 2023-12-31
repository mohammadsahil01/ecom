// A mock function to mimic making an async request for data
export function CreateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/orders",
    {method:'POST',
    credentials:'include',
    body:JSON.stringify(order),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data})
});
}
