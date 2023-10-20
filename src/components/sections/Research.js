import useFetch from "../common/fetch"
import Project from "../common/project"

function Research() {
    const { data: projects, isPending, error } = useFetch("projects")

    return (
        <div className="border--top">
            <div className="research">
                <div className="container wrapper">
                    <h1>Research</h1>
                    <div className="five-grid research__content">
                        <div>
                            <p>
                                We investigate how the human brain processes auditory information
                                and allocates attention, applying these insights to create more
                                perceptive AI systems and robots.
                            </p>
                            <p>
                                Our interdisciplinary team collaborates across fields to bridge the
                                gap between neuroscience and robotics, with a commitment to translating
                                our findings into real-world applications.
                            </p>
                            <p>
                                TataLab is collaborating with the iCub project to integrate
                                advanced hearing capabilities into the humanoid robot,
                                enhancing its sensory perception and cognitive abilities.
                            </p>
                        </div>
                        <div>
                            <iframe src="https://www.youtube.com/embed/zHOtxvl-Tzc?si=gf6X9wpS-O9AiLdM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container wrapper">
                <h2 className="student_title">Student Research</h2>
                <div>
                    {error && <h3>{error}</h3>}
                    {isPending && <h1>Loading...</h1>}
                    <div className="flex">
                        {projects && projects.map((content) => (
                            <Project project={content} key={content.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Research;