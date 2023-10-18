import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../fetch'

function EditPerson() {
    const { id } = useParams()
    const { data, pending, fetchError } = useFetch('http://localhost:8000/people')
    const [name, setName] = useState('')
    const [major, setMajor] = useState('')
    const [photo, setPhoto] = useState('/images/temp.jpg')
    const [level, setLevel] = useState('')
    const [oldLevel, setOldLevel] = useState('')
    const [person, setPerson] = useState('')
    const [error, setError] = useState('')
    const [complete, setComplete] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()
    
    useEffect(() => {
        if (data) {
            determineLevel(id)
            setName(person.name)
            setMajor(person.major)
            setPhoto(person.photo)
            setLevel(oldLevel)
        }
    }, [data, id, oldLevel, person])
    
    const determineLevel = (id) => {
        for (const lev of Object.keys(data)) {
            let per = data[lev].find(person => person.id === parseInt(id))

            if (per) {
                setOldLevel(lev)
                setPerson(per)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsPending(true)
        const updatedData = { ...data }
        const person = { name, photo, major }
        let maxId = 0
        let info = []

        const index = data[oldLevel].findIndex(person => person.id === parseInt(id))

        if (index !== -1) {
            updatedData[oldLevel].splice(index, 1)
            
            if (updatedData[level]) {
                info = info.concat(
                    data.phd,
                    data.masters,
                    data.undergraduate,
                    data.alumni,
                    data.collaborator
                )
    
                maxId = Math.max.apply(Math, info.map(
                    person => person.id
                ))
                const newId = maxId + 1
                const newPerson = { ...person, id: newId }
    
                updatedData[level].push(newPerson)
            }

            fetch('http://localhost:8000/people', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            })
                .then(() => {
                    setIsPending(false)
                    setComplete(true)
                })
        } else {
            setError("Error: Person was not found in database")
        }
    }

    return (
        <div>
            {fetchError && <h3>{fetchError}</h3>}
            {pending && <h3>Loading...</h3>}
            {data && 
                <div>
                    <h3>Edit Person</h3>
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
                            <option value="phd">Doctorate</option>
                            <option value="masters">Masters</option>
                            <option value="undergraduate">Bachelor</option>
                            <option value="alumni">Alumni</option>
                            <option value="collaborator">Collaborator</option>
                        </select>
                        <label>
                            Photo:
                            Accepted file types: jpeg, png
                        </label>
                        <input
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
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

/* function EditProject() {
    const { id } = useParams()
    const { data, pending, fetchError } = useFetch('http://localhost:8000/projects/' + id)
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

        fetch('http://localhost:8000/projects/' + id, {
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
            {fetchError && <h3>{error}</h3>}
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
}*/

export default EditPerson;