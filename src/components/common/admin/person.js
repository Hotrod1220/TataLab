import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Delete } from '../../../data/icons/delete.svg'
import { ReactComponent as Edit } from '../../../data/icons/edit.svg'
import Popup from 'reactjs-popup';
import { database, storage } from '../../../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";

function Person({ person }) {
    const [open, setOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleDelete = async (id, photo) => {
        const project = doc(database, "people", id)
        const desertRef = ref(storage, `${photo}`)
        
        try {
            await deleteObject(desertRef)
            await deleteDoc(project)
            
            setDeleted(true)
            setTimeout(() => {
                setOpen(false)
                navigate("/admin")
            }, 3000)
        } catch (err) {
            setError(err.message)
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
                                <button onClick={() => handleDelete(person.id, person.photo)} className='button__small button--red'>
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