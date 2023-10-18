import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../fetch';

function EditProject() {
    const { id } = useParams()
    const { data, pending, fetchError } = useFetch(`http://localhost:8000/projects/${id}`)
    const [title, setTitle] = useState('')
    const [description, setDesciption] = useState('')
    const [photo, setPhoto] = useState('/images/temp.jpg')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDesciption(data.description)
            setPhoto(data.photo)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        const project = {title, photo, description}
        setIsPending(true)

        fetch(`http://localhost:8000/projects/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project)
            })
            .then(() => {
                setComplete(true)
            })
            .catch(() => {
                setError(error.message)
                setIsPending(false)
            })
    }

    return (
        <div>
            {fetchError && <h3>{fetchError}</h3>}
            {pending && <h3>Loading...</h3>}
            {data && 
                <div>
                    <h3>Edit Project</h3>
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
                            Photo:
                            Accepted file types: jpeg, png
                        </label>
                        <input
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Edit Project</button>}
                    {isPending && !complete && <button disabled className="button--blue">Editing Project...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/projects")}>Back to Admin</button>}
                {complete && <h3>Project has been edited.</h3>}
                {error && <h3>Error: Could not edit this project.</h3>}
                </div>
            }
        </div>
    )
}

export default EditProject;