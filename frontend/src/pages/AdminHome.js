import AdminProductList from "../features/Admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";


function AdminHome() {
    return ( 
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
     );
}

export default AdminHome;
