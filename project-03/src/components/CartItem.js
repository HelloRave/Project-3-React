import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { CartContext } from "../context/CartContext"

export default function CartItem(props) {

    const { cart, setCart, updateCartItem, deleteCartItem, getCart } = useContext(CartContext)

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onDelete = async (variantId, productName) => {
        await deleteCartItem(variantId, productName)
        setCart(
            cart.filter(cartItem => cartItem.variant_id !== variantId)
        )
    }

    const registerHandler = async (data) => {
        // console.log(data)
        await updateCartItem(data.variantId, data.newQuantity)
        await getCart()
    }

    return (
        <tr>
            <td className="cart-rows">
                <img src={props.cartItem.variant?.product_thumbnail_url} className='img-fluid' alt='...' />
            </td>
            <td className="cart-rows">
                <p>{props.cartItem.variant?.product?.product_name}</p>
                <p>Flavour: {props.cartItem.variant?.flavour?.flavour_name}</p>
                <p>Serving Size: {props.cartItem.variant?.product?.serving_size}</p>
            </td>
            <td className="cart-rows"
                style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit(registerHandler)}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <input type='number'
                            defaultValue={props.cartItem.quantity}
                            {...register('newQuantity', {
                                required: "Key in a number",
                                valueAsNumber: true,
                                validate: {
                                    positive: value => parseInt(value) > 0
                                }
                            })}
                            className="form-control searchField w-50" />
                        <p className="error">{errors.newQuantity?.message}</p>
                        <input type='hidden'
                            defaultValue={props.cartItem.variant_id}
                            {...register('variantId')} />
                        <div className="d-grid w-50 mt-2">
                            <input type='submit' className="theme-button" value="Update" />
                        </div>
                    </div>
                </form>
            </td>
            <td className="cart-rows"
                style={{ textAlign: "center" }}>
                S${(props.cartItem.variant?.product?.cost * props.cartItem.quantity / 100).toFixed(2)}
            </td>
            <td className="cart-rows">
                <div className="d-flex justify-content-center align-items-center"
                    style={{ padding: "4px" }}
                    onClick={() => { onDelete(props.cartItem.variant_id, props.cartItem.variant?.product?.product_name) }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </td>
        </tr>
    )
}