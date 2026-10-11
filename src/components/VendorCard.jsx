function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button 
      type="button" 
      className={`vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vendor.id)}
    >
      <div className="thumb">{vendor.name.charAt(0)}</div>
      <h3>{vendor.name}</h3>
      <p>{vendor.location}</p>
      <p>Open: {vendor.openHours}</p>
      <span className={`status ${vendor.isOpen ? 'open' : 'closed'}`}>
        {vendor.isOpen ? 'Open now' : 'Closed'}
      </span>
    </button>
  )
}

export default VendorCard