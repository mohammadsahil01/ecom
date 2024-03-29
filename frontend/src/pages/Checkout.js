import { Link, Navigate } from "react-router-dom";
import { deleteItemsFromCartAsync, selectCartItems, updateCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

function CheckoutPage() {
  const [selectedAddress,setSelectedAddress] = useState(null)
  const [paymentMethod,setPaymentMethod] = useState(null);
  
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const totalAmount = items.reduce((amount,item)=>item.Product.price*item.quantity+amount,0)
  const userInfo = useSelector(selectUserInfo)
  const [addresses,setAdresses] = useState(userInfo.Addresses)
  const currentOrder = useSelector(selectCurrentOrder)
  console.log(userInfo.Addresses)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const totalItems = items.reduce((total,item)=>
    item.quantity+total,0)

  const handleQuantity = (e,item)=>{
    dispatch(updateCartAsync({id:item.id,quantity:+e.target.value}))
  }

  const handleRemove= (e,id)=>{
    dispatch(deleteItemsFromCartAsync(id))}

  const handleAddress = (e)=>{
    console.log(e.target.value)
    setSelectedAddress(e.target.value)}  
  const handlePayment = (e)=>{
    setPaymentMethod(e.target.value)
  }

  const handleOrder = (e)=>{
    const order = {items,totalAmount,totalItems,user:userInfo.id,paymentMethod,selectedAddress,status:'pending'}
    dispatch(createOrderAsync(order))
    // T1 :redirect to order-success page
    // T2:clear cart after Order
    // T3:on server change the stock of item
  }


    return ( 
        <>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
        {!items.length>0 && <Navigate to='/' replace={true}></Navigate>}
        {currentOrder && currentOrder.paymentMethod==='cash' && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
        {currentOrder && currentOrder.paymentMethod==='Card Payment' &&  <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>}

        <div className="mx-auto max-w-6xl mt-14 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10
             lg:grid-cols-5">
                <div className="lg:col-span-3 p-5">
          <form onSubmit={handleSubmit((data)=>{
            setAdresses([...addresses,data])
            dispatch(updateUserAsync({Addresses:data}));
            toast.success("Address Added")
          })}>
            <div className="space-y-12 col">
       
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:'name is required'})}
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'email is required'})}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Phone No.
              </label>
              <div className="mt-2">
              <input
                  id="Phone"
                  {...register('Phone',{required:'Phone no. is required'})}
                  type='tel'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                Street Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('address',{required:'name is required'})}
                  id="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:'name is required'})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'state is required'})}
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
               Pin Code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:'Pin Code is required'})}
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
                       <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                              Reset
                        </button>
                        <button
                         type="submit"
                         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                          Save
                        </button>
                      </div>
        </div>

        

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from existing address.
          </p>

          <ul role="list">
      {addresses.map((address,index) => (
        
        <li key={index} className="flex justify-between gap-x-6 py-3 mb-2 px-3 border-solid border-2 border-gray-300">
          <div className="flex min-w-0 gap-x-4">
          <input
                    onChange={handleAddress}
                    name="addresses"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.city} {address.state}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {address.Phone}
              </p>
              
          </div>
        </li>
      ))}
    </ul>

    

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    type="radio"
                    onChange={handlePayment}
                    value='cash'
                    checked={paymentMethod==='cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                {/* <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    onChange={handlePayment}
                    type="radio"
                    value='Card Payment'
                    checked={paymentMethod==='Card Payment'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div> */}
              </div>
            </fieldset>
          </div>
        </div>
        </div>
                  </form>
                </div>
                <div className="lg:col-span-2 bg-white p-5 rounded-sm">
                <div className="flow-root mb-4">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.Product.images[0]}
                                    alt={item.Product.images[0]}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a>{item.Product.title}</a>
                                      </h3>
                                      <p className="ml-4">${item.Product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.Product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div
                                    className="text-gray-500">
                                      <label htmlFor="password" className="inline text-sm font-medium leading-6 text-gray-900">
                                    </label>Qty
              
                                    <select 
                                    onChange={e=>handleQuantity(e,item)} value={item.quantity}
                                    className='ml-3'>
                                      <option value='1'>1</option>
                                      <option value='2'>2</option>
                                      <option value='3'>3</option>
                                      <option value='4'>4</option>
                                    </select>
                                    </div>

                                    <div className="flex">
                                      <button
                                      onClick={e=>handleRemove(e,item.id)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total items in cart</p>
                        <p>{totalItems}</p>
                      </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Shipping Cost</p>
                        <p>$30</p>
                       </div>
                       <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Paying Amount</p>
                        <p>${totalAmount+30}</p>
                       </div>
                      
                      
                      <div className="mt-6">
                        <div 
                        onClick={handleOrder}
                        to='/pay'
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 hover:cursor-pointer"
                        >
                          Pay and Order
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to='/'>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                        
                </div>   
            </div>

            
        </div>
        </>
     );
}


export default CheckoutPage;