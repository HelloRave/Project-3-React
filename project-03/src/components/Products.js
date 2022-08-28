import { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Products() {

    const { oneProduct, getProducts, getProductById } = useContext(ProductContext)

    const { product_id } = useParams()

    useEffect(() => {
        const getProduct = async() => {
            await getProductById(product_id)
        }
        getProduct()
    }, [product_id])

    return (
        <Fragment>
            <p>Individual products</p>
            {/* {oneProduct.variants[0].variant_id} */}
        </Fragment>
    )
}