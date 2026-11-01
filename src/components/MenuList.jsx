import MenuItemCard from './MenuItemCard'

function MenuList({ items, onAdd, isOpen = true}) {

  if (!isOpen) {
    return (
      <div className="card" style={{padding:'2rem',textAlign: 'center' }}>
        <h3 style={{margin:'0 0 0.5rem', color:'#0f172a'}}>Opening Soon! </h3>
        <p className="muted">This vendor is currently closed. Please check back later!</p>
      </div>
    )
  }
  if (!items || items.length === 0) {
    return (
    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>The Food Is Unavailable!</h3>
        <p className="muted">No food menu matched your selected tag filters.</p>
    </div>
    )
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default MenuList