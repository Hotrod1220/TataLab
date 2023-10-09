import { ReactComponent as chevronRight } from '../../data/icons/chevron-right.svg'
import { ReactComponent as chevronDown } from '../../data/icons/chevron-down.svg'

function listFaq({ faq }) {
    function closeDetails() {
        const details = document.querySelectorAll("details")

        details.forEach((targetDetail) => {
            targetDetail.addEventListener("click", () => {
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute("open")
                    }
                })
            })
        })
    }

    return (
        <div>
            <details onClick={closeDetails}>
                <summary>
                    <h3>{faq.question}</h3>
                    <div className="chevron--right">{chevronRight.render(chevronRight.$$typeof)}</div>
                </summary>
                <p>
                    {faq.answer}
                </p>
                <div className="chevron--down">{chevronDown.render(chevronDown.$$typeof)}</div>
            </details>
        </div>
    )
}

export default listFaq;