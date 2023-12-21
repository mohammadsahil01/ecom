// A mock function to mimic making an async request for data


export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart",
    {method:'POST',
    credentials:'include',
    body:JSON.stringify(item),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data})
});
}

export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart/"+update.id,
    {method:'PATCH',
    credentials:'include',
    body:JSON.stringify(update),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data})
});
}

export function deleteItemsFromCart(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart/"+itemId,
    {method:'DELETE',
    credentials:'include',
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()
    resolve({data:{id:itemId}})
});
}

export async function resetCart() {
    return new Promise(async (resolve) =>{
    const response = await fetchProductByUserId()
    const items= response.data;
    for(let item of items){
      await deleteItemsFromCart(item.id)
    }
    resolve({status:'success'})
  });
  }


export function fetchProductByUserId() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart",{
    credentials:'include'}
   )
    const data = await response.json()
    resolve({data})
});
}

