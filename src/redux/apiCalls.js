import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  updateProductstart,
  updateProductsuccess,
  updateProductfailure
} from "./productRedux";

import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserstart,
  updateUsersuccess,
  updateUsersFailure
} from "./userReducer";

import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderstart,
  updateOrdersuccess,
  updateOrderfailure,
} from "./orderReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// Update Product
export const updateProducts = async (Id, inputs, dispatch) => {
  dispatch(updateProductstart());
  try {
    const res = await userRequest.put(`/product/${Id}`, inputs);
    dispatch(updateProductsuccess(Id, res.data));
  } catch (err) {
    dispatch(updateProductfailure());
  }
};


// Add Product
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// Get Users
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

// Deleting the user
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// Adding New User
export const addUser = async (inputs, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, inputs);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

// Updating New User
export const updateUser = async (Id, inputs, dispatch) => {
  dispatch(updateUserstart());
  try {
    const res = await userRequest.put(`/users/${Id}`, inputs);
    dispatch(updateUsersuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};

//GET ALL PRODUCTS
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/order");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

// Delete Order

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    await userRequest.delete(`/order/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

// Update Order

export const updateOrder = async (Id, inputs, dispatch) => {
  dispatch(updateOrderstart());
  try {
    const res = await userRequest.put(`/order/${Id}`, inputs);
    dispatch(updateOrdersuccess(Id, res.data));
  } catch (err) {
    dispatch(updateOrderfailure());
  }
};


