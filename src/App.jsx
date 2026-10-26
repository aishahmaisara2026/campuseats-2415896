// src/App.jsx
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import MenuItemCard from './components/MenuItemCard.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // Feature 6: Selected tags filter
  const [selectedTags, setSelectedTags] = useState([])

  // B2: Fetch vendors
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0 && !selectedVendorId) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // Cart operations
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Filter items by tags
  const filteredMenu = selectedVendor?.menu?.filter((item) =>
    selectedTags.every((t) => item.tags?.includes(t))
  ) || []

  const ALL_TAGS = ['Sweet', 'Spicy', "Chef's Recommend"]

  let content
  if (view === 'cart') {
    content = (
      <CartPage 
        cart={cart} 
        onChangeQty={handleChangeQty} 
        onRemove={handleRemove} 
        onPlaceOrder={handlePlaceOrder} 
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Thank you, <strong>{lastOrder?.name}</strong>!</p>
        <p>Pickup Mahallah: <strong>{lastOrder?.mahallah}</strong></p>
        <p>Pickup Time: <strong>{lastOrder?.pickupTime}</strong></p>
        <p>Total Paid: <strong>RM {lastOrder?.total.toFixed(2)}</strong></p>
        <button type="button" className="btn" onClick={() => setView('menu')}>Back to Menu</button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = (
      <>
        <section>
          <h2>Vendors</h2>
          <div className="grid">
            {vendors.map((v) => (
              <VendorCard 
                key={v.id} 
                vendor={v} 
                isSelected={v.id === selectedVendorId} 
                onSelect={setSelectedVendorId} 
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2>Menu - {selectedVendor.name}</h2>
            
            <MenuList
            items={selectedVendor.menu || []}
            onAdd={handleAddToCart}
          />

            {/* Feature 6: Tag Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <strong>Filter by tags:</strong>
              {ALL_TAGS.map((tag) => (
                <label key={tag} style={{ cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedTags.includes(tag)} 
                    onChange={() => toggleTag(tag)} 
                  /> {tag}
                </label>
              ))}
            </div>

            <div className="grid">
              {filteredMenu.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={handleAddToCart} />
              ))}
            </div>
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header 
        cartCount={cartCount} 
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />
      <main className="container">{content}</main>
    </>
  )
}

export default App