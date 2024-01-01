import { useLocation } from "react-router-dom";
import "./updateOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateOrder } from "../../redux/apiCalls";


export default function UpdateOrder() {

    const location = useLocation();
    const orderId = location.pathname.split("/")[2];

    const Order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId)
    );

    // Updating Order Details
    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const updatedOrderData = {
                ...inputs,
            };

            updateOrder(orderId, updatedOrderData, dispatch);
            window.alert("Order Data is Updated. See the Order table😀")
        } catch (error) {
            console.error("Error getting download URL:", error);
        }
    };


    return (
        <div className="Order">
            <div className="OrderTitleContainer">
                <h1 className="OrderTitle">Order</h1>
            </div>
            <div className="OrderBottom">
                <form className="OrderForm">
                    <div className="OrderFormLeft">
                        <label>OrderID</label>
                        <input name="_id" type="text" placeholder={Order._id} onChange={handleChange} className="inputContainer" />
                        <label>UserID</label>
                        <input name="userId" type="text" placeholder={Order.userId} onChange={handleChange} />
                        <label>Order Date</label>
                        <input name="date" type="text" placeholder={Order.date} onChange={handleChange} />
                        <label>Order Address</label>
                        <input name="address" type="text" placeholder={Order.address} onChange={handleChange} />
                        <label>Order Amount</label>
                        <input name="amount" type="text" placeholder={Order.amount} onChange={handleChange} />
                        <label>Order In Stock</label>
                        <select name="status" id="idStock" onChange={handleChange}>
                            <option value="Delivered">Delivered</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="OrderFormRight">
                        <button className="OrderButton" onClick={handleClick}>Update Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}