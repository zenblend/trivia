import React from "react"

export default function Question(props) {
    return (
        <div id="question-wrapper">
            <h2 id="question-text">{props.question}</h2>
        </div>

    )
}