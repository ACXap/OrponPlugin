"use strict";
/**
 * Класс отвечающий за вид модуля
 */
class ModuleFloatingWindowView {
    _elementHtml;

    _eventPressHotKey = this._handlerPressHotKey.bind(this);

    /** @public Событие открытия модуля */
    onOpen;
    /** @public Событие закрытия модуля */
    onClose;

    constructor(option) {
        this._elementHtml = document.createElement("div");
        //this._elementHtml.id = option.id;
        this._elementHtml.className = "divHelperModules";
        this._elementHtml.innerHTML = option;

        // Открыть - Закрыть тело модуля
        this._elementHtml.querySelector("section.sectionHeader").onclick = () => this._handlerClickHeader();
    }

    /**
     * Метод-обработчик события нажатия на заголовок модуля (закрыть - открыть)
     */
    _handlerClickHeader() {
        const b = this._elementHtml.querySelector("section.bodyHelper");

        if (b.classList.contains("showModule")) {
            this.onClose();
            this.closeBody();
        }
        else {
            this.onOpen();
            this.openBody();
        }
    }

    /**
     * Метод закрытия модуля
     */
    closeBody() {
        const b = this._elementHtml.querySelector("section.bodyHelper");
        b.classList.toggle("showModule", false);
        document.removeEventListener("keydown", this._eventPressHotKey);
    }

    /**
     * Метод открытия модуля
     */
    openBody() {
        const b = this._elementHtml.querySelector("section.bodyHelper");
        b.classList.toggle("showModule", true);
        document.addEventListener("keydown", this._eventPressHotKey);
    }

    /**
     * Метод-обработчик события нажатия горячей клавиши
     */
    _handlerPressHotKey(e) {

    }

    setId(id) {
        this._elementHtml.id = id;
    }

    /**
     * Метод отображения подсказки при отсутствии данных
     * @param {string} text Сообщение подсказки
     */
    showAddressNotFound(text) {
        const s = this._elementHtml.querySelector("span.popupTextAddressNotFound");
        s.innerText = text;

        const coord = this._elementHtml.getBoundingClientRect();
        if (coord.left > 1000) {
            s.className += " notFoundLeft";
        }
        else {
            s.className += " notFoundRight";
        }

        this._elementHtml.querySelector("div.popupAddressNotFound").className += " showElement";
        window.setTimeout(() => {
            s.innerText = "";
            s.className = "popupTextAddressNotFound";
            this._elementHtml.querySelector("div.popupAddressNotFound").className = "popupAddressNotFound";
        }, 2000);
    }
}