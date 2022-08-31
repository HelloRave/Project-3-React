import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { UserContext } from "../context/UserContext";

export default function Orders() {

    const { tokens } = useContext(UserContext)
    const [pendingOrders, setPendingOrders] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])
    const [loadOrders, setLoadOrders] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            if (tokens) {
                const orderResponse = await api.get('/orders', {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                setPendingOrders(orderResponse.data.filter(order => {
                    return (order.status.status_name !== "Completed")
                }))
                setCompletedOrders(orderResponse.data.filter(order => {
                    return (order.status.status_name === "Completed")
                }))
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

                        <Fragment>
                            {
                                loadOrders ?

                                    <p>Loading</p>

                                    :

                                    pendingOrders.length || completedOrders.length ?

                                        <Fragment>
                                            <div className="">
                                                {/* Pending Orders */}
                                                <div className="border p-3">
                                                    <h3 className="mb-3">Pending Order(s)</h3>
                                                    <div>
                                                        {
                                                            !pendingOrders.length ?

                                                                <p>No pending orders</p>

                                                                :

                                                                pendingOrders?.map(order => {
                                                                    return (
                                                                        <Fragment key={order.order_id}>
                                                                            <div className="card mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row mb-4">
                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Order ID: </span><br />
                                                                                            {order.order_id}
                                                                                        </div>
                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Shipping Address: </span><br />
                                                                                            {order.address.address_line_1}<br />
                                                                                            {order.address.address_line_2 ? <span className="d-block">{order.address.address_line_2}</span> : null}
                                                                                            {order.address.country} {order.address.postal_code}<br />
                                                                                            {order.address.state ? <span className="d-block">{order.address.state}</span> : null}
                                                                                            {order.address.city ? <span className="d-block">{order.address.city}</span> : null}
                                                                                        </div>
                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Payment Ref.: </span><br />
                                                                                            {order.payment_ref}
                                                                                        </div>
                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Order Date:</span><br />
                                                                                            {order.order_date.slice(0, 10)}
                                                                                        </div>
                                                                                        <div className="col-md-2">
                                                                                            <span className='text-muted'>Total Cost:</span><br />
                                                                                            {(order.total_cost / 100).toFixed(2)}
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                                    {
                                                                                        order.orderItems.map(orderItem => {
                                                                                            return (
                                                                                                <Fragment key={orderItem.order_id}>
                                                                                                    <div className="row my-3 justify-content-between align-items-center">
                                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                                            <img src={orderItem.variant.product_image_url} className='img-fluid' alt="..." />
                                                                                                        </div>
                                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                                            <p className="mb-0">
                                                                                                                <Link className="text-dark" to={'/products/' + orderItem.variant.product_id}>{orderItem.variant.product.product_name}</Link>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                                            <span className="text-muted">Serving Size: </span>{orderItem.variant.product.serving_size}<br />
                                                                                                            <span className="text-muted">Flavour: </span>{orderItem.variant.flavour.flavour_name}<br />
                                                                                                            <span className="text-muted">Cost: </span>SGD {(orderItem.variant.product.cost / 100).toFixed(2)}
                                                                                                        </div>
                                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                                            <p className="mb-0"><span className='text-muted'>Qty: </span>{orderItem.quantity}</p>
                                                                                                        </div>
                                                                                                        <div className="col-md-2">
                                                                                                            <p className="mb-0"><span className='text-muted'>Subtotal: </span> {(orderItem.variant.product.cost * orderItem.quantity / 100).toFixed(2)}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Fragment>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                                    <p>Status: {order.status.status_name}</p>
                                                                                </div>
                                                                            </div>
                                                                        </Fragment>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>

                                                {/* Completed Orders */}
                                                <div className="border p-3 my-5">
                                                    <h3 className="mb-3">Completed Order(s)</h3>
                                                    <div>
                                                        {
                                                            !completedOrders.length ?

                                                                <p>No completed orders</p>

                                                                :

                                                                completedOrders?.map(order => {
                                                                    return (
                                                                        <Fragment key={order.order_id}>
                                                                            <div className="card mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row mb-4">
                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Order ID: </span><br />
                                                                                            {order.order_id}
                                                                                        </div>
                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Shipping Address: </span><br />
                                                                                            {order.address.address_line_1}<br />
                                                                                            {order.address.address_line_2 ? <span className="d-block">{order.address.address_line_2}</span> : null}
                                                                                            {order.address.country} {order.address.postal_code}<br />
                                                                                            {order.address.state ? <span className="d-block">{order.address.state}</span> : null}
                                                                                            {order.address.city ? <span className="d-block">{order.address.city}</span> : null}
                                                                                        </div>
                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Payment Ref.: </span><br />
                                                                                            {order.payment_ref}
                                                                                        </div>
                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                            <span className='text-muted'>Order Date:</span><br />
                                                                                            {order.order_date.slice(0, 10)}
                                                                                        </div>
                                                                                        <div className="col-md-2">
                                                                                            <span className='text-muted'>Total Cost:</span><br />
                                                                                            {(order.total_cost / 100).toFixed(2)}
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                                    {
                                                                                        order.orderItems.map(orderItem => {
                                                                                            return (
                                                                                                <Fragment key={orderItem.order_id}>
                                                                                                    <div className="row my-3 justify-content-between align-items-center">
                                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                                            <img src={orderItem.variant.product_image_url} className='img-fluid' alt="..." />
                                                                                                        </div>
                                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                                            <p className="mb-0">
                                                                                                                <Link className="text-dark" to={'/products/' + orderItem.variant.product_id}>{orderItem.variant.product.product_name}</Link>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        <div className="col-md-3 mb-2 mb-md-0">
                                                                                                            <span className="text-muted">Serving Size: </span>{orderItem.variant.product.serving_size}<br />
                                                                                                            <span className="text-muted">Flavour: </span>{orderItem.variant.flavour.flavour_name}<br />
                                                                                                            <span className="text-muted">Cost: </span>SGD {(orderItem.variant.product.cost / 100).toFixed(2)}
                                                                                                        </div>
                                                                                                        <div className="col-md-2 mb-2 mb-md-0">
                                                                                                            <p className="mb-0"><span className='text-muted'>Qty: </span>{orderItem.quantity}</p>
                                                                                                        </div>
                                                                                                        <div className="col-md-2">
                                                                                                            <p className="mb-0"><span className='text-muted'>Subtotal: </span> {(orderItem.variant.product.cost * orderItem.quantity / 100).toFixed(2)}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Fragment>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                                    <p>Status: {order.status.status_name}</p>
                                                                                </div>
                                                                            </div>
                                                                        </Fragment>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>


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
                        </Fragment>

                }
            </div>
        </Fragment>
    )
}