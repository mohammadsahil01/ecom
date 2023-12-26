import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Cartpage from './pages/CartPage';
import CheckoutPage from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/protetcted';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedUser,selectUserChecked } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/order-success';

import UserOrderPage from './pages/OrdersPage';
import Logout from './features/auth/components/Logout';
import AdminHome from './pages/AdminHome';
import AdminProtected from './features/auth/components/protetctedAdmin';
import AdminProductDetailsPage from './pages/AdminProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import { fetchLoggedInUserAsync, selectUserInfo } from './features/user/userSlice';
import CheckoutForm from './pages/CheckoutForm';
import StripeCheckout from './pages/StripeCheckout';
import CartEmpty from './pages/CartEmpty';
import LoadingPage from './pages/LoadingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home></Home></Protected>,
  },
  {
    path: "/loading",
    element:<LoadingPage></LoadingPage>
  },
  {
    path: "/admin/home",
    element:<AdminProtected><AdminHome></AdminHome></AdminProtected>,
  },
  {
    path: "/admin/productForm",
    element:<AdminProtected><ProductFormPage></ProductFormPage></AdminProtected>,
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element:<SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element:<Protected><Cartpage></Cartpage></Protected>,
  },
  {
    path: "/checkout",
    element:<Protected><CheckoutPage></CheckoutPage></Protected>,
  },
  {
    path: "/product-detail/:id",
    element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element:<AdminProtected><AdminProductDetailsPage></AdminProductDetailsPage></AdminProtected>,
  },
  {
    path: "*",
    element:<PageNotFound></PageNotFound>
  },
  {
    path: "/order-success/:id",
    element:<Protected><OrderSuccessPage></OrderSuccessPage></Protected>
  },
  {
    path: "/ordersList",
    element:<Protected><UserOrderPage></UserOrderPage></Protected>
  },
  {
    path: "/stripe-checkout/",
    element:<Protected><StripeCheckout></StripeCheckout></Protected>
  },
  {
    path: "/empty-cart",
    element:<Protected><CartEmpty></CartEmpty></Protected>
  },
  {
    path: "/logout",
    element:<Logout></Logout>
  },
]);


function App() {
  const dispatch = useDispatch()
  const user  = useSelector(selectLoggedUser)
  const userchecked = useSelector(selectUserChecked)

 

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  

  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync())
    dispatch(fetchLoggedInUserAsync());
    }
  },[dispatch,user])

  return (
    <div className="App">
       {userchecked &&
       <RouterProvider router={router} />}
    </div>
  );
}

export default App;
