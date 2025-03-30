
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Form from "../pages/Form";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/signup" element={<Form />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            
        </>
    )
)