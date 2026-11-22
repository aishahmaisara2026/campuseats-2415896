
import { useState } from 'react'
import {useNavigate} from 'react-router'
import {useCart} from '../hooks/useCart'
import { useVendors } from '../hooks/useVendors.js'
import CheckoutForm from '../components/CheckoutForm'
import CartItem from '../components/CartItem'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'

export function CartPage() {
    //Read global cart state & actions from Context
    const {cart, total,changeQty,removeFromCart,clearCart} = useCart()
    const {user}= useAuth()
    const {vendors} = useVendors()
    const navigate = useNavigate()
    const [error,setError] = useState('')

    //Callback functions passed down to CheckoutForm
    async function handlePlaceOrder(details) {
        setError('')
        try {
            await placeOrders(user, cart, details)
            clearCart()
            navigate('/orders')
        } catch(err) {
        setError(`Could not place the order: ${err.message}`)
        }
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
            {error && <p className="field-error" role="alert">{error}</p>}
            <CheckoutForm defaultName={user?.displayName ?? ''} 
            onPlaceOrder={handlePlaceOrder}
            cart={cart}
            vendors={vendors}
            />
            </div>
        </div>
    )
}
