
export default function ValidQuestion(question, numOfAnswers) {
    return (question.title === '' ||
        question.description === '' ||
        question.answers.length !== numOfAnswers ||
        !question.answers.some(a => a.txt === question.correctAnswer) ||
        question.answers.length !== new Set(question.answers.map(a => a.txt)).size) ? false : true;
}