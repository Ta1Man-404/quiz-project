import {UrlManager} from "../utils/url-manager.js";

export class Result {

    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        const that = this.routeParams;

        if (this.routeParams.score !== null || this.routeParams.total !== null) {
            document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;
        } else {
            location.href = '#/';
        }

        document.getElementById('correctAnswerBtn').onclick = function () {
            location.href = '#/correctAnswers?name=' + that.name + '&lastname=' + that.lastname + '&email=' + that.email + '&id=' + that.id + '&chosenAnswersId=' + that.chosenAnswersId;
        }
    }
}


