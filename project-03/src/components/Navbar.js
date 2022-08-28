import { Fragment, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"


export default function Navbar() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const viewAccount = () => {
        if (user) {
            navigate('/profile')
        } else {
            navigate('/login')
        }
    }

    const viewCart = () => {
        if (user) {
            navigate('/cart')
        } else {
            navigate('/login')
        }
    }

    return (
        <Fragment>
            <div>
                <button onClick={viewAccount}>Accounts</button>

                <button onClick={viewCart}>Cart</button>

            </div>
        </Fragment>
    )
}