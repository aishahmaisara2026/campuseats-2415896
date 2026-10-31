import {useContext} from 'react'
import {CartContext} from '../context/cart-context'

export function useCart(){
    const context = useContext(CartContext)
    if(!context) {
        throw new error ('useCart must be used within a CartProvider')
    }
    return context
}