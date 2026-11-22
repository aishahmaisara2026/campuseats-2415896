import {useState, useEffect} from 'react'

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try{
            const saved = localStorage.getItem(key)
            return saved !== null? JSON.parse(saved) : initialValue
        } catch (error) {
            console.error('Error reading localStorage key "${key":', error)
            return initialValue
        }
    })

    useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      setValue(saved !== null ? JSON.parse(saved) : initialValue)
    } catch {
      setValue(initialValue)
    }
    }, [key])

    const setStoredValue = (newValue) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function' ? newValue(prev) : newValue
      try {
        localStorage.setItem(key, JSON.stringify(resolved))
      } catch (error) {
        console.error(`Error setting localStorage "${key}":`, error)
      }
      return resolved
    })
    }

  return [value, setStoredValue]
}