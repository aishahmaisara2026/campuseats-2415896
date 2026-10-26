function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <div 
      className={`vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vendor.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="thumb">{vendor.name.charAt(0)}</div>

      <div className="vendor-info" style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{vendor.name}</h3>
        <p style={{ margin: '0.2rem 0' }}>{vendor.location}</p>
        <p className="muted"> Open: {vendor.openHours}</p>
      </div>

      <span className={`status ${vendor.isOpen ? 'open' : 'closed'}`}>
        {vendor.isOpen ? 'Open now' : 'Closed'}
      </span>
    </div>
  )
}

export default VendorCard