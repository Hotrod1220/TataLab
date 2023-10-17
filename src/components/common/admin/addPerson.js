import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddPerson() {
    const [name, setName] = useState('')
    const [major, setMajor] = useState('')
    const [level, setLevel] = useState('phd')
    const [photo, setPhoto] = useState('/images/temp.jpg')
    const [isPending, setIsPending] = useState(false)
    const [complete, setComplete] = useState(false)
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const person = { name, photo, major }
        const url = 'http://localhost:8000/people'

        setIsPending(true)

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const updatedData = { ...data }
                let maxId = 0
                let info = []

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

                fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData)
                })
                    .then(() => {
                        setIsPending(false)
                        setComplete(true)
                    })
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
                            required
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Add Person</button>}
                    {isPending && <button disabled className="button--blue">Adding Person...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/people")}>Back to Admin</button>}
                {complete && <h3>{name} has been added to the website.</h3>}
            </div>
        </div>
    )
}

export default AddPerson;