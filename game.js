const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'How many beats does this note take 🎵' ,
        choice1: '3',
        choice2: '4',
        choice3: '2',
        choice4: '1',
        answer: 4,
    },
    {
        question: "What is piano?",
        choice1: "Loud",
        choice2: "Moderately Loud",
        choice3: "Quiet",
        choice4: "Moderately quiet",
        answer: 3,
    },
    {
        question: "What is decrescendo?",
        choice1: "Gradually getting slower",
        choice2: "Gradually getting quicker",
        choice3: "Quiet",
        choice4: "Gradually getting quieter",
        answer: 4,
    },
    {
        question: "What is forte?",
        choice1: "Very loud",
        choice2: "Loud",
        choice3: "very quiet",
        choice4: "moderately quiet",
        answer: 2,
    },
    {
        question: "What is crescendo",
        choice1: "Gradually getting quieter",
        choice2: "Slower",
        choice3: "Gradually getting louder",
        choice4: "Faster",
        answer: 3,
    },
    {
        question: "What is ritardando?",
        choice1: "Gradually getting slower",
        choice2: "Holding a note",
        choice3: "Ending of a song",
        choice4: "Gradually getting faster",
        answer: 1,
    },
    {
        question: "What is pianissimo?",
        choice1: "Very quiet",
        choice2: "Quiet",
        choice3: "Loud",
        choice4: "Very loud",
        answer: 1
    },
    {
        question: "What is pp?",
        choice1: "Very Loud",
        choice2: "Very quiet",
        choice3: "Crescendo",
        choice4: "Decrescendo",
        answer: 2,
    },
    {
        question: "What is ff?",
        choice1: "Very Loud",
        choice2: "Very quiet",
        choice3: "Crescendo",
        choice4: "Decrescendo",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 9

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
