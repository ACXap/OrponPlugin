"use strict";

/**
 * Класс отвечающий за представление элементов в плавающем окне
 */
class HelperFloatingWindowView extends FloatingWindow {

    constructor({ top, left }) {
        super();
        this._elementHtml = document.createElement("div");
        this._elementHtml.id = "helperFloatingWindow";
        this._elementHtml.style.cssText = `top:${top ? top : "100px"};left:${left ? left : "100px"}`;

        const divH = document.createElement("div");
        divH.id = "helperFloatingWindowHeader";
        divH.className = "noneSelect";
        divH.innerText = "Помощник ОРПОН";
        const i = document.createElement("i");
        i.id = "openBodyHelper";
        i.className = "fa fa-angle-down";
        divH.appendChild(i);
        const divB = document.createElement("div");
        divB.id = "helperFloatingWindowBody";
        divB.className = "bodyHelper";

        this._elementHtml.appendChild(divH);
        this._elementHtml.appendChild(divB);

        document.body.insertBefore(this._elementHtml, document.body.firstChild);

        this.dragElement();

        const openBody = this._elementHtml.querySelector("#openBodyHelper");
        openBody.onclick = () => {
            openBody.classList.toggle("rotate180");
            this._elementHtml.querySelector("#helperFloatingWindowBody").classList.toggle("showModule");
        }
    }

    /**
     * Метод для добавления модуля в окно
     * @param {*} html Сформированный html элемент модуля
     */
    addElement(html, index) {
        const b = this._elementHtml.querySelector("#helperFloatingWindowBody");
        b.insertBefore(html, b.children[index]);
    }
}