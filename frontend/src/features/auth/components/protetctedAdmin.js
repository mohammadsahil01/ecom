import { useSelector } from "react-redux";
import { selectLoggedUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function AdminProtected({children}) {
    const user = useSelector(selectLoggedUser)
    if(!user){
        return(<Navigate to='/login' replace={true}></Navigate>)

    }
    // if(userInfo && userInfo.role!=='admin'){
    //     return(<Navigate to='/' replace={true}></Navigate>)

    // }
    return children;
}

export default AdminProtected;