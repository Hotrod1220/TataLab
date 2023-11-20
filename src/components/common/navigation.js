import { Link, NavLink } from 'react-router-dom'
import logo from '../../data/images/TataLab_logo_black.png'

function Navigation() {
    return (
        <header className="sticky-header">
            <div className="primary-nav">
                <div className="primary-nav__content container">
                    <Link to="/"><img src={logo} alt='TataLab Logo' /></Link>
                    <nav>
                        <ul className="primary-nav__items">
                            <li>
                                <NavLink to="/research">
                                    {({ isActive }) => (
                                        <div className={isActive ? "nav__active" : ""}>Research</div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/people">
                                    {({ isActive }) => (
                                        <div className={isActive ? "nav__active" : ""}>People</div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/involved">
                                    {({ isActive }) => (
                                        <div className={isActive ? "nav__active" : ""}>Get Involved</div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">
                                    {({ isActive }) => (
                                        <div className={isActive ? "nav__active" : ""}>Contact</div>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navigation;