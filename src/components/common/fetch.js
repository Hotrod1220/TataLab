import { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore"
import { database } from '../../config/firebase'

function useFetch(location) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const collectionRef = collection(database, location)
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDocs(collectionRef)
                const filterData = data.docs.map((doc) => (
                    {...doc.data(), id: doc.id}
                ))
                setData(filterData)
                setError(null)
                setIsPending(false)
            } catch (error) {
                setError(error.message)
                setIsPending(false)
            }
        }
        getData()
    }, [location])

    return { data, isPending, error }
}

export default useFetch