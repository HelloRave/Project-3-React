import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Cart() {

    const { tokens } = useContext(UserContext)
    const { cart, setCart, 
            deleteCartItem, checkout } = useContext(CartContext)

    const calculateSubtotal = () => {
        if (cart.length) {
            const eachProductCost = cart.map(
                (cartItem) => {
                    return (cartItem.quantity * cartItem.variant?.product?.cost)
                }
            )
            const subTotal = eachProductCost.reduce(
                (previousValue, currentValue) => {
                    return (previousValue + currentValue)
                }, 0
            )

            return subTotal
        }
        return false
    }

    const onDelete = async(variantId, productName) => {
        await deleteCartItem(variantId, productName)
        setCart(
            cart.filter(cartItem => cartItem.variant_id !== variantId)
        )
    }

    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center my-4">My Shopping Cart</h3>

                {!tokens ?

                    <p className="text-center">Please log in to view or add items to your shopping cart.</p>

                    :

                    <div className="cart row">
                        {
                            cart.length ?
                                <Fragment>
                                    <div className="col-12 col-md-8">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Items</th>
                                                    <th style={{ textAlign: "center" }}>Quantity</th>
                                                    <th style={{ textAlign: "center" }}>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart.map(cartItem => {
                                                        return (
                                                            <tr>
                                                                <td className="cart-rows">{cartItem.variant?.product?.product_name}</td>
                                                                <td className="cart-rows"
                                                                    style={{ textAlign: "center" }}>
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <button className="cartItemQuantityInput">-</button>
                                                                        <div className="cartItemQuantity mx-1">{cartItem.quantity}</div>
                                                                        <button className="cartItemQuantityInput">+</button>
                                                                    </div>
                                                                </td>
                                                                <td className="cart-rows"
                                                                    style={{ textAlign: "center" }}>
                                                                    S${(cartItem.variant?.product?.cost * cartItem.quantity / 100).toFixed(2)}
                                                                </td>
                                                                <td className="cart-rows">
                                                                    <div className="d-flex justify-content-center align-items-center" 
                                                                         style={{ padding: "4px" }}
                                                                         onClick={() => {onDelete(cartItem.variant_id, cartItem.variant?.product?.product_name)}}>
                                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        {
                                            calculateSubtotal() ?

                                                <Fragment>
                                                    <div className="border px-2">
                                                        <h3 className="pt-2">Order Summary</h3>
                                                        <div className="">
                                                            <div className="d-flex justify-content-between py-2">
                                                                <span>Order Subtotal </span>
                                                                <span>S${(calculateSubtotal() / 100).toFixed(2)}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between py-2">
                                                                <span>Shipping & Handling</span>
                                                                <span>FREE</span>
                                                            </div>
                                                        </div>
                                                        <div className="py-3">
                                                            <div className="d-flex justify-content-between">
                                                                <span className="pe-2">Grand Total</span>
                                                                <span className="ps-2">S${(calculateSubtotal() / 100).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>

                                                :

                                                null
                                        }

                                        <div className="d-grid my-3">
                                            <button onClick={() => checkout()} className='checkout'>Checkout</button>
                                        </div>
                                    </div>
                                </Fragment>


                                :

                                <Fragment>
                                    <div className="col-12 d-flex justify-content-center align-items-center my-3">
                                        No Items In Cart
                                    </div>
                                    <div className="col-12 d-flex justify-content-center align-items-center">
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