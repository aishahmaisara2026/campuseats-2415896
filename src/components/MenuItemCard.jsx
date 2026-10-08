import { useState } from 'react'

function MenuItemCard({ item, onAdd, lastDigitFeature }) {
  // Digit 3 (Favourite items) state example:
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
      <span style={{ background: '#e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
        {item.category}
      </span>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p><strong>RM {item.price.toFixed(2)}</strong></p>
      
      {/* Optional Digit 3 Heart button */}
      <button type="button" onClick={() => setIsLiked(!isLiked)} style={{ marginRight: '0.5rem' }}>
        {isLiked ? '♥' : '♡'}
      </button>

      <button type="button" onClick={() => onAdd(item)}>
        Add to cart
      </button>
    </div>
  )
}

export default MenuItemCard