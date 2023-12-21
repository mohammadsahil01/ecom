import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUserAsync, selectUserInfo } from "../../user/userSlice";
import { useEffect } from "react";
import { fetchLoggedInUser } from "../../user/userAPI";

function Protected({children}) {
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
        dispatch(fetchLoggedInUserAsync())}
    },[])
    const user = useSelector(selectUserInfo)
    if(!user){
        return(<Navigate to='/login' replace={true}></Navigate>)

    }
    return children;
}

export default Protected;