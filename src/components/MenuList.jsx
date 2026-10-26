import MenuItemCard from './MenuItemCard'

function MenuList({ items, onAdd }) {
  if (!items || items.length === 0) {
    return <p className="empty-msg">Opening Soon!</p>
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