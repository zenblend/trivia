import React from "react"

export default function Answer(props) {

    const styles = props.isselected ? {backgroundColor: "green"} : {backgroundColor: "white"}

    return (
        <div>
            <div className="answer" 
            style={styles} 
            onClick={props.onClick} 
            >{props.answer}</div>
        </div>
    )
}