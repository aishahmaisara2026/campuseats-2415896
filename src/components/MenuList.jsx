import MenuItemCard from './MenuItemCard'

function MenuList({ items, onAdd }) {
  if (!items || items.length === 0) {
    return <p>No items on this menu yet.</p>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default MenuList