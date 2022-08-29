import { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";

export default function Products() {

    const { oneProduct, getProducts, getProductById, isLoading, setLoading,
         } = useContext(ProductContext)

    const { selection, setSelection } = useContext(CartContext)

    const { product_id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            await getProductById(product_id)
        }
        getProduct()
    }, [product_id])

    const updateSelection = (e) => {
        setSelection({
            ...selection,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>

            {isLoading ?

                <p>Loading</p>

                :

                <Fragment>
                    {oneProduct.variants?.length === 0 ?

                        null

                        :

                        <div className="container">

                            <nav aria-label="breadcrumb" className="d-flex justify-content-center align-items-center border my-3 py-2">
                                <ol className="breadcrumb my-auto">
                                    <li className="breadcrumb-item"><a href="/products">Products</a></li>
                                    <li className="breadcrumb-item"><a href="/products">{oneProduct.product?.category.category_name}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{oneProduct.product?.product_name}</li>
                                </ol>
                            </nav>

                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-6">

                                        <div id="productCarousel" className="carousel slide border" data-bs-ride="carousel">
                                            <div className="carousel-inner">

                                                {oneProduct.variants?.map((variant, index) => {
                                                    return (
                                                        <div className={index == 0 ? "carousel-item active" : "carousel-item"}>
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

                                    <div className="col-12 col-md-6 border">
                                        <h3>{oneProduct.product?.product_name}</h3>
                                        <p>{oneProduct.product?.brand.brand_name}</p>
                                        <p>{oneProduct.product?.description}</p>
                                        {oneProduct.product?.allergens.length ?

                                            oneProduct.product?.allergens.map((allergen) => {
                                                return (
                                                    <span class="badge bg-secondary">{allergen.allergen_name}</span>
                                                )
                                            })

                                            :

                                            <span class="badge bg-secondary">No allergens</span>}

                                        <p>S${((oneProduct.product?.cost) / 100).toFixed(2)}</p>

                                        <div>
                                            <label className="form-label">Flavours</label>
                                            <select className="form-select"
                                                name='variant_id'
                                                value={selection.variant_id}
                                                onChange={updateSelection}>
                                                <option value="" disabled="disabled">-- Select an option --</option>
                                                {oneProduct.variants?.map(variant => {
                                                    return (
                                                        <option value={variant.variant_id}>
                                                            {variant.flavour.flavour_name}
                                                        </option>
                                                    )
                                                })}

                                            </select>
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