import {useLocalStorage} from '../hooks/useLocalStorage'
import {CartContext} from './cart-context'

export function CartProvider ({children}) {
    const [cart, setCart] = useLocalStorage ('campuseats-cart', [])
    const [orders, setOrders] = useLocalStorage ('campuseats-orders',[])

    const count =cart.reduce ((sum,item) => sum + item.quantity, 0)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const addToCart = (item, vendorId, vendorName) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((i) => i.id ===item.id)
            if (existingIndex > -1) {
                const updated = [...prevCart]
                updated[existingIndex].quantity +=1
                return updated
            } else {
                return [...prevCart, {...item, quantity:1, vendorId, vendorName}]
            }
        })
    }

        const changeQty = (itemId, delta) => {
            setCart ((prevCart) =>
            prevCart.map((item) => {
                if (item.id == itemId) {
                    const newQty = item.quantity +delta
                    return newQty > 0 ? {...item, quantity: newQty } : null
                }
                return item
            })
        .filter(Boolean) //remove all empty slots marked as null so only active food remain on the CartItem
        )
        }
        const removeFromCart = (itemId) => {
            setCart((prevCart) => prevCart.filter((item) => item.id !== itemId)) //keep every dish whose ID is not = deleted ID
        }

        const placeOrder = (orderDetails) => {
            if (cart.length === 0) return null

            const newOrder = {
                id: 'ORD-${Date.now()}',
                date: new Date().toISOString(),
                items: [...cart], //food that has been add by customer
                total: total,
                customer: orderDetails, // name,mahallah,time
                status: 'Preparing',
            }

            setOrders((prevOrders)=> [newOrder, ...prevOrders])
            setCart([]) // to clear cart after checkout
            return newOrder.id
        }

        const value = {
            cart, //the list of food that customer has order
            orders,
            count, // the number of food in the order
            total,
            addToCart,
            changeQty,
            removeFromCart,
            placeOrder,
        }

        return <CartContext.Provider value = {value} >{children}</CartContext.Provider>
}
