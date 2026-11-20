import {useParams,useSearchParams} from 'react-router'
import {useVendors} from '../hooks/useVendors'
import {useCart} from '../hooks/useCart'
import MenuList from '../components/MenuList'
import {useState} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
import {useAuth} from '../hooks/useAuth'

const ALL_TAGS = ['Spicy', 'Sweet', "Chef's Recommend"]

export function VendorPage() {
    const {id} = useParams()
    const {vendors, loading, error}= useVendors()

    const {user} = useAuth() /*Get the current sign in user*/
    const [guestTags, setGuestTags] = useState([]) 
    /*Guest data save in memory only not in local storage */
    const [saveUserTags, setSaveUserTags] = useLocalStorage
    ( user ? `ce-diet-${user.uid}`:`ce-diet-guest`,[])

    const {addToCart} = useCart() /*when customer add food to cart
     the data will be send here to be updated to the checkout form*/
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''

    /* to save the tags for login user and unsave for guest*/
    const selectedTags = user ? saveUserTags : guestTags
    const setSelectedTags = user ? setSaveUserTags : setGuestTags

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
        setSelectedTags((prev) => prev.includes(tag) ?
        prev.filter((t) => t !== tag) : [...prev,tag])
     }
        
    //to update the seacrh bar so that it show the food that user look
    const handleSearchChange = (e) => {
        const val = e.target.value
        setSearchParams(val ? {q: val}:{})
    }

    // Filter items matching selected tags or search Bar
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
                    onChange={handleSearchChange
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