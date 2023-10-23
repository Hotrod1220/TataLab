import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../fetch';
import { database, storage } from '../../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function EditProject() {
    const { id } = useParams()
    const { data, pending, fetchError } = useFetch('projects')
    const [title, setTitle] = useState('')
    const [description, setDesciption] = useState('')
    const [photo, setPhoto] = useState('')
    const [url, setUrl] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()
    const projectDoc = doc(database, "projects", id)

    useEffect(() => {
        if (data) {
            const proj = data.filter((proj) => proj.id === id)
            setTitle(proj[0].title)
            setDesciption(proj[0].description)
        }
    }, [data])

    useEffect(() => {
        const addData = async () => {
            try {
                await updateDoc(projectDoc, {
                    title: title,
                    photo: url,
                    description: description
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

        if (photo) {
            const imageRef = ref(storage, `projects/${photo.name + v4()}`)
            
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
            const proj = data.filter((proj) => proj.id === id)
            setUrl(proj[0].photo)
        }
    }

    return (
        <div>
            {fetchError && <h3>{fetchError}</h3>}
            {pending && <h3>Loading...</h3>}
            {data && 
                <div>
                    <h3 className='form__header'>Edit Project</h3>
                    <form className='add-project' onSubmit={handleSubmit}>
                    <div className="form__content">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Project Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDesciption(e.target.value)}
                        >
                        </textarea>
                        <label>
                            Photo:<br/>
                            Please make photo width equal or greater than photo height.<br/><br/>
                            Accepted file types: jpeg/jpg, png
                        </label>
                        <input
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Submit Changes</button>}
                    {isPending && !complete && <button disabled className="button--blue">Submitting Changes...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/projects")}>Back to Admin</button>}
                {complete && <h3>Project has been edited.</h3>}
                {error && <h3>{error}</h3>}
                </div>
            }
        </div>
    )
}

export default EditProject;