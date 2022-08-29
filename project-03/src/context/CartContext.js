import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "react-toastify"

const CartContext = createContext({})

function CartProvider(props) {

    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    const [cart, setCart] = useState([])
    const [selection, setSelection] = useState({ variant_id: "", quantity: "" })
    const [stripeKeys, setStripeKeys] = useState({})
    const [loadCart, setLoadCart] = useState(true)

    useEffect(() => {
        const stripe = loadStripe(`${stripeKeys.publishableKey}`)
        // stripe.redirectToCheckout({
        //     sessionId: stripeKeys.sessionId
        // })
    }, [stripeKeys])

    const context = {
        selection, setSelection,
        getCart: async() => {
            setLoadCart(true)
            if (token) {
                try {
                    const cartResponse = await api.get('/cart', {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
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
        addToCart: async() => {
            if (token) {
                try {
                    await api.post(`/cart/${selection.variant_id}/add`, {
                        quantity: selection.quantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    })
                } catch(error) {
                    if (error.response.status === 403) {
                        alert('Exceed stock available')
                    } else {
                        alert('Server error')
                    }
                }
            } else {
                alert('Login to add to cart')
            }
            
        },
        updateCartItem: async(variantId, newQuantity) => {
            if (token) {
                try {   
                    await api.post(`/cart/${variantId}/update/quantity`, {
                        newQuantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    })
                } catch(error) {
                    if (error.response.status === 403) {
                        alert('Exceed stock available')
                    } else {
                        alert('Server error')
                    }
                }
            }
        },
        deleteCartItem: async(variantId) => {
            if (token) {
                try {
                    await api.post(`/cart/${variantId}/delete`, {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    })
                } catch {
                    alert('Server error')
                }
            }
        },
        checkout: async() => {
            if (token && cart.length !== 0) {
                try {
                    const checkoutResponse = await api.get('/checkout', {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    })
                    setStripeKeys(checkoutResponse.data)
                } catch (error) {
                    alert('Server error')
                }
            } else if (token && cart.length == 0) {
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