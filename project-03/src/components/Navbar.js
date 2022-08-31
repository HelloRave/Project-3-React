import { Fragment, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"


export default function Navbar() {

    const { user } = useContext(UserContext)
    const { getCart } = useContext(CartContext)
    const navigate = useNavigate()

    const viewAccount = () => {
        if (user) {
            navigate('/profile')
        } else {
            navigate('/login')
        }
    }

    const viewCart = async () => {
        navigate('/cart')
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active text-decoration-none text-reset" aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products' className="nav-link text-decoration-none text-reset">
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <button onClick={viewAccount}>Accounts</button>

                <button onClick={viewCart}>Cart</button>

                <button onClick={() => { navigate('/orders') }}>Orders</button>

            </div>
        </Fragment>
    )
}