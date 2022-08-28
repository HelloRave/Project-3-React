import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductListing() {

    const { products, setOneProduct, getProductById } = useContext(ProductContext)

    return (
        <Fragment>
            <p>All Products</p>

            {/* Insert Search Here */}


            {/* Display All Products Here */}
            {products.map(product => {
                return (
                    <Link to={'/products/' + product.product_id}>
                        <div onClick={() => {getProductById(product.product_id)}}>
                            Number: {product.product_id}
                            {product.product_name}
                        </div>
                    </Link>

                )
            })}
        </Fragment>
    )
}