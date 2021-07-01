import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <div class="left_text"><p class="Text">"Une Nouvelle façon de partager le monde"</p></div>
            <div class="circle"></div>
            <img class="illustration" src="./static/img/face.svg">
        `;
    }
}