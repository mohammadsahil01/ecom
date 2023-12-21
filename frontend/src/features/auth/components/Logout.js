import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserAsync } from "../../user/userSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";
import { selectLoggedUser, signOutUserAuthAsync } from "../authSlice";
import Cookies from "js-cookie";

function Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectUserInfo)
    const AuthUser = useSelector(selectLoggedUser)
    useEffect(()=>{
        dispatch(signOutUserAsync())
        dispatch(signOutUserAuthAsync())
    },[dispatch])
    // but useEffect runs after render, so we have to delay navigate part
    return ( <div>
            {!user && !AuthUser &&<Navigate to='/login' replace={true}></Navigate>}
    </div> );
}

export default Logout;

