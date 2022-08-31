import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductListing() {

    const { products, isLoading, searchInputs, setSearchInputs, getProducts,
            brands, categories, allergens, flavours } = useContext(ProductContext)

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

            <div>
                <label>Brands</label>
                <select name='brand_id'
                        value={searchInputs?.brand_id || ""}
                        onChange={updateFormField}>
                    <option value="">----------</option>
                    {brands?.map(brand => {
                        return(
                            <option key={brand[0]} value={brand[0]}>{brand[1]}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label>Flavours</label>
                <select name='flavour_id'
                        value={searchInputs?.flavour_id || ""}
                        onChange={updateFormField}>
                    <option value="">----------</option>
                    {flavours?.map(flavour => {
                        return(
                            <option key={flavour[0]} value={flavour[0]}>{flavour[1]}</option>
                        )
                    })}
                </select>
            </div>

            {/* Allergens - multi select */}
            {/* Serving size and cost - slider */}

            <div>
                <label>Category</label>
                <select name='category_id'
                        value={searchInputs?.category_id || ""}
                        onChange={updateFormField}>
                    <option value="">----------</option>
                    {categories?.map(category => {
                        return(
                            <option key={category[0]} value={category[0]}>{category[1]}</option>
                        )
                    })}
                </select>
            </div>

            <button onClick={resetSearch}>Reset</button>
            <button onClick={() => {getProducts()}}>Search</button>

            {/* Display All Products Here */}
            {isLoading ?

                <p>Loading</p>

                :

                products.map(product => {
                    return (
                        <Link to={'/products/' + product.product_id} key={product.product_id}>
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