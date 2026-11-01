import {useCart} from '../hooks/useCart'

export function OrdersPage (){
    const {orders} =useCart()

    if (!orders || orders.length ===0 ){
        return (
            <div className="box">
                <h2>No Orders Yet</h2>
                <p>Your order history will appear here once you checkout.</p>
            </div>
        )
    }

    return (
        <div className="orders-page">
            <h2>My Orders</h2>
            {orders.map((order) => (
                <div key={order.id} className="card order-card">
                    <h3>Order ID: {order.id}</h3>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Pickup Time:</strong> {order.customer.pickupTime}</p>
                    <p><strong>Deliver to:</strong> {order.customer.name} ({order.customer.mahallah})</p>
                    <ul>
                        {order.items?.map((item) => (
                            <li key={item.id}>
                                {item.quantity}x {item.name} - RM {(item.price * item.quantity).toFixed(2)}
                                </li>
                        ))}
                    </ul>
                    <p><strong>Total:</strong> RM {order.total.toFixed(2)}</p>
                </div>
            ))}
        </div>
    )
}