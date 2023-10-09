function Contact() {
    return (
        <div className="border--top contact">
            <div className="container">
                <h1>Contact</h1>
                <h3>
                    Have questions, inquiries, or just want to get in touch?
                    Use the contact information below to reach out to us:
                </h3>
                <div>
                    <h3>
                        Email: matthew.tata@uleth.ca
                    </h3>
                    <button className="button--blue" onClick={() => window.location.href = 'mailto:matthew.tata@uleth.ca'}>
                        Send an Email
                    </button>
                </div>
                <h3>
                    We look forward to hearing from you and will do our best
                    to respond promptly to your queries. Thank you for your interest in TataLab.
                </h3>
            </div>
        </div>
    )
}

export default Contact