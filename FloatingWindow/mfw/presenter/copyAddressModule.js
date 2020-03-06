"use strict";

class CopyAddressModule extends ModuleFloatingWindow {
    // _model;
    // _view;

    // /** @public Идентификатор модуля */
    // id;

    // /** @public Событие открытия модуля */
    // onOpen;
    // /** @public Событие закрытия модуля */
    // onClose;

    constructor(option) {
        super(option);
        // this.id = option.id;
        // this._model = option.model;
        // this._view = option.view;

        //this._view.onOpen = () => this.onOpen(this.id);

        // // Подпись на событие открытия модуля
        // this._view.onOpen = this._handlerOpenBody.bind(this);
        // // Подпись на событие закрытия модуля
        // this._view.onClose = this._handlerCloseBody.bind(this);

        this._view.onCopyShotInfo = (text, type) => {

            let adr = "Увы, тут нет адреса";
            if (type === "copyAddressGid") if (text && text.length > 0) adr = `Адрес: ${text[0]}\nГИД: ${text[1]}`;
            if (type === "copyGidAddress") if (text && text.length > 0) adr = `ГИД: ${text[1]}\nАдрес: ${text[0]}`;

            navigator.clipboard.writeText(adr);
            this._view.showAddressNotFound(adr);
        }
    }

    // /**
    //  * Метод открытия модуля
    //  */
    // openBody() {
    //     this._view.openBody();
    // }

    // /**
    //  * Метод закрытия модуля
    //  */
    // closeBody() {
    //     this._view.closeBody();
    // }

    // /**
    // * Метод-обработчик события открытия модуля
    // */
    // _handlerOpenBody() {
    //     this.onOpen(this.id);
    // }

    // /**
    // * Метод-обработчик события закрытия модуля
    // */
    // _handlerCloseBody() {
    //     //this.onClose();
    // }

    // getHtmlModule() {
    //     return this._view._elementHtml;
    // }
}