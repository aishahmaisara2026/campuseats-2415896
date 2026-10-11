import { useState } from 'react'
import vendors from './data/vendors'
import Header from './components/Header'
import VendorCard from './components/VendorCard'
import MenuList from './components/MenuList'
import Footer from './components/Footer'

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
  const [cart, setCart] = useState([])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item])
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <main className="container">
        <section>
          <h2>Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        <section>
          <h2>Menu: {selectedVendor ? selectedVendor.name : ''}</h2>
          <MenuList items={selectedVendor?.menu || []} onAdd={handleAddToCart} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App