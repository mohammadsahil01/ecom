import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productList/components/ProductList";
import UserOrders from "../features/user/components/UserOrders";


function UserOrderPage() {
    return ( 
        <div>
            <Navbar>
            <UserOrders></UserOrders>
            </Navbar>
        </div>
     );
}

export default UserOrderPage;
