import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Homepage from "./pages/homepage/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import OrderList from "./pages/order/OrderList";
import UpdateOrder from "./pages/updateOrder/UpdateOrder";





function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {admin && (
          <React.Fragment>
            <Route path="/" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><Homepage /></div></React.Fragment>} />
            <Route path="/users" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><UserList /></div></React.Fragment>} />
            <Route path="/users/:userId" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><User /></div></React.Fragment>} />
            <Route path="/newUser" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><NewUser /></div></React.Fragment>} />
            <Route path="/product" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><ProductList /></div></React.Fragment>} />
            <Route path="/product/:productId" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><Product /></div></React.Fragment>} />
            <Route path="/newProduct" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><NewProduct /></div></React.Fragment>} />
            <Route path="/order" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><OrderList /></div></React.Fragment>} />
            <Route path="/order/:orderId" element={<React.Fragment><Topbar /><div className="container"><Sidebar /><UpdateOrder /></div></React.Fragment>} />
          </React.Fragment>

        )}
      </Routes>
    </Router>
  );
}



export default App;
