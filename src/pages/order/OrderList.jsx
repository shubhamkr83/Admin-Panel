import React, { useEffect } from "react";
import "./orderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";

const OrderList = (props) => {

    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.orders);
    console.log(order);

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch])

    const handleDelete = (id) => {
        deleteOrder(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "OrderID", width: 200 },
        {
            field: "userId",
            headerName: "UserID",
            width: 200,
        },
        { field: "address", headerName: "Address", width: 200 },
        {
            field: "amount",
            headerName: "Amount",
            width: 90,
        },
        {
            field: "date",
            headerName: "Delivery Date",
            width: 100,
            // valueGetter: (params) => format(params.row.date),
        },
        {
            field: "action",
            headerName: "Action",
            width: 220,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/order/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <button className="productListEdit">{params.row.status}</button>
                    </>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 50,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={order}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    )
};

export default OrderList;
