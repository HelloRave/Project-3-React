import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { UserContext } from "../context/UserContext";

export default function Orders() {

    const { tokens } = useContext(UserContext)
    const [orders, setOrders] = useState([])
    const [loadOrders, setLoadOrders] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            if (tokens) {
                const orderResponse = await api.get('/orders', {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                setOrders(orderResponse.data)
                setLoadOrders(false)
            }
        }
        getOrders()
    }, [tokens])

    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center my-4">My Orders</h3>
                {
                    !tokens ?

                        <Fragment>
                            <p className="text-center py-3">Please log in to view your orders.</p>
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <button className="continueShopping me-3">
                                    <Link to='/login' className="text-decoration-none text-reset">
                                        Login
                                    </Link>
                                </button>
                                <button className="continueShopping">
                                    <Link to='/register' className="text-decoration-none text-reset">
                                        Register
                                    </Link>
                                </button>
                            </div>
                        </Fragment>

                        :

                        <div>
                            {
                                loadOrders ?

                                    <p>Loading</p>

                                    :

                                    orders.length ?

                                        <p>Display orders</p>

                                        :

                                        <Fragment>
                                            <div className="col-12 d-flex justify-content-center align-items-center my-3">
                                                No Orders Yet
                                            </div>
                                            <div className="col-12 d-flex justify-content-center align-items-center my-3">
                                                <button className="continueShopping">
                                                    <Link to='/products' className="text-decoration-none text-reset">
                                                        Continue Shopping
                                                    </Link>
                                                </button>
                                            </div>
                                        </Fragment>
                            }
                        </div>
                }
            </div>
        </Fragment>
    )
}