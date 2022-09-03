import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutSuccess() {
    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center mb-4 mt-5">Order Confirmed</h3>
                <p className="text-center py-3">Thank you for shopping with us!</p>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button className="theme-button me-3">
                        <Link to='/products' className="text-decoration-none text-reset">
                            Continue Shopping
                        </Link>
                    </button>
                    <button className="theme-button">
                        <Link to='/orders' className="text-decoration-none text-reset">
                            View Orders
                        </Link>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}