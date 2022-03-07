const question = document.querySelector('#question');
const audio = document.querySelector('#wav');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const btn = document.querySelector('#next');
if(document.querySelector('#mode')){
    let input = document.querySelector('#mode');
    let mode = input.value;
    let next = document.querySelector('.next');
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Que veut dire CSS ?',
        choice1: 'Cascading Style Sheet',
        choice2: 'Centre Source du Style',
        choice3: 'C\'est super simple',
        choice4: 'Choucroute et saucisse d\'Alsace',
        answer: 1,
    },
    {
        question: 'Que veut dire HTML ?',
        choice1: 'Haut Traitement de Marque de Language',
        choice2: 'HyperText Markup Language',
        choice3: 'HyperTraitment Mouvment Linear',
        choice4: 'Haute Tension de Mouvement de Ligne',
        answer: 2,
    },
    {
        question: 'Je veux ajouter un lien qui redirige vers le site de pole emploi, comment dois-je l\'exprimer en HTML ?',
        choice1: '<a href="#">https://www.pole-emploi.fr/</a>',
        choice2: 'https://www.pole-emploi.fr/',
        choice3: '<a href="https://www.pole-emploi.fr/">Pole Emploi</a>',
        choice4: 'Pole Emploi',
        answer: 3,
    },
    {
        question: 'Où est-il conseillé de placer le code CSS ?',
        choice1: 'Dans une famille d\'acceuil',
        choice2: 'Entre les balises <head>, c\'est bien plus simple',
        choice3: 'Dans le Javascript, c\'est bien plus beau',
        choice4: 'Dans un fichier externe, c\'est bien plus clair',
        answer: 4,
    },
    {
        question: 'Qu\'est-ce que le développement web ?',
        choice1: 'Ca fait référence au processus de création d\'un site web',
        choice2: 'C\'est le fait de créer un réseau internet',
        choice3: 'C\'est un navigateur web',
        choice4: 'La réponse 4',
        answer: 1,
    },
    {
        question: 'A quoi sert le HTML ?',
        choice1: 'A structurer la page web',
        choice2: 'A manger des sushis',
        choice3: 'A styliser la page web',
        choice4: 'A donner des instructions à la page web',
        answer: 1,
    },
    {
        question: 'A quoi sert le CSS ?',
        choice1: 'A manger Royal',
        choice2: 'A structurer une page web',
        choice3: 'A styliser la page web',
        choice4: 'A donner des instructions à la page web ',
        answer: 3,
    },
    {
        question: 'Que fait le navigateur ?',
        choice1: 'Il interprète le HTML et le CSS',
        choice2: 'Il cherche des filles autour de chez toi',
        choice3: 'Il lance des programmes informatiques',
        choice4: 'Il fait des calculs mathématique',
        answer: 1,
    },
    {
        question: '<DOCTYPE...> indique ? ',
        choice1: 'la version du HTML utilisée',
        choice2: 'Le type dedocument',
        choice3: 'La page de code utilisée pour le document',
        choice4: 'Les paramètre régionaux et langage du document',
        answer: 1,
    },
    {
        question: 'Quelle balise utiliser pour regrouper les champs d\'un formulaire en les entourant d\'une bordure ?',
        choice1: '<groupby>',
        choice2: '<form>',
        choice3: '<fieldset>',
        choice4: '<border>',
        answer: 2,
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
        return window.location.assign('end.html')
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

        if(document.querySelector('#mode')){
            document.querySelector('.next').style.display = "block"; 
        }else{
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }
        
    })

    
    
})

    
if(document.querySelector('#mode')){
    if(mode.value === 'anim'){
    btn.addEventListener('click', e => {
        const choice = document.querySelector('.correct') || document.querySelector('.incorrect')

        choice.classList.remove('correct')
        choice.classList.remove('incorrect')
        document.querySelector('.next').style.display = 'none'
        getNewQuestion()
        
    });
}
}
    incrementScore = num => {
    score+=num
    scoreText.innerText = score
}



startGame()