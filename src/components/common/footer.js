import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="wrapper container">
                <p>©2023 - TataLab</p>
                <p>
                    <Link to="/research">Research</Link>
                    &nbsp;<span> | </span>&nbsp;
                    <Link to="/people" >People</Link>
                    &nbsp;<span> | </span>&nbsp;
                    <Link to="/involved">Get Involved</Link>
                    &nbsp;<span> | </span>&nbsp;
                    <Link to="/contact">Contact</Link>
                </p>
                <Link to="/auth">Admin</Link>
            </div>
        </footer>
    )
}

export default Footer