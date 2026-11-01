import {useParams,useSearchParams} from 'react-router'
import {useVendors} from '../hooks/useVendors'
import {useCart} from '../hooks/useCart'
import MenuList from '../components/MenuList'
import {useState} from 'react'

const ALL_TAGS = ['Spicy', 'Sweet', "Chef's Recommend"]

export function VendorPage() {
    const {id} = useParams()
    const {vendors, loading, error}= useVendors()

    const [selectedTags, setSelectedTags] = useState([])

    const {addToCart} = useCart() /*when sutomer add food to cart
     the data will be send here to be updated to the checkout form*/
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''

     if (loading) return
     <p className="muted"> Loading Menu...</p>
     if (error) return 
     <p className="card error">Error loading menu.</p>

     const vendor = vendors.find((v) => v.id === id)

     if(!vendor) {
        return (
            <div className="box">
                <h2> Vendor Not Found </h2>
                <p> We couldn't find a vendor with ID: <strong> {id} </strong>.</p>
            </div>
        )
     }

     const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
    }

    // Filter items matching selected tags
    const filteredMenu = (vendor.menu || []).filter((item) => {

        const matchSeacrh = item.name.toLowerCase().includes(q.toLowerCase())
        const matchTag= selectedTags.length === 0 || selectedTags.every((tag) =>
        item.tags?.includes(tag))

            return matchSeacrh && matchTag
    })

     const handleAddToCart = (item) => {
        addToCart(item, vendor.id, vendor.name)
     }

     return (
        <div className="vendor-page">
            <h2>{vendor.name}</h2>
            <p>{vendor.location} | {vendor.openHours}</p>
            <hr/> {/*line ------- */}

            {/* 3. Search Bar Input */}
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search menu..."
                    value={q}
                    onChange={(e) =>
                        setSearchParams(e.target.value ? { q: e.target.value } : {})
                    }
                    style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #c5cbd3',
                        width: '100%',
                        maxWidth: '300px',
                    }}
                />
            </div>

            {/*Tag filters*/}
            <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.25rem', padding: '2px', borderRadius:'4px'}}>Filter by Tags:</strong>
                {ALL_TAGS.map((tag) => (
                    <label key={tag} style={{ cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                        />{' '}
                        {tag}
                    </label>
                ))}
            </div>

            <h3>Menu</h3>

            {/*Show menu from MenuList */}
            <MenuList 
            items={filteredMenu}
            onAdd={handleAddToCart}
            isOpen={vendor.isOpen}
            />
        </div>
     )
}