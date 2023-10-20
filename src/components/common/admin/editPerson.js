import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../fetch';
import { database, storage } from '../../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function EditPerson() {
    const { id } = useParams()
    const { data, pending, fetchError } = useFetch('people')
    const [name, setName] = useState('')
    const [major, setMajor] = useState('')
    const [photo, setPhoto] = useState('')
    const [level, setLevel] = useState('')
    const [url, setUrl] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()
    const projectDoc = doc(database, "people", id)

    useEffect(() => {
        if (data) {
            const per = data.filter((per) => per.id === id)
            setName(per[0].name)
            setMajor(per[0].major)
            setLevel(per[0].education)
        }
    }, [data])
       
    useEffect(() => {
        const addData = async () => {
            try {
                await updateDoc(projectDoc, {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsPending(true)
        
        if (photo) {
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
        } else {
            const per = data.filter((per) => per.id === id)
            setUrl(per[0].photo)
        }
    }

    return (
        <div>
            {fetchError && <h3>{fetchError}</h3>}
            {pending && <h3>Loading...</h3>}
            {data && 
                <div>
                    <h3 className='form__header'>Edit Person</h3>
                    <form className='add-form' onSubmit={handleSubmit}>
                    <div className="form__content">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {level !== "alumni" && level !== "collaborator" &&
                        <div>
                            <label>Major:</label>
                            <input
                                type="text"
                                value={major || ''}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </div>
                        }
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
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Edit Person</button>}
                    {isPending && !complete && <button disabled className="button--blue">Editing Person...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/people")}>Back to Admin</button>}
                {complete && <h3>Person has been edited.</h3>}
                {error && <h3>{error}</h3>}
                </div>
            }
        </div>
    )
}

export default EditPerson;