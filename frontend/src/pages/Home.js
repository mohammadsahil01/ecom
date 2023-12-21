import { useSelector } from "react-redux";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productList/components/ProductList";
import { selectuserStatus } from "../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";



function Home() {
    

    return (
        <div>
              
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
     );
}

export default Home;
