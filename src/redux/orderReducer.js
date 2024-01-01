import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload;
        },
        getOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //DELETE
        deleteOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders.splice(
                state.orders.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // Update Order
        updateOrderstart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateOrdersuccess: (state, action) => {
            state.isFetching = false;
            state.orders[
                state.orders.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.order;
        },
        updateOrderfailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //Add Order
        addOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders.push(action.payload);
        },
        addOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure,
    updateOrderstart,
    updateOrdersuccess,
    updateOrderfailure,
} = OrderSlice.actions;

export default OrderSlice.reducer;