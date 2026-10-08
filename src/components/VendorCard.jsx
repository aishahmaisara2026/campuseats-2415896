function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vendor.id)}
      style={{
        border: isSelected ? '2px solid #046A38' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.5rem',
        textAlign: 'left',
        background: isSelected ? '#f0fff4' : '#fff',
        cursor: 'pointer',
        minWidth: '200px'
      }}
    >
      <h3>{vendor.name}</h3>
      <p>{vendor.location}</p>
      <small>{vendor.openHours}</small>
      <div>
        <span style={{ color: vendor.isOpen ? 'green' : 'red', fontWeight: 'bold' }}>
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </button>
  )
}

export default VendorCard