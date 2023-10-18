import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Delete } from '../../../data/icons/delete.svg'
import { ReactComponent as Edit } from '../../../data/icons/edit.svg'
import Popup from 'reactjs-popup';
import useFetch from '../fetch';

function Person({ person }) {
    const [open, setOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState(null)
    const { data } = useFetch('http://localhost:8000/people')
    const navigate = useNavigate()

    const determineLevel = (id) => {
        for (const level of Object.keys(data)) {
            const person = data[level].find((person) => person.id === id)
            if (person) {
                return level
            }
        }
        return null
    }

    const handleDelete = (id) => {
        const updatedData = { ...data }
        const level = determineLevel(id)

        const index = data[level].findIndex((person) => person.id === id)

        if (index !== -1) {
            updatedData[level].splice(index, 1)

            fetch('http://localhost:8000/people', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not access the data at this time.")
                    }
                    setDeleted(true)
                    setTimeout(() => {
                        setOpen(false)
                        navigate("/admin")
                    }, 3000)
                })
                .catch(e => {
                    setError(e.message)
                })
        } else {
            setError("Error: Person was not found in database")
        }
    }

    return (
        <div className="three-flex people__admin people__content" key={person.id}>
            <img src={person.photo} alt={person.id} />
            <div>
                <p>{person.name}</p>
                <div className='buttons'>
                    <Link to={String(person.id)} className='button__small button--green'>
                        Edit
                        <Edit />
                    </Link>
                    <button onClick={() => setOpen(true)} className='button__small button--red'>
                        Delete
                        <Delete />
                    </button>
                </div>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <div className="popup">
                    {!deleted && !error &&
                        <div>
                            <h3>Are you sure you want to delete {person.name}?</h3>
                            <div className='buttons'>
                                <button onClick={() => handleDelete(person.id)} className='button__small button--red'>
                                    Delete
                                    <Delete />
                                </button>
                                <button onClick={() => setOpen(false)} className='button__small button--green__important'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    }
                    {deleted &&
                        <div>
                            <h3>{person.name} has been removed.</h3>
                            <p>Redirecting back to Admin</p>
                        </div>
                    }
                    {error &&
                        <div>
                            <h3>Error:</h3>
                            <p>{error}</p>
                        </div>
                    }
                </div>
            </Popup>
        </div>
    )
}

export default Person;