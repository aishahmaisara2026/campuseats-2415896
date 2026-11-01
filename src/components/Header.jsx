import {NavLink} from 'react-router'
import {useCart} from '../hooks/useCart' //so the cart number can be updated

export function Header() {

  const{count} = useCart() //when user add food the cart will increase its no.


  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <NavLink to ="/" end className ={({ isActive }) => 
        (isActive? 'active':'')}>Vendors</NavLink>
        <NavLink to ="/orders" end className ={({ isActive }) => 
        (isActive? 'active':'')}>My Orders</NavLink>
        <NavLink to ="/cart" end className ={({ isActive }) => 
        (isActive? 'active':'')}>
          Cart {count > 0 && <span className="badge">{count}</span>}
        </NavLink>
      </nav>
    </header>
  )
}