// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/products",{
      credentials:'include',
    })
    const data = await response.json()
    resolve({data})
});
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/products/"+id,
    {credentials:'include',}
    )
    const data = await response.json()
    resolve({data})
});
}


export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/categories",
    {credentials:'include',})
    const data = await response.json()
    resolve({data})
});
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/brands",{credentials:'include',})
    const data = await response.json()
    resolve({data})
});
}

export function fetchProductsByFilters(filter,sort,pagination) {
  //filter = {category:["smartphone","laptop"]}
  //sort = {_sort:"price",_order:"desc"}
  let queryString='';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length>0){
    const lastCategoryValue = categoryValues[categoryValues.length-1]
    queryString+=`${key}=${lastCategoryValue}&`
    }
  }

  for (let key in sort){
    queryString+= `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString+= `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    const response = await fetch("/products?"+queryString,
    {credentials:'include',}
    )
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:+totalItems}})
});
}
