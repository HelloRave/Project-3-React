import { Fragment, useContext, useEffect, useState } from "react";
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
            {
                !tokens ?

                    <p>Login please</p>

                    :

                    <div>
                        {
                            loadOrders ? 

                            <p>Loading</p>

                            :
                            
                            orders.length? 

                            <p>Display orders</p>

                            :

                            <p>No orders yet</p>
                        }
                    </div>
            }
        </Fragment>
    )
}