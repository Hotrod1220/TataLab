import { useState } from 'react'
import useFetch from '../common/fetch'
import PeopleSection from '../common/people'
import { ReactComponent as Cross } from '../../data/icons/x.svg'
import matt from '../../data/images/matt.jpeg'
import pdf from '../../data/resume/Matt_Resume.pdf'

function People() {
    const { data: people, isPending, error } = useFetch("people")
    const [display, setDisplay] = useState("none")
    const [text, setText] = useState("View CV")

    function cvClose() {
        setDisplay(display === "none" ? "block" : "none")
        setText(text === "View CV" ? "Close CV" : "View CV")
    }

    return (
        <div className="border--top">
            <h1>Meet Our Team</h1>
            <div className="container two-grid matt">
                <div className='wrapper matt__content'>
                    <h2>Dr. Matthew Tata</h2>
                    <p>
                        Dr. Matthew Tata has a Ph.D. and M.Sc. degrees in Cognitive
                        Neuroscience from the University of British Columbia and a
                        B.Sc. in Biological Systems Technology from Cornell University.
                        He is an Associate Professor in the Department of Neuroscience
                        at the University of Lethbridge. His research program aims to
                        understand the neural mechanisms of human hearing and translate
                        that knowledge into artificial auditory perception in robotics and AI.
                    </p>
                    <p>
                        For more information on Dr. Matthew Tata:<br /><br />
                        View Publications at <a href="https://www.researchgate.net/profile/Matthew-Tata/research" target="_blank" rel="noreferrer">ResearchGate</a>
                    </p>
                    <button className="button--lightblue" onClick={cvClose}>
                        {text}
                    </button>
                </div>
                <div className="wrapper">
                    <img src={matt} alt="Dr. Matthew Tata" />
                </div>
            </div>
            <div className="container wrapper resume" style={{ display: display }}>
                <div onClick={cvClose}>
                    <Cross />
                </div>
                <embed src={pdf} className="resume__content" />
            </div>
            <div className='people__content container'>
                {error && <h2>{error}</h2>}
                {isPending && <h1>Loading...</h1>}
                {people && <PeopleSection people={people.filter((person) => person.education === 0 || person.education === 1)} title={"Graduate Students"}/>}
                {people && <PeopleSection people={people.filter((person) => person.education === 2)} title={"Undergraduate Students"}/>}
                {people && <PeopleSection people={people.filter((person) => person.education === 3)} title={"Alumni"}/>}
                {people && <PeopleSection people={people.filter((person) => person.education === 4)} title={"Collaborators"}/>}
            </div>
        </div>
    )
}

export default People