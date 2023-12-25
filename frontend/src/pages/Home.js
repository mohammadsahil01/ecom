import { useSelector } from "react-redux";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productList/components/ProductList";
import { selectUserInfo, selectuserStatus } from "../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";



function Home() {
    const userInfo = useSelector(selectUserInfo)

    return (
        <div>
              
            <Navbar>
                
            {!userInfo &&<TailSpin
            visible={true}
            className="flex items-center justify-center h-screen"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            />}
                <ProductList></ProductList>
            </Navbar>
        </div>
     );
}

export default Home;
