function MenuItemCard({ item, onAdd }) {
  return (
    <div className="menu-item-card">
      <div className="card-header">
        <span className="category-tag">{item.category}</span>
        
        {/* Render dietary tag chips */}
        <div className="tags-container" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '4px 0' }}>
          {item.tags && item.tags.map((tag) => (
            <span 
              key={tag} 
              className="chip"
              style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '600'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {Number(item.price || 0).toFixed(2)}</p>
      
      <button 
        className="btn" 
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </div>
  )
}

export default MenuItemCard