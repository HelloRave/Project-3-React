import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "react-toastify"

const CartContext = createContext({})

function CartProvider(props) {

    const { tokens } = useContext(UserContext)
    const navigate = useNavigate()

    const [cart, setCart] = useState([])
    const [selection, setSelection] = useState({ variant_id: "", quantity: "" })
    const [stripeKeys, setStripeKeys] = useState({})
    const [loadCart, setLoadCart] = useState(true)

    useEffect(() => {

        const stripePromise = async () => {
            const stripe = await loadStripe(`${stripeKeys.publishableKey}`)
            console.log(stripe)
            stripe.redirectToCheckout({
                sessionId: stripeKeys.sessionId
            })
        }
        stripePromise()

    }, [stripeKeys])

    const context = {
        selection, setSelection,
        getCart: async () => {
            setLoadCart(true)
            if (tokens) {
                try {
                    const cartResponse = await api.get('/cart', {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    setCart(cartResponse.data)
                    setLoadCart(false)
                } catch {
                    alert('Server error')
                    toast.error()
                    setLoadCart(false)
                }
            }
            setLoadCart(false)

        },
        addToCart: async () => {
            if (tokens) {
                try {
                    await api.post(`/cart/${selection.variant_id}/add`, {
                        quantity: selection.quantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    navigate('/cart')
                } catch (error) {
                    if (error.response.status === 403) {
                        alert('Exceed stock available')
                    } else {
                        alert('Server error')
                    }
                }
            } else {
                alert('Login to add to cart')
                navigate('/login')
            }

        },
        updateCartItem: async (variantId, newQuantity) => {
            if (tokens) {
                try {
                    await api.post(`/cart/${variantId}/update/quantity`, {
                        newQuantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                } catch (error) {
                    if (error.response.status === 403) {
                        alert('Exceed stock available')
                    } else {
                        alert('Server error')
                    }
                }
            }
        },
        deleteCartItem: async (variantId) => {
            if (tokens) {
                try {
                    await api.post(`/cart/${variantId}/delete`, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                } catch {
                    alert('Server error')
                }
            }
        },
        checkout: async () => {
            if (tokens && cart.length !== 0) {
                try {
                    const checkoutResponse = await api.get('/checkout', {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    setStripeKeys(checkoutResponse.data)
                } catch (error) {
                    alert('Server error')
                }
            } else if (tokens && cart.length == 0) {
                alert('No item to checkout')
            } else {
                alert('Please login to checkout')
                navigate('/login')
            }
        }
    }

    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }