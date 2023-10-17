import { Link } from 'react-router-dom'
import { ReactComponent as New } from '../../../data/icons/plus.svg'
import useFetch from '../fetch';
import Person from './person';

function People() {
    const { data, isPending, error } = useFetch('http://localhost:8000/people')
    let info = []
    
    if (data) {
        info = info.concat(
            data.phd,
            data.masters,
            data.undergraduate,
            data.alumni,
            data.collaborator
        )
    }

    return (
        <div className="container">
            <Link to="add">
                <div className="add--button__content">
                    <New />
                    <h3>Add Person</h3>
                </div>
            </Link>
            <div>
                {error && <h3>{error}</h3>}
                {isPending && <h3>Loading...</h3>}
                <div className="flex profile">
                    {info && info.map((person) => (
                        <Person person={person} key={person.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default People;