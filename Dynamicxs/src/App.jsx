import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProductProvider } from './ProductContext';
import Breakfast from './components/Breakfast'
import Dinner from './components/Dinner'
import Lunch from './components/Lunch'
import Snacks from './components/Snacks'
import SignIn from './login/signin.jsx'
import SignUp from './login/signup.jsx'
import Completed_Order from './staffpages/Completed_Order'
import Homepage from './staffpages/Homepage'
import Menu from './staffpages/Menu'
import Order_Details from './staffpages/Order_Details'
import Order_History from './staffpages/Order_History'
import Orders from './staffpages/Orders'
import Checkout from './userpages/checkout'
import Home from './userpages/home'
import Order from './userpages/order'
import About from './userpages/about.jsx'
import StudentService from './service/StudentService'
import Order_checking from './staffpages/Order_checking.jsx'
import OrderDetails from './staffpages/OrderDetails.jsx'
import Error401 from './errorpages/error401.jsx'
import { AuthProvider } from './AuthProvider.jsx'
import axios from "axios";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        StudentService.isAuthenticated()
    )
    const [isStudent, setIsStudent] = useState(StudentService.isStudent())
    const [isStaff, setIsStaff] = useState(StudentService.isStaff())
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
            setIsStudent(StudentService.isStudent())
            setIsStaff(StudentService.isStaff())
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    return (
        <AuthProvider>
            <BrowserRouter>
            <ProductProvider>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/error401" element={<Error401 />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/breakfast" element={<Breakfast />} />
                    <Route path="/lunch" element={<Lunch />} />
                    <Route path="/snacks" element={<Snacks />} />
                    <Route path="/dinner" element={<Dinner />} />
                    <Route
                        path="/Order_checking"
                        element={<Order_checking />}
                    ></Route>
                    <Route
                        path="/OrderDetails"
                        element={<OrderDetails />}
                    ></Route>
                    <Route path="/order_details" element={<Order_Details />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route
                        path="/completed_order"
                        element={<Completed_Order />}
                    />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order_history" element={<Order_History />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route
                        path="/Order_checking"
                        element={<Order_checking />}
                    />

                    {/*{isAuthenticated && isStudent && (
                        <>
                            <Route path="/about" element={<About />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/breakfast" element={<Breakfast />} />
                            <Route path="/lunch" element={<Lunch />} />
                            <Route path="/snacks" element={<Snacks />} />
                            <Route path="/dinner" element={<Dinner />} />
                        </>
                    )}

                    {isAuthenticated && isStaff && (
                        <>
                            <Route
                                path="/Order_checking"
                                element={<Order_checking />}
                            ></Route>
                            <Route
                                path="/OrderDetails"
                                element={<OrderDetails />}
                            ></Route>
                            <Route
                                path="/Inventory"
                                element={<Inventory />}
                            ></Route>
                            <Route
                                path="/order_details"
                                element={<Order_Details />}
                            />
                            <Route path="/orders" element={<Orders />} />
                            <Route
                                path="/completed_order"
                                element={<Completed_Order />}
                            />
                            <Route path="/menu" element={<Menu />} />
                            <Route
                                path="/order_history"
                                element={<Order_History />}
                            />
                            <Route path="/homepage" element={<Homepage />} />
                        </>
                    )}*/}
                </Routes>
                </ProductProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}
