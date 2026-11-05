import {useNavigate} from 'react-router'
import {useCart} from '../hooks/useCart'
import { useVendors } from '../hooks/useVendors'
import CartItem from '../components/CartItem'
import CheckoutForm from '../components/CheckoutForm'

export function CartPage() {
    //Read global cart state & actions from Context
    const {cart, total,changeQty,removeFromCart,placeOrder} = useCart()
    const {vendors} = useVendors()
    const navigate = useNavigate()

    //Callback functions passed down to CheckoutForm
    const handlePlaceOrder = (formValues) => {
        placeOrder(formValues)
        navigate('/orders')
    }

    //If cart is empty
    if (cart.length === 0){
        return (
            <div className ="box">
                <h2>Cart Is Empty</h2>
                <p>Choose what you want to eat to place an order!</p>
            </div>
        )
    }

    //Transform cart array to the shape as stated in CartItem
    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-container">
            <div className="cart-items card">
                <ul className="cart-list">
                    {cart.map((item) => (
                        <CartItem 
                        key={item.id}
                        line={{ item, qty: item.quantity }}
                        onChangeQty={changeQty}
                        onRemove={removeFromCart}/>
                    ))}
                </ul>
                <h3 className="total">Total: RM {total.toFixed(2)}</h3>
            </div>
            <CheckoutForm onPlaceOrder={handlePlaceOrder}
            cart={cart}
            vendors={vendors}
            />
            </div>
        </div>
    )
}
