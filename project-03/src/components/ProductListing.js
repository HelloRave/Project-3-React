import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductListing() {

    const { products, isLoading } = useContext(ProductContext)

    return (
        <Fragment>
            <p>All Products</p>

            {/* Insert Search Here */}


            {/* Display All Products Here */}
            {isLoading ?

                <p>Loading</p>

                :

                products.map(product => {
                    return (
                        <Link to={'/products/' + product.product_id}>
                            <div>
                                Number: {product.product_id}
                                {product.product_name}
                            </div>
                        </Link>

                    )
                })}
        </Fragment>
    )
}