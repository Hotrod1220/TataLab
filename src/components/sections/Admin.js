import { NavLink, Outlet } from 'react-router-dom'
import { ReactComponent as New } from '../../data/icons/plus.svg'

function Admin() {
    return (
        <div className="container">
            <h1>Admin</h1>
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
            <div className='wrapper'>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;