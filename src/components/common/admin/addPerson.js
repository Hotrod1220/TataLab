import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { database, storage } from '../../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function AddPerson() {
    const [name, setName] = useState('')
    const [major, setMajor] = useState('')
    const [level, setLevel] = useState(0)
    const [photo, setPhoto] = useState('')
    const [url, setUrl] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const history = useNavigate()
    const collectionRef = collection(database, "people")

    useEffect(() => {
        const addData = async () => {
            try {
                await addDoc(collectionRef, {
                    name: name,
                    photo: url,
                    major: major,
                    education: parseInt(level)
                })
                setIsPending(false)
                setComplete(true)
            } catch(err) {
                setError(err.message)
            }
        }
        if (url) {
            addData()
        }
    }, [url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        const imageRef = ref(storage, `people/${photo.name + v4()}`)
        
        uploadBytes(imageRef, photo)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(u => {
                setUrl(u)
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div>
            <h3>Add Person</h3>
            <div className='container'>
                <form onSubmit={handleSubmit} className='add-form'>
                    <div className="form__content">
                        <label>Name:</label>
                        <input
                            type='text'
                            required
                            placeholder='John Smith'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Major:</label>
                        <input
                            type='text'
                            required
                            placeholder='Neuroscience'
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                        />
                        <label>Education Level:</label>
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option value='0'>Doctorate</option>
                            <option value='1'>Masters</option>
                            <option value='2'>Bachelor</option>
                            <option value='3'>Alumni</option>
                            <option value='4'>Collaborator</option>
                        </select>
                        <label>
                            Photo:<br/>
                            Accepted file types: jpeg/jpg, png<br/>
                        </label>
                        <input
                            required
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Add Person</button>}
                    {isPending && <button disabled className="button--blue">Adding Person...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/people")}>Back to Admin</button>}
                {complete && <h3>{name} has been added to the website.</h3>}
                {error && <h3>{error}</h3>}
            </div>
        </div>
    )
}

export default AddPerson;