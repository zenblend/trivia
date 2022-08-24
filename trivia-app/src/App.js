import React from "react"
import Question from "./Question"
import Answer from "./Answer"

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
                question: obj.question
            }
        })))
    }, [])

    function shuffle(arr){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    function fixText(str){
        return str.replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
            .replace(/&eacute;/g, 'é')
            .replace(/&amp;/g, '&')
            .replace(/&Uuml;/g, 'Ü')
    }

    //give question it's own ID (use index) and check passedID[2] against 
    //question ID - if they match, return prevAnswer with isSelected: false,
    //otherwise just return prevAnswer with no modification
    function handleClick(passedID){
        console.log(passedID)

        setQuestions(
            questions.map(prevQuestion => {
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
            })
        )
    }

    const theseQuestions = questions.map((quest, idx) => {

        let arr = []

        for(let i = 0; i < 4; i++){
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
                    {arr[0]}
                    {arr[1]}
                    {arr[2]}
                    {arr[3]}
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