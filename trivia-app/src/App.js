import React, { useState, useEffect } from "react"
import Question from "./Question"
import Answer from "./Answer"
import {shuffle, fixText} from "./functions"

export default function App() {

    const [questions, setQuestions] = useState([])
    const [clickEnabled, setClickEnabled] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const [warningText, setWarningText] = useState('')
    const [scoreText, setScoreText] = useState('')


    useEffect(() => {

        fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(data => setQuestions(data.results.map((obj, index) => {

            let answers = []

            for(let i = 0; i < obj.incorrect_answers.length; i++){
                answers.push({
                    answer: obj.incorrect_answers[i],
                    isSelected: false,
                    id: 'ia' + index + i
                })
            }

            answers.push({
                answer: obj.correct_answer,
                isSelected: false,
                id: 'ca' + index
            })

            shuffle(answers)

            return {
                allAnswers: answers,
                question: obj.question,
                id: '' + index
            }
        })))
    }, [])

    function handleClick(passedID){
        console.log(passedID)
        setQuestions(
            questions.map(prevQuestion => {
                if(prevQuestion.id === passedID[2]){
                    return {
                        ...prevQuestion,
                        allAnswers: prevQuestion.allAnswers.map(prevAnswer => {
                            if(prevAnswer.id === passedID){
                                return {
                                    ...prevAnswer,
                                    isSelected: !prevAnswer.isSelected
                                }
                            }else{
                                return {
                                    ...prevAnswer,
                                    isSelected: false
                                }
                            }
                        })
                    }
                }else{
                    return prevQuestion
                }
            })
        )
    }

    function handleSubmit() {
        let count = 0

        for(let i = 0; i < questions.length; i++){
            if(questions[i].allAnswers.filter(answer => answer.isSelected).length !== 1){
                count++
            }
        }

        if(count === 0){
            const score = questions.filter(question => 
                            question.allAnswers.filter(answer => 
                                answer.isSelected && answer.id[0] === 'c').length === 1
                        ).length

            setScoreText(`You got ${score} correct out of 10`)
            setClickEnabled(false)
            setSubmitted(true)
            window.scrollTo({top: 0})
        }else{
            setWarningText(`You did not select ${count} answers`)
        }
    }

    function handleStartOver() {
        window.location.reload()
    }

    const theseQuestions = questions.map((quest, idx) => {

        let arr = []

        for(let i = 0; i < quest.allAnswers.length; i++){
            arr.push(
                <Answer 
                    answer={fixText(quest.allAnswers[i].answer)}
                    onClick={ clickEnabled ? () => handleClick(quest.allAnswers[i].id) : undefined}
                    key={quest.allAnswers[i].id}
                    isSelected={quest.allAnswers[i].isSelected}
                />
            )
        }

        return (
            <div key={"main" + idx}>
                <Question 
                    question={fixText(quest.question)} 
                    key={"q" + quest.id}
                />
                <div id="answer-wrapper">
                    {arr}
                </div>
            </div>
        )
    })

    return (
        <main id="main">
            {submitted && 
                <h1 className="score">{scoreText}</h1>
            } 
            {submitted &&
                <button
                    className="again"
                    onClick={handleStartOver}>Try Again?
                </button>    
            }
                <div id="question-container">
                    {theseQuestions}
                </div>
            {!submitted && 
                <h1 className="warning">{warningText}</h1>
            }
            {!submitted && 
                <button 
                    className="submit" 
                    onClick={handleSubmit}>Submit Answers
                </button>
            }
        </main>
    )
}