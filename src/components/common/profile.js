function Profile({ person, prefix, grid}) {
    let major = null

    if (prefix) {
        major = prefix + " " + person.major
    } else {
        if (person.major) {
            major = person.major
        } else {
            major = null
        }
    }

    grid = grid + "-flex"

    return (
        <div className={grid}>
            <img src={person.photo} alt={person.name} />
            <p className="person">{person.name}</p>
            <p>{major}</p>
        </div>
    )
}

export default Profile