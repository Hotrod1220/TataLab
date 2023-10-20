import Profile from "./profile"

function PeopleSection({people, title}) {
    let grid = ""
    let wrapper = "wrapper"
    
    if (title === "Graduate Students") {
        grid = "two"
    } else if (title === "Undergraduate Students") {
        grid = "three"
    } else {
        wrapper = "people__wrapper"
        grid = "four"
    }

    return (
        <div className={wrapper}>
            <h2 className="people__content__title">{title}</h2>
            <div className='flex profile'>
                {title === "Graduate Students" && people.filter((person) => person.education === 0).map((content) => (
                    <Profile person={content} prefix={"Ph.D."} grid={grid} key={content.id} />
                ))}
                {title === "Graduate Students" && people.filter((person) => person.education === 1).map((content) => (
                    <Profile person={content} prefix={"M.Sc."} grid={grid} key={content.id} />
                ))}
                {title !== "Graduate Students" && people.map((content) => (
                    <Profile person={content} prefix={null} grid={grid} key={content.id} />
                ))}
            </div>
        </div>
    )
}

export default PeopleSection;