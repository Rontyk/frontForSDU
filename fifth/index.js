const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        correctAnswer: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = new Array(quizQuestions.length).fill(null);

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const content = document.getElementById('quiz-screen');
    content.classList.remove('fade-in');
    void content.offsetWidth;
    content.classList.add('fade-in');

    const questionObj = quizQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    questionObj.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.classList.add('option');

        if (selectedAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
            enableNextButton();
        }

        optionElement.onclick = () => selectOption(index, optionElement);
        optionsDiv.appendChild(optionElement);
    });

    toggleBackButton();
    disableNextButton();
}

function selectOption(index, element) {
    Array.from(document.getElementsByClassName('option')).forEach(option => {
        option.classList.remove('selected');
    });

    element.classList.add('selected');
    selectedAnswers[currentQuestionIndex] = index;

    enableNextButton();
}

function nextQuestion() {
    const questionObj = quizQuestions[currentQuestionIndex];
    if (selectedAnswers[currentQuestionIndex] === questionObj.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function toggleBackButton() {
    const backButton = document.getElementById('back-button');
    backButton.classList.toggle('hidden', currentQuestionIndex === 0);
}

function enableNextButton() {
    document.getElementById('next-button').disabled = false;
}

function disableNextButton() {
    document.getElementById('next-button').disabled = true;
}

function endQuiz() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score').textContent = `Your score: ${score} out of ${quizQuestions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = new Array(quizQuestions.length).fill(null); // Reset selected answers
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}