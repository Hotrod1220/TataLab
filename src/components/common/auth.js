import { auth } from '../../config/firebase' 
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrong, setWrong] = useState('')
    const navigate = useNavigate()
    const auth0 = getAuth()
    setPersistence(auth0, browserSessionPersistence)

    const login = async (e) => {
        e.preventDefault()
        
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/admin')
        } catch(err) {
            setWrong("Incorrect email or password.")
        }
    }

    return(
        <div className="container wrapper add-form">
            <h1>Admin Login</h1>
            <form>
                <div className="form__content">
                    <label>Email:</label>
                    <input 
                        type="text"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input 
                        type="Password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="button--blue" onClick={login}>Login</button>
            </form>
            {wrong && <p>{wrong}</p>}
        </div>
    )
}

export default Auth;