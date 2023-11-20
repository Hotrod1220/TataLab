import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as New } from '../../../data/icons/plus.svg'
import useFetch from '../fetch';
import Person from './person';

function People() {
    const { data, isPending, error } = useFetch('people')

    return (
        <div className="container">
            <div className="pos-relative">
                <NavLink to="resume" className="resume__button button__small button--blue">Matt's CV</NavLink>
                <Link to="add">
                    <div className="add--button__content">
                        <New />
                        <h3>Add Person</h3>
                    </div>
                </Link>
                <div>
                    {error && <h3>{error}</h3>}
                    {isPending && <h3>Loading...</h3>}
                    {data && <div className="flex profile">
                        {data && data.map((person) => (
                            <Person person={person} key={person.id} />
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default People;