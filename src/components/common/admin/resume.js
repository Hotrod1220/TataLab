import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

function Resume() {
    const [photo, setPhoto] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        const imageRef = ref(storage, `Resume/Matt_Resume.pdf`)
        
        uploadBytes(imageRef, photo)
            .then(() => {
                setComplete(true)
                setIsPending(false)
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div>
            <h3 className="form__header">Update Resume</h3>
            <div className='container'>
                <form className='form__center' onSubmit={handleSubmit}>
                    <div className="form__content">
                        <label>
                            Resume PDF:<br/>
                            Accepted file types: pdf<br/><br/>
                        </label>
                        <input
                            required
                            type='file'
                            accept='application/pdf'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    {!isPending && !complete && <button className="button--blue">Update Resume</button>}
                    {isPending && <button disabled className="button--blue">Updating Resume...</button>}
                </form>
                {complete && <button className="button--blue" onClick={() => history("/admin/projects")}>Back to Admin</button>}
                {complete && <h3>Resume has been updated.</h3>}
                {error && <h3>{error}</h3>}
            </div>
        </div>
    )
}

export default Resume;