import AdminProductList from "../features/Admin/components/AdminProductList";
import EmptyCard from "../features/cart/Empty";
import Navbar from "../features/navbar/Navbar";


function CartEmpty() {
    return ( 
        <div>
            <Navbar>
                <EmptyCard></EmptyCard>
            </Navbar>
        </div>
     );
}

export default CartEmpty;
