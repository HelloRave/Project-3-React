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
    const [selection, setSelection] = useState({ variant_id: "", quantity: 1 })
    const [stripeKeys, setStripeKeys] = useState({})
    const [loadCart, setLoadCart] = useState(true)

    useEffect(() => {

        const stripePromise = async () => {
            const stripe = await loadStripe(`${stripeKeys.publishableKey}`)
            stripe.redirectToCheckout({
                sessionId: stripeKeys.sessionId
            })
        }

        if (Object.keys(stripeKeys).length) {
            stripePromise()
        }
        
    }, [stripeKeys])

    useEffect(() => {
        setCart([])
        setSelection({ variant_id: "", quantity: 1 })
        context.getCart()
    }, [tokens])

    const context = {
        selection, setSelection,
        cart, setCart,
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
                    toast.error('Server Error', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    setLoadCart(false)
                }
            }
            setLoadCart(false)

        },
        addToCart: async (productName) => {
            if (tokens) {
                try {
                    await api.post(`/cart/${selection.variant_id}/add`, {
                        quantity: selection.quantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    toast.success(`${productName} added to cart!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } catch (error) {
                    if (error.response.status === 403) {
                        toast.error('Exceed stocks available!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    } else {
                        toast.error('Server Error', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                }
            } else {
                toast.error('Login to add to cart!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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
                    toast.success(`Quantity updated!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } catch (error) {
                    if (error.response.status === 403) {
                        toast.error('Exceed stocks available!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    } else {
                        toast.error('Server Error', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                }
            }
        },
        deleteCartItem: async (variantId, productName) => {
            if (tokens) {
                try {
                    await api.post(`/cart/${variantId}/delete`, {

                    },{
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    toast.success(`${productName} deleted from cart!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } catch {
                    toast.error('Server Error', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
                    toast.error('Server Error', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            } else if (tokens && cart.length == 0) {
                toast.error('No item to checkout', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else {
                toast.error('Please login to checkout!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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