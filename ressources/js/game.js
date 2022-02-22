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
        question: 'Comment exprime-t-on la capacité d\'un disque dur ?',
        choice1: 'En Mo',
        choice2: 'En o',
        choice3: 'En Ko',
        choice4: 'En Go',
        answer: 4,
    },
    {
        question: 'Que désigne le mot anglais "hardware" utilisé en informatique ?',
        choice1: 'L\'utilisation de l\'ordinateur comme outil de formation',
        choice2: 'L\'ensemble des parties matérielles de l\'ordinateur',
        choice3: 'La difficulté de programmer un ordinateur',
        choice4: 'L\'unité centrale de l\'ordinateur',
        answer: 2,
    },
    {
        question: 'Devinette :  Je suis petit et carré. J\'ai des picots dorés. Je permet d\'éxécuter plusieur processus en même temps. Qui suis-je ?',
        choice1: 'Barette de RAM',
        choice2: 'Processeur',
        choice3: 'Disque Dur',
        choice4: 'Carte Graphique',
        answer: 2,
    },
    {
        question: 'Quel matériel permet le stockage des données en grande capacité ?',
        choice1: 'Le Disque Dur',
        choice2: 'La carte mère',
        choice3: 'La mémoire vive',
        choice4: 'Le processeur',
        answer: 1,
    },
    {
        question: 'Devinette : Je suis un petit composant permettant au BIOS d\'être toujours à l\'heure. Ma valeur de mesure doit toujours être au dessus de 2.80. Qui suis-je ?',
        choice1: 'Barette de Ram',
        choice2: 'Ventirad',
        choice3: 'Pile',
        choice4: 'Condansateur',
        answer: 3,
    },
    {
        question: 'Devinette : Je sers à connecter l\'unité centrale à un écran. Mes embouts sont identiques et sont de couleur bleu. Qui suis-je ?',
        choice1: 'Câble RJ-45',
        choice2: 'Câble VGA',
        choice3: 'Câble HDMI',
        choice4: 'Câble SATA',
        answer: 2,
    },
    {
        question: 'Devinette : Je constitue la mémoire vive de l\'ordinateur. Je permet d\'avoir plusieurs applications actives en même temps. Qui suis-je ?',
        choice1: 'SSD',
        choice2: 'Processeur',
        choice3: 'Carte Graphique',
        choice4: 'Barette de RAM',
        answer: 4,
    },
    {
        question: 'Que signifie UC ?',
        choice1: 'Unité Centrale',
        choice2: 'Universal Card',
        choice3: 'Université Centrale',
        choice4: 'Ultra Connecté',
        answer: 1,
    },
    {
        question: 'Complétez le nom de ce composant : Carte-...',
        choice1: '...Tante',
        choice2: '...Soeur',
        choice3: '...Mère',
        choice4: '...Frère',
        answer: 3,
    },
    {
        question: 'Quel est le périphérique qui permet de selectionner et de pointer les élements affichés sur l\'écran ?',
        choice1: 'Clavier',
        choice2: 'Casque',
        choice3: 'Souris',
        choice4: 'Micro',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} sur ${MAX_QUESTIONS}`
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
    score+=num
    scoreText.innerText = score
}

startGame()