import ListFaq from '../common/listFaq'
import experiment from '../../data/images/experiment.jpeg'
import involved from '../../data/images/faq.jpeg'

const faq = [
    {
        "question": "Do I need to have prior experience and knowledge to be a part of the lab?",
        "answer": "No, anyone who has a passion for research is welcome in the lab."
    },
    {
        "question": "What is the expected time commitment for student researchers?",
        "answer": "Time commitment is dependent on student schedules. Courses taken at the UofL take priority over lab work."
    },
    {
        "question": "Is there a specific GPA requirement to participate in lab research?",
        "answer": "No, anyone who has a passion for research is welcome in the lab."
    },
    {
        "question": "Does research have to be robotics, AI, or auditory-based?",
        "answer": "No, but it must be related to or contribute to a topic in neuroscience."
    },
    {
        "question": "Can I observe the lab before starting to contribute?",
        "answer": "There is no rush to contribute to lab work."
    },
    {
        "question": "Can I work on interdisciplinary projects that combine neuroscience, robotics, and/or AI?",
        "answer": "Absolutely!"
    },
    {
        "question": "Can international students join the lab as researchers?",
        "answer": "Absolutely!"
    },
]

function Involved() {
    return (
        <div className="border--top">
            <div className="involved">
                <div className="two-grid container wrapper">
                    <img src={experiment} alt="TataLab Experiment" />
                    <div>
                        <h1>Experiments</h1>
                        <p>
                            Want to contribute to the research conducted in the lab?
                            We're always on the lookout for enthusiastic individuals
                            like you to participate in our lab studies.
                        </p>
                        <p className="experiment__p">
                            Visit our <a href='https://tatalab.ca/bookings/' target="_blank" rel="noreferrer">booking site</a> to see available experiments.
                        </p>
                    </div>
                </div>
                <div className="two-grid container wrapper">
                    <div>
                        <h1>Get Involved</h1>
                        <p>
                            Discover how you can become part of our dynamic research
                            community here at the University of Lethbridge. Whether
                            you're an undergraduate seeking hands-on experience or a
                            graduate student ready to make your mark, we offer a range
                            of research projects and mentorship opportunities. Find out
                            how you can take your academic journey to the next level and
                            contribute to groundbreaking discoveries.
                        </p>
                        <button className="button--blue" onClick={() => window.location.href = 'mailto:matthew.tata@uleth.ca'}>
                            Send an Email
                        </button>
                    </div>
                    <img src={involved} alt="TataLab Get Involved" className="involved__img"/>
                </div>
            </div>
            <div className="faq wrapper">
                <div className="container">
                    <h1>FAQ</h1>
                    {faq.map(faq => (
                        <div key={faq.question}>
                            <ListFaq faq={faq} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Involved