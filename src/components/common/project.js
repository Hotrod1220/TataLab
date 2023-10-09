function Project({ project }) {
    return (
        <div className="two-flex project">
            <img src={project.photo} alt={project.title} />
            <div className="project__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
            </div>
        </div>
    )
}

export default Project