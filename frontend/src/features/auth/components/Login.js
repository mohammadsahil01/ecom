import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoggedUser,
  loginUserAsync,
  selectErrors,
  selectUserStatus,
} from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TailSpin } from 'react-loader-spinner';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectErrors);
  const user = useSelector(selectLoggedUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const userStatus = useSelector(selectUserStatus);

  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center content-center px-6 py-12 lg:px-8">
        {userStatus ? (
          <div className='flex flex-col items-center justify-center'>
            <TailSpin
              visible={true}
              className="flex items-center justify-center h-screen"
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div>Signing In</div>
          </div>
        ) : (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6 sm:ml-2"
                onSubmit={handleSubmit((data, event) => {
                  event.preventDefault();
                  dispatch(loginUserAsync({ email: data.email, password: data.password }));
              
                })}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", { required: 'email is required' })}
                      type="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2 ">
                    <input
                      id="password"
                      {...register("password", { required: 'password is required' })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    <p className='text-red-500'>{error?.message}</p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Create an Account
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
