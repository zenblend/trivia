import React from "react"

export default function Answer(props) {

    const styles = props.isSelected ? {backgroundColor: "green"} : {backgroundColor: "white"}

    return (
        <>
            <button className="answer" 
            style={styles} 
            onClick={props.onClick} 
            >{props.answer}</button>
        </>
    )
}