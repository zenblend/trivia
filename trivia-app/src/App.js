import React from "react"
import Question from "./Question"
import Answer from "./Answer"
import {shuffle, fixText} from "./functions"

export default function App() {

    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
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

    const theseQuestions = questions.map((quest, idx) => {

        let arr = []

        for(let i = 0; i < quest.allAnswers.length; i++){
            arr.push(
                <Answer 
                    answer={fixText(quest.allAnswers[i].answer)}
                    onClick={ () => handleClick(quest.allAnswers[i].id)}
                    key={"ia" + idx + i}
                    isSelected={quest.allAnswers[i].isSelected}
                />
            )
        }

        return (
            <div key={"main" + idx}>
                <Question 
                    question={fixText(quest.question)} 
                    key={"q" + idx}
                />
                <div id="answer-wrapper">
                    {arr}
                </div>
            </div>
        )
    })

    return (
        <React.StrictMode>
        <main id="main">
            <div id="question-container">
                {theseQuestions}
            </div>
        </main>
        </React.StrictMode>
    )
}