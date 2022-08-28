import { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Products() {

    const { oneProduct, getProducts, getProductById, isLoading, setLoading } = useContext(ProductContext)

    const { product_id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            await getProductById(product_id)
        }
        getProduct()
    }, [product_id])

    return (
        <Fragment>
            <p>Individual products</p>
            {isLoading ?

                <p>Loading</p>

                :

                <Fragment>
                    <p>{oneProduct.product?.serving_size}</p>
                    {oneProduct.variants?.length === 0 ?

                        null

                        :

                        oneProduct.variants?.map(variant => {
                            return(
                                <p>{variant.variant_id}</p>
                            )
                        })}
                </Fragment>}

        </Fragment>
    )
}