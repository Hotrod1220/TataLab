import { useEffect, useState } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not access the data at this time.")
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setError(null)
                setIsPending(false)
            })
            .catch(error => {
                setError(error.message)
                setIsPending(false)
            })
    }, [url])

    return { data, isPending, error }
}

export default useFetch