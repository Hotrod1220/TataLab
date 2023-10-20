import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { database, storage } from '../../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function AddProject() {
    const [title, setTitle] = useState('')
    const [description, setDesciption] = useState('')
    const [photo, setPhoto] = useState('')
    const [url, setUrl] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const history = useNavigate()
    const collectionRef = collection(database, "projects")

    useEffect(() => {
        const addData = async () => {
            try {
                await addDoc(collectionRef, {
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
    }

    return (
        <div>
            <h3>Add Project</h3>
            <div className='container'>
                <form className='add-project' onSubmit={handleSubmit}>
                    <div className="form__content">
                        <label>Title:</label>
                        <input
                            type="text"
                            required
                            placeholder="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Project Description:</label>
                        <textarea
                            required
                            value={description}
                            placeholder="Write the Project Description"
                            onChange={(e) => setDesciption(e.target.value)}
                        >
                        </textarea>
                        <label>
                            Photo:<br/>
                            Please make photo width equal or greater than photo height.<br/><br/>
                            Accepted file types: jpeg/jpg, png
                        </label>
                        <input
                            required
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Add Project</button>}
                    {isPending && <button disabled className="button--blue">Adding Project...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/projects")}>Back to Admin</button>}
                {complete && <h3>Project has been added to the website.</h3>}
                {error && <h3>{error}</h3>}
            </div>
        </div>
    )
}

export default AddProject;