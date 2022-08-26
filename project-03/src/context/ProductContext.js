import { createContext, useState } from "react"
import { toast } from "react-toastify"
import api from "../api"

const ProductContext = createContext({})

function ProductProvider(props) {

    const [products, setProducts] = useState([])
    const [searchInputs, setSearchInputs] = useState({})

    const context = {
        getProducts: async() => {
            try {
                const productResponse = await api.post('/products', searchInputs)
                setProducts(productResponse.data)
            } catch {
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