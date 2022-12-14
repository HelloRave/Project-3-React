import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import Loading from "./Loading";

export default function Products() {

    const { oneProduct, getProductById, isLoading, setLoading,
    } = useContext(ProductContext)

    const { selection, setSelection, addToCart, getCart } = useContext(CartContext)

    const { product_id } = useParams()

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            await setSelection({ variant_id: "", quantity: 1 })
            await getProductById(product_id)
        }

        if (product_id) {
            getProduct()
        }

    }, [product_id])

    useEffect(() => {
        setSelection({
            ...selection, quantity
        })
    }, [quantity])

    const updateSelection = (e) => {
        setSelection({
            ...selection,
            [e.target.name]: e.target.value
        })
    }

    const productStock = () => {

        if (selection.variant_id) {
            const stock = oneProduct.variants?.filter(variant => {
                return (
                    variant.variant_id == selection.variant_id
                )
            })
            return stock[0]?.stock
        }
    }

    const addSelection = async (productName) => {
        await addToCart(productName)
        await getCart()
    }

    return (
        <Fragment>

            {isLoading ?

                <div className="mt-5 pt-5">
                    <Loading />
                </div>


                :

                <Fragment>
                    {oneProduct.variants?.length === 0 ?

                        null

                        :

                        <div className="container">

                            <nav aria-label="breadcrumb" className="d-flex justify-content-center align-items-center my-3 py-2">
                                <ol className="breadcrumb my-auto">
                                    <li className="breadcrumb-item"><Link to='/products'>Products</Link></li>
                                    <li className="breadcrumb-item"><Link to='/products'>{oneProduct.product?.category.category_name}</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{oneProduct.product?.product_name}</li>
                                </ol>
                            </nav>

                            <div className="container bg-light p-4 mb-3">
                                <div className="row">
                                    <div className="col-12 col-md-6">

                                        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">

                                                {oneProduct.variants?.map((variant, index) => {
                                                    return (
                                                        <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                                            <img src={variant.product_image_url} className="d-block w-100" alt="..." />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <h3>{oneProduct.product?.product_name}</h3>
                                        <p>Brand: {oneProduct.product?.brand.brand_name}</p>
                                        <p>{oneProduct.product?.description}</p>
                                        {oneProduct.product?.allergens.length ?

                                            <p>
                                                <span className="me-2">Allergens:</span>
                                                {oneProduct.product?.allergens.map((allergen) => {
                                                    return (
                                                        <span className="badge bg-secondary me-2" key={allergen.allergen_id}>
                                                            {allergen.allergen_name}
                                                        </span>

                                                    )
                                                })}
                                            </p>

                                            :

                                            <p>
                                                Allergens: 
                                                <span className="badge bg-secondary ms-2">No allergens</span>
                                            </p>
                                        }

                                        <p className="h1 my-2 py-3 ps-2 border-top border-bottom">
                                            S${((oneProduct.product?.cost) / 100).toFixed(2)}
                                        </p>

                                        <div>
                                            <label className="form-label">Flavours</label>
                                            <select className="form-select"
                                                name='variant_id'
                                                value={selection.variant_id}
                                                onChange={updateSelection}>
                                                <option value="" disabled="disabled">-- Select an option --</option>
                                                {oneProduct.variants?.map(variant => {
                                                    return (
                                                        <option value={variant.variant_id} key={variant.variant_id}>
                                                            {variant.flavour.flavour_name}
                                                        </option>
                                                    )
                                                })}

                                            </select>

                                            {
                                                selection.variant_id ?
                                                    <p>
                                                        Available stocks: {productStock()}
                                                    </p>

                                                    :

                                                    null
                                            }

                                        </div>

                                        <div className="mt-3">
                                            <label className="form-label">Quantity</label>
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center me-3">
                                                    <button className="theme-button productQuantityInput"
                                                        disabled={!quantity || quantity == 1 || !selection.variant_id ? true : false}
                                                        onClick={() => { setQuantity(quantity - 1) }}>-</button>
                                                    <div className="productQuantity">{quantity}</div>
                                                    <button className="theme-button productQuantityInput"
                                                        disabled={!quantity || quantity == productStock() || !selection.variant_id ? true : false}
                                                        onClick={() => { setQuantity(quantity + 1) }}>+</button>
                                                </div>
                                                <button onClick={() => { addSelection(oneProduct.product?.product_name) }}
                                                    className='theme-button'>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                    }
                </Fragment>}

        </Fragment>
    )
}