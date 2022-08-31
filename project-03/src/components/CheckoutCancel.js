import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutCancel() {
    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center my-4">Order Cancelled</h3>
                <p className="text-center py-3">Back to cart to checkout again or view other listings</p>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button className="continueShopping me-3">
                        <Link to='/cart' className="text-decoration-none text-reset">
                            Your Cart
                        </Link>
                    </button>
                    <button className="continueShopping">
                        <Link to='/products' className="text-decoration-none text-reset">
                            Listings
                        </Link>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}