import { Link } from 'react-router-dom'
import { ReactComponent as New } from '../../../data/icons/plus.svg'
import useFetch from '../fetch';
import Project from './project';

function Projects() {
    const { data: projects, isPending, error } = useFetch('http://localhost:8000/projects')

    return (
        <div className="container">
            <Link to="add">
                <div className="add--button__content">
                    <New />
                    <h3>Add Project</h3>
                </div>
            </Link>
            <div>
                {error && <h3>{error}</h3>}
                {isPending && <h3>Loading...</h3>}
                {projects && <div className="flex">
                    {projects && projects.map((project) => (
                        <Project project={project} key={project.id}/>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default Projects;