import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductListing() {

    const { products, isLoading, searchInputs, setSearchInputs, getProducts } = useContext(ProductContext)

    const updateFormField = (e) => {
        setSearchInputs({
            ...searchInputs,
            [e.target.name]: e.target.value
        })
    }

    const resetSearch = async() => {
        await setSearchInputs({})
        await getProducts() // have to click button twice why? 
    }

    return (
        <Fragment>
            <p>All Products</p>

            {/* Insert Search Here */}
            <h3>Search Form</h3>

            <div>
                <label>Product Name</label>
                <input type='text'
                       name='product_name'
                       value={searchInputs?.product_name || ""}
                       onChange={updateFormField} />
            </div>

            <button onClick={resetSearch}>Reset</button>
            <button onClick={() => {getProducts()}}>Search</button>

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