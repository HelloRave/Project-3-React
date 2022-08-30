import React, { Fragment, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

export default function Cart() {

    const { tokens } = useContext(UserContext)
    const { cart, checkout } = useContext(CartContext)

    const calculateSubtotal = () => {
        if (cart.length) {
            const subTotal = cart.reduce(
                (cartItem1, cartItem2) => cartItem1.variant?.product?.cost + cartItem2.variant?.product?.cost, 0
            )
            return subTotal
        }
        return false
    }

    return (
        <Fragment>
            <div className="container">
                <h3>My Shopping Cart</h3>

                {!tokens ?

                    <p>Please login to access the cart</p>

                    :

                    <div className="cart row">
                        <div className="col-12 col-md-8">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Items</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.length ? 

                                        cart.map(cartItem => {
                                            return(
                                                <tr>
                                                    <td>{cartItem.variant?.product?.product_name}</td>
                                                    <td>{cartItem.quantity}</td>
                                                    <td>S${(cartItem.variant?.product?.cost * cartItem.quantity / 100).toFixed(2)}</td>
                                                </tr>
                                            )
                                        })

                                        :

                                        <p>No Items in Cart</p>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 col-md-4">
                            {
                                calculateSubtotal() ? 

                                <p>{calculateSubtotal()}</p>

                                :

                                null
                            }
                        </div>
                    </div>
    
}
            </div>

        </Fragment>

    )
}