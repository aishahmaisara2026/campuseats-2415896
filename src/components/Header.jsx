function Header( {cardCount }) {
    return (
        <header style={{ display:'flex', justifyContent: 'space-between', padding: '1rem', background: '#046A38', color: '#fff'}}>
            <h1>CampusEats</h1>

            <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span>Vendors</span>
                <span>My Orders</span>
                <span style={{ background: '#024022', padding: '0.3rem 0.6rem', borderRadius: '12px'}}>
                    Cart <strong>{cartCount}</strong>

                </span>
            </nav>
        </header>
    )
}

export default Header