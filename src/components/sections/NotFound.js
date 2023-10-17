import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="container wrapper">
            <h2>404. Page not found.</h2>
            <Link to='/' className='button button--blue'>Return Home</Link>
        </div>
    )
}

export default NotFound;