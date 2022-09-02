import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { Facebook, Instagram, Github, Linkedin } from "react-bootstrap-icons"
import { CartContext } from "../context/CartContext"

export default function Navbar() {

    const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)

    return (
        <Fragment>
            <nav>
                <div className="d-flex justify-content-center justify-content-md-end align-items-center p-2 mb-2 navbar">
                    {
                        user ?

                            <Link to='/profile' className="text-decoration-none text-reset navbar-text">
                                <div className="me-3">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="ms-1">Profile</span>
                                </div>
                            </Link>


                            :

                            <Link to='/login' className="text-decoration-none text-reset navbar-text">
                                <div className="me-3">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="ms-1">Login/Register</span>
                                </div>
                            </Link>
                    }

                    <Link to='/cart' className="text-decoration-none text-reset navbar-text">
                        <div className="me-4">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="ms-1">Cart ({cart.length})</span>
                        </div>
                    </Link>

                </div>

                <div className="d-flex justify-content-center d-md-none my-2">
                    <div className="mx-2"><Facebook /></div>
                    <div className="mx-2"><Instagram /></div>
                    <div className="mx-2"><Github /></div>
                    <div className="mx-2"><Linkedin /></div>
                </div>

                <div className="d-flex justify-content-center align-items-center my-3">
                    <Link to='/' style={{ textAlign: "center" }} className='mx-auto text-decoration-none text-reset'>
                        <h1 id="logo">Ripped</h1>
                    </Link>
                    <div style={{ right: "26px" }} className='d-none d-md-block position-absolute'>
                        <Facebook className="mx-2" />
                        <Instagram className="mx-2" />
                        <Github className="mx-2" />
                        <Linkedin className="mx-2" />
                    </div>
                </div>

                <div className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-4">
                                    <Link to='/' className="nav-link text-decoration-none text-reset text-center navbar-text">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item mx-4">
                                    <Link to='/products' className="nav-link text-decoration-none text-reset text-center navbar-text">
                                        All Products
                                    </Link>
                                </li>
                                <li className="nav-item mx-4">
                                    <Link to='/orders' className="nav-link text-decoration-none text-reset text-center navbar-text">
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </Fragment>
    )
}