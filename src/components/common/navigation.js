import { Link } from 'react-router-dom'
import logo from '../../data/images/TataLab_logo_black.png'

function Navigation() {
    return (
        <header className="sticky-header">
            <div className="primary-nav">
                <div className="container">
                    <Link to="/"><img src={logo} alt='TataLab Logo' /></Link>
                    <nav>
                        <ul className="primary-nav__items">
                            <li><Link to="/research">Research</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/involved">Get Involved</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navigation;