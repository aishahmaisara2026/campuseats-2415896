import {Link} from 'react-router'
import {useVendors} from '../hooks/useVendors'
import VendorCard from'../components/VendorCard'

export function HomePage() {
    const {vendors, loading , error, reload} = useVendors()

    if (loading) return <p className="muted">Loading vendors...</p>
    if (error) return (
        <div className="card error">
            <p>Error: {error}</p>
            <button className="btn" onClick={reload}>Retry</button>
        </div>
    )

    return (
        <div className="home-page">
            <h2>Available Vendors</h2>
            <div className="grid">
                {vendors.map((vendor) =>
                /*Wrap VendorCard in a link so when click it opens to the vendor.id at browser*/
                (<Link 
                key={vendor.id} 
                to={`/vendor/${vendor.id}`} 
                style={{ textDecoration:'none'}}
                >
                <VendorCard vendor={vendor} />
                </Link>
                ))}
            </div>
        </div>
    )
}