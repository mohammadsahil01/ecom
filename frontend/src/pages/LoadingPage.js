import { useDispatch, useSelector } from "react-redux";
import Navbar from "../features/navbar/Navbar";
import { fetchLoggedInUserAsync, selectUserInfo } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function LoadingPage() {
    const dispatch = useDispatch()
    dispatch(fetchLoggedInUserAsync())
    const userInfo = useSelector(selectUserInfo)
    
    dispatch(fetchLoggedInUserAsync())
    return ( <div  >
        <Navbar>
        
        {!userInfo ? (
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
        ) : (
          <Navigate to="/" />
        )}
                </Navbar>
            </div>
     );
}

export default LoadingPage;