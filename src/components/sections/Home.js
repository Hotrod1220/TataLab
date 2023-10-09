import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <div className="landing">
                <div className="container">
                    <h1>Welcome to TataLab</h1>
                    <h3>
                        Our lab specializes in the integration
                        of <span>neuroscience</span> with <span>robotics</span> and <span>AI</span>.
                        We study <span>auditory perception</span> and attention, and develop
                        brain-inspired <span>AI algorithms</span> for <span>robotics.</span>
                    </h3>
                </div>
            </div>
            <div className="two-grid container landing--content">
                <div className="wrapper landing--research">
                    <div>
                        <h1>Research</h1>
                        <p>
                            Under the leadership of Dr. Matthew Tata, students engage in
                            exceptional research that enriches scientific inquiries and
                            drives significant advancements in neuroscience, robotics, and AI.
                        </p>
                        <Link to="/research">
                            <button className="button--white" onClick={() => { window.scrollTo(0, 0) }}>
                                View Research
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="wrapper landing--people">
                    <div>
                        <h1>People</h1>
                        <p>
                            Our diverse group of researchers, faculty members, and students
                            collaborate relentlessly to unravel the mysteries of the human
                            brain and push the boundaries of technological possibilities.
                        </p>
                        <Link to="/people">
                            <button className="button--white" onClick={() => { window.scrollTo(0, 0) }}>
                                View Our Team
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="wrapper landing--content__footer">
                <div className="two-grid container">
                    <div className="">
                        <h3>Want more information on the lab?</h3>
                        <Link to="/involved">
                            <button className="button--lightblue" onClick={() => { window.scrollTo(0, 0) }}>
                                Get Involved
                            </button>
                        </Link>
                    </div>
                    <div>
                        <h3>Have any questions or inquiries?</h3>
                        <Link to="/contact">
                            <button className="button--lightblue" onClick={() => { window.scrollTo(0, 0) }}>
                                Contact
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home