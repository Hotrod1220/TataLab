import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase'

function Admin() {
    const navigate = useNavigate()
    const [user, setUser] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
            } else {
                navigate('/auth')
            }
        })
    }, [user, navigate])

    const [error, setError] = useState('')

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
            {user && <div className="container">
                <div className="logout--container">
                    <NavLink to="resume" className="resume__button button__small button--blue">Matt's CV</NavLink>
                    <h1>Admin</h1>
                    <button className="logout button__small button--blue" onClick={logout}>Logout</button>
                </div>
                <nav className="sub--nav">
                    <NavLink to="projects">
                        {({ isActive }) => (
                            <div className={isActive ? "sub--nav__active" : ""}>Projects</div>
                        )}
                    </NavLink>
                    <NavLink to="people">
                        {({ isActive }) => (
                            <div className={isActive ? "sub--nav__active" : ""}>People</div >
                        )}
                    </NavLink>
                </nav>
                {error && <p>Log out unsuccessful. {error}</p>}
                <div className='wrapper'>
                    <Outlet />
                </div>
            </div>}
        </div>
    )
}

export default Admin;