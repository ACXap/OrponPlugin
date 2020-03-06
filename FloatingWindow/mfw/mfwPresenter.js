"use strict";
/**
 * Класс для связи вью и модели
 */
class ModuleFloatingWindow {
    _model;
    _view;

    /** @public Идентификатор модуля */
    id;

    /** @public Событие открытия модуля */
    onOpen;
    /** @public Событие закрытия модуля */
    onClose;

    constructor(option) {
        this.id = option.id;
        this._model = option.model;
        this._view = option.view;

        // Подпись на событие открытия модуля
        this._view.onOpen = this._handlerOpenBody.bind(this);
        // Подпись на событие закрытия модуля
        this._view.onClose = this._handlerCloseBody.bind(this);
    }

    /**
     * Метод-обработчик события открытия модуля
     */
    _handlerOpenBody() {
        this.onOpen(this.id);
    }

    /**
    * Метод-обработчик события закрытия модуля
    */
    _handlerCloseBody() {
        //this.onClose();
    }

    /**
     * Метод открытия модуля
     */
    openBody() {
        this._view.openBody();
    }

    /**
     * Метод закрытия модуля
     */
    closeBody() {
        this._view.closeBody();
    }

    /**
     * Метод получения html элемента модуля
     */
    getHtmlModule() {
        return this._view._elementHtml;
    }
}