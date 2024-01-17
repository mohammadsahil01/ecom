import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';


export default function UserOrders() {
  
  const dispatch = useDispatch();
const orders = useSelector(selectUserOrders)

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrdersAsync())
  },[dispatch])

  const ordersReverse = [...orders].reverse()

  return (
    <div>
      {ordersReverse.map((order)=> 
      (<div>
        <div className="mx-auto bg-white max-w-7xl px-4 mt-7 sm:px-6 lg:px-8 p-5">
         <h2 className="text-2xl mb-3 font-bold tracking-tight">Order #{order.id}</h2>
         <h3 className="mt-0.5 text-sm font-bold tracking-tight ">Order status: <span className='text-red-500'>{order.status}</span></h3>
                        <div className="flow-root mb-4">
                          <ul role="list" className="-my-6 divide-y divide-gray-300 bg py-8 px-3">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex py-6 ">
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
                                        <p>{item.Product.title}</p>
                                      </h3>
                                      <p className="ml-4">${item.Product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.Product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div
                                    className="text-gray-500">
                                      <label htmlFor="password" className="inline text-sm font-medium leading-6 text-gray-900">Qty:{item.quantity}
                                    </label>
                 
                                    </div>

                                 
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${order.totalAmount}</p>
                      </div>
                      <div className="flex justify-between text-base mt-3 font-medium text-gray-900">
                        <p>Total items in cart</p>
                        <p>{order.totalItems}</p>
                      </div>
                      
                     
                    </div>
              </div>
      </div>
        ))}
    </div>
  );
}
