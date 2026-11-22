import {Link,useParams,useSearchParams} from 'react-router'
import {useVendor} from '../hooks/useVendor.js'
import {useCart} from '../hooks/useCart.js'
import MenuList from '../components/MenuList'
import {Loading, ErrorMessage} from '../components/Status.jsx'

const ALL_TAGS = ['Spicy', 'Sweet', "Chef's Recommend"]

export function VendorPage() {
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const {addToCart} = useCart() /*when customer add food to cart
     the data will be send here to be updated to the checkout form*/

    const q = searchParams.get('q') || ''
    const rawTags = searchParams.get('tags')
    const selectedTags = rawTags ? rawTags.split(',') :[]

    const {vendor, menu, loading, error}= useVendor(id, selectedTags)

    function handleSearchChange(e) {
    const nextParams = new URLSearchParams(searchParams)
    if (e.target.value) {
      nextParams.set('q', e.target.value)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams)
    }

    function toggleTag(tag) {
        const updated = selectedTags.includes(tag) ? selectedTags.filter((t) =>
        t !== tag) : [...selectedTags, tag]

        const nextParams = new URLSearchParams (searchParams)
        if (updated.length > 0) {
            nextParams.set('tags', updated.join(','))
        } else{
            nextParams.delete('tags')
        }
        setSearchParams(nextParams)
    }

    if(loading) return <Loading/>
    if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()}/>
    if(!vendor){
        return(<p>
            Vendor Not Found. <Link to="/">Back to vendors</Link>
        </p>)
    }

    const filteredMenu = menu
    .filter((item) => item.name.toLowerCase().includes(q.toLowerCase()))
    .map((item) => ({
      ...item,
      vendorId: vendor.id,
      vendorName: vendor.name,
    }))
    
     const handleAddToCart = (item) => {
        addToCart(item, vendor.id, vendor.name)
     }

     return (
        <div className="vendor-page">
            <p> <Link to="/">← All Vendors</Link></p>
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

export default VendorPage