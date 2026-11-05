import { useState } from 'react'

const MAHALLAHS = ['Ali', 'Aminah', 'Asma', 'Asiah', 'Bilal', 'Faruq', 'Hafsa', 'Halimah', 'Maryam', 'Nusaibah',
    'Salahuddin','Sumayyah','Safiyyah','Uthman','Zubair']

function parseTimeString(timeStr) {
    if (!timeStr) return ''
    const [time, modifier] = timeStr.trim().split(' ')
    let [hours,minutes] = time.split(':')

    let h = parseInt(hours, 10)
    if (modifier === 'pm' && h < 12) h += 12
    if (modifier === 'am' && h === 12) h = 0

    return `${String(h).padStart(2, '0')}:${minutes}`
}

// A plain function: values in, errors object out. Empty object = valid.
function validate(values, cart=[], vendors=[]) {
    const errors = {}
    if (values.name.trim().length < 3){
        errors.name = 'Enter your name (at least 3 characters).'
    }

    // TODO: mahallah must be chosen
    if (!values.mahallah) {
    errors.mahallah = 'Choose your mahallah.'
    }
    // TODO: pickupTime must be between '07:00' and '22:00' (strings compare fine)
    if (!values.pickupTime) {
    errors.pickupTime = 'Choose a pickup time.'
    } else {
        // 1. Get unique vendor ID present in the current cart
        const vendorIdsInCart = [...new Set(cart.map((line) => line.vendorId || line.item?.vendorId))]

        // 2. Validate against operating hours of every vendor in cart
        for (const vId of vendorIdsInCart) {
            const vendor = vendors.find((v) => v.id === vId)
            if (vendor && vendor.openHours) {
                const [startRaw, endRaw] = vendor.openHours.split('-').map((s) => s.trim())
                const openTime = parseTimeString(startRaw)
                const closeTime = parseTimeString(endRaw)

                if (values.pickupTime < openTime || values.pickupTime > closeTime) {
                    errors.pickupTime = `${vendor.name} is closed at ${values.pickupTime}. Operating hours: ${vendor.openHours}`
                    break // Stop on first failing vendor match
                }
            }
        }
    }
    return errors
}

function CheckoutForm({ onPlaceOrder, cart=[], vendors =[]}) {
    const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' })
    const [errors, setErrors] = useState({})

// One handler for every input: the input's name matches a key in values.
function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
}

function handleSubmit(event) {
    event.preventDefault() // stop the page reloading
    const found = validate(values, cart, vendors)
    setErrors(found)
    // TODO: if found has no keys, call onPlaceOrder(values)
    if (Object.keys(found).length === 0) {
      onPlaceOrder(values)
    }
}

return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
        <h3 style={{margin:'0 0 1rem', padding: '0rem'}}>Checkout</h3>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={values.name} onChange={handleChange} />
        {errors.name && <p className="field-error">{errors.name}</p>}
        
        <label htmlFor="mahallah">Mahallah</label>
        <select id="mahallah" name="mahallah" value={values.mahallah}
        onChange={handleChange}>
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
    {/* TODO: show errors.mahallah */}
        {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

    {/* TODO: label + <input type="time" name="pickupTime" ...> + its error */}
        <label htmlFor="pickupTime">Pickup time</label>
        <input type="time" id="pickupTime" name="pickupTime" value={values.pickupTime} onChange={handleChange} />
        {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}
        <button type="submit" className="btn">Place order</button>
    </form>
    )
}

export default CheckoutForm