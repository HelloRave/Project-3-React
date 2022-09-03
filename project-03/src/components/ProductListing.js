import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Loading from "./Loading";

export default function ProductListing() {

    const { products, isLoading, searchInputs, setSearchInputs, getProducts,
        brands, categories, allergens, flavours } = useContext(ProductContext)

    const updateFormField = (e) => {
        setSearchInputs({
            ...searchInputs,
            [e.target.name]: e.target.value
        })
    }

    const resetSearch = async () => {
        setSearchInputs({})
        await getProducts()
    }

    return (
        <Fragment>
            <div className="container-fluid my-4">
                <div className="row px-4 gy-4">
                    <div className="col-12 col-sm-4 col-md-3">
                        <div className="container">
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input type='text'
                                    name='product_name'
                                    value={searchInputs?.product_name || ""}
                                    onChange={updateFormField}
                                    className="form-control searchField" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Brands</label>
                                <select name='brand_id'
                                    value={searchInputs?.brand_id || ""}
                                    onChange={updateFormField}
                                    className="form-select searchField">
                                    <option value="">----------</option>
                                    {brands?.map(brand => {
                                        return (
                                            <option key={brand[0]} value={brand[0]}>{brand[1]}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Flavours</label>
                                <select name='flavour_id'
                                    value={searchInputs?.flavour_id || ""}
                                    onChange={updateFormField}
                                    className="form-select searchField">
                                    <option value="">----------</option>
                                    {flavours?.map(flavour => {
                                        return (
                                            <option key={flavour[0]} value={flavour[0]}>{flavour[1]}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Allergens - multi select */}
                            {/* Serving size and cost - slider */}

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select name='category_id'
                                    value={searchInputs?.category_id || ""}
                                    onChange={updateFormField}
                                    className="form-select searchField">
                                    <option value="">----------</option>
                                    {categories?.map(category => {
                                        return (
                                            <option key={category[0]} value={category[0]}>{category[1]}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <button onClick={resetSearch}
                                className="theme-button me-3">
                                Reset
                            </button>
                            <button onClick={() => { getProducts() }}
                                className="theme-button">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-8 col-md-9">
                        {isLoading ?

                            <Fragment>
                                <Loading />
                            </Fragment>

                            :

                            <Fragment>
                                <div className="container">
                                    <div className="row gy-4">
                                        {
                                            products.map(product => {
                                                return (
                                                    <Link to={'/products/' + product.product_id}
                                                        key={product.product_id}
                                                        className="col-12 col-sm-6 col-lg-4 text-decoration-none text-reset">
                                                        <div className="border bg-light productCard">
                                                            <div className="productImg" style={{backgroundImage:`url(${product.variants[0].product_image_url})`}}>
                                                            </div>
                                                            <div className="productDesc d-flex flex-column justify-content-center align-items-center">
                                                                <p className="text-center m-0 py-2">{product.product_name}</p>
                                                                <p className="m-0 py-2">S${product.cost / 100}</p>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}