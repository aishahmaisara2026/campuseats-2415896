import { useState } from 'react'
import vendors from './data/vendors'
import Header from './components/Header'
import VendorCard from './components/VendorCard'
import MenuList from './components/MenuList'
import Footer from './components/Footer'

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
  const [cart, setCart] = useState([])

  // Find the vendor selected by the user
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Add item to cart immutably
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item])
  }

  return (
    <>
      <Header cartCount={cart.length} />

      <main className="container">
        <section>
          <h2>Choose a vendor</h2>
          <div className="grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={(id) => setSelectedVendorId(id)}
              />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Menu: {selectedVendor ? selectedVendor.name : ''}</h2>
          <MenuList
            items={selectedVendor ? selectedVendor.menu : []}
            onAdd={handleAddToCart}
          />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App