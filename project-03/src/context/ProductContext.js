import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../api"

const ProductContext = createContext({})

function ProductProvider(props) {

    const [products, setProducts] = useState([])
    const [oneProduct, setOneProduct] = useState([])
    const [searchInputs, setSearchInputs] = useState({})

    useEffect(() => {
        context.getProducts();
        context.getProductById()
    }, [])

    const context = {
        products, oneProduct, setOneProduct, 
        getProducts: async() => {
            try {
                const productResponse = await api.post('/products', searchInputs)
                setProducts(productResponse.data)
            } catch (error) {
                toast.error()
            }
        },
        getProductById: async(productId) => {
            try {
                const productResponse = await api.get(`/products/${productId}/variants`)
                setOneProduct(productResponse.data)
            } catch (error) {
                toast.error()
            }
        }
    }

    return (
        <ProductContext.Provider value={context}>
            {props.children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }