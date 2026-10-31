import {useState,useEffect,useCallBack} from 'react'

export function useVendors(){
    const [vendors, setVendors] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchVendors = useCallBack(async() => {
        setLoading(true)
        setError(null)
        try{
            const response = await fetch ('/api/vendors.json')
            if (!response.ok) {
                throw new error ('Failed to fetch vendors (${response.status})')
            }
            const data = await response.json()
            setVendors(data) 
        } catch (err) {
            setError(err.message || 'An error occured while loading vendors')
        } finally {
            setLoading(false)
        }
    },[])

    useEffect(() => {
        fetchVendors()
    }, [fetchVendors])

    return {vendors, loading, error, reload: fetchVendors}
}