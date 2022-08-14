import React from "react"
import Question from "./Question"
import Answer from "./Answer"

export default function App() {

    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(data => {setQuestions(data.results)})
    }, [])
    
    function fixText(str){
        return str.replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
            .replace(/&eacute;/g, 'é')
            .replace(/&amp;/g, '&')
    }

    function shuffle(arr){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    function handleClick(){
        
    }

    const theseQuestions = questions.map((quest, idx) => {

        let arr = []

        for(let i = 0; i < 3; i++){
            arr.push(
                <Answer 
                    answer={fixText(quest.incorrect_answers[i])}
                    onClick={handleClick}
                    key={"ia" + idx + i}
                />
            )
        }
        
        arr.push(
            <Answer 
                answer={fixText(quest.correct_answer)}
                onClick={handleClick}
                key={"ca" + idx}
            />
        )

        shuffle(arr)

        return (
            <div key={"main" + idx}>
                <Question 
                    question={
                        fixText(quest.question)
                    } 
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