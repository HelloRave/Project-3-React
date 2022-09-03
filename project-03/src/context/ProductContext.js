import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../api"

const ProductContext = createContext({})

function ProductProvider(props) {

    const [products, setProducts] = useState([])
    const [oneProduct, setOneProduct] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [allergens, setAllergens] = useState([])
    const [flavours, setFlavours] = useState([])
    const [searchInputs, setSearchInputs] = useState({})
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        context.getProducts();
        context.getSearchSelection()
    }, [])

    const context = {
        products, oneProduct, setOneProduct,
        isLoading, setLoading, searchInputs, setSearchInputs, 
        brands, categories, allergens, flavours,
        getSearchSelection: async() => {
            try {
                setBrands((await api.get('/products/brands')).data);
                setCategories((await api.get('/products/categories')).data);
                setAllergens((await api.get('/products/allergens')).data);
                setFlavours((await api.get('/products/flavours')).data)
            } catch (error) {
                toast.error('Server error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }         
        },
        getProducts: async() => {
            try {
                const productResponse = await api.post('/products', searchInputs)
                setProducts(productResponse.data)
                setLoading(false)
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
            setLoading(false)
        }
    }

    return (
        <ProductContext.Provider value={context}>
            {props.children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }