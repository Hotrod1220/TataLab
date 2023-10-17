import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProject() {
    const [title, setTitle] = useState('')
    const [description, setDesciption] = useState('')
    const [photo, setPhoto] = useState('/images/temp.jpg')
    const [isPending, setIsPending] = useState(false)
    const [complete, setComplete] = useState(false)
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const project = { title, photo, description }

        setIsPending(true)

        fetch('http://localhost:8000/projects', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        })
            .then(() => {
                setIsPending(false)
                setComplete(true)
            })
    }

    return (
        <div>
            <h3>Add Project</h3>
            <div className='container'>
                <form className='add-form' onSubmit={handleSubmit}>
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
                            required
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Add Project</button>}
                    {isPending && <button disabled className="button--blue">Adding Project...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/projects")}>Back to Admin</button>}
                {complete && <h3>Project has been added to the website.</h3>}
            </div>
        </div>
    )
}

export default AddProject;