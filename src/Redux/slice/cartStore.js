import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../slice/productSlice"
import wishlistSlice from "./wishlistSlice"
import cartSlice from "./cartSlice"




const cartStore = configureStore({
    reducer: {
        productSlice,
        wishlistSlice,
        cartReducer:cartSlice
       
    }
})


export default cartStore