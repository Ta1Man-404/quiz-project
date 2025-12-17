import {UrlManager} from "../utils/url-manager.js";

export class CorrectAnswers {
    constructor() {
        this.containerElement = null;
        this.chosenAnswersId = [];

        this.routeParams = UrlManager.getQueryParams();
        const that_3 = this.routeParams;

        if (this.routeParams.id) {
            this.quiz = this.getData('GET', 'https://testologia.ru/get-quiz?id=' + that_3.id);
            this.quizRight = this.getData('GET', 'https://testologia.ru/get-quiz-right?id=' + that_3.id);

            document.getElementById('completeBy').innerText = that_3.name + ' ' + that_3.lastname + ', ' + that_3.email;

            that_3.chosenAnswersId.split(',').forEach(item => {
                this.chosenAnswersId.push(+item);
            });

            this.pagePrepare();
        } else {
            // location.href = '#/';
        }

        document.getElementById('backToScoreBtn').onclick = function () {
            history.back();
        };
    }

    getData(method, url, testId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + testId, false);
        xhr.send();

        if (xhr.status === 200 && xhr.responseText) {
            try {
                return (JSON.parse(xhr.responseText));
            } catch (e) {
                location.href = '#/';
            }
        }
    }

    pagePrepare() {
        this.containerElement = document.getElementById('container');
        this.buildQuestions();
    }

    buildQuestions() {
        document.getElementById('test-title').innerText = this.quiz.name;

        const that = this.quiz;
        const that_2 = this.quizRight;
        const chosenAnswersId = this.chosenAnswersId;

        console.log(that);
        console.log(that_2);
        console.log(chosenAnswersId);

        that.questions.forEach((questionItem, questionIndex) => {

            const corAnsQuestion = document.createElement('div');
            corAnsQuestion.setAttribute('class', 'correctAnswers-question');
            corAnsQuestion.setAttribute('id', 'corAnsQuestion');

            const questionTitleElement = document.createElement('div');
            questionTitleElement.setAttribute('id', 'title');
            questionTitleElement.setAttribute('class', 'correctAnswers-question-title');
            questionTitleElement.innerHTML = `<span>Вопрос ${questionIndex + 1}:</span> ${questionItem.question}`;

            const corAnsOptions = document.createElement('div');
            corAnsOptions.setAttribute('id', 'options');
            corAnsOptions.setAttribute('class', 'correctAnswers-options');

            const corAnsOption = document.createElement('div');
            corAnsOption.setAttribute('class', 'correctAnswers-option');

            corAnsOptions.appendChild(corAnsOption);

            questionItem.answers.forEach(answer => {
                const optionGroupElement = document.createElement('div');
                optionGroupElement.setAttribute('class', 'option-group');

                if (answer.id === chosenAnswersId[questionIndex]) {
                    const chosenAnswerId = answer.id;
                    optionGroupElement.classList.add(chosenAnswerId === that_2[questionIndex] ? 'correct' : 'wrong');
                }

                const inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('class', 'option-answer')
                inputElement.setAttribute('id', 'answer-' + answer.id);

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', 'answer-' + answer.id);
                labelElement.innerText = answer.answer;

                optionGroupElement.appendChild(inputElement);
                optionGroupElement.appendChild(labelElement);

                corAnsOption.appendChild(optionGroupElement);
            })

            corAnsOptions.appendChild(corAnsOption);

            corAnsQuestion.appendChild(questionTitleElement);
            corAnsQuestion.appendChild(corAnsOptions);

            this.containerElement.appendChild(corAnsQuestion);
        });
    }
}