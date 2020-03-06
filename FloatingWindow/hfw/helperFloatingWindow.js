"use strict";

/**
 * Класс отвечающий за связь модели с вью
 */
class HelperFloatingWindow {
    _model;
    _view;
    _modules;

    // Событие по смене координат окна
    onChangedCoordinate;

    constructor(option) {
        this._model = option.model;
        this._view = option.view;
        this._modules = option.modules ? option.modules : [];

        // Подпись на событие во вью по смене координат
        this._view.onChangedCoordinate = (t, l) => {
            if (this.onChangedCoordinate) {
                this.onChangedCoordinate(t, l);
            }
        }
    }

    /**
     * Метод по добавлению во вью html элемента (модуля)
     * @param {*} module html элемент модуля
     */
    addModule(module, index) {
        this._view.addElement(module.getHtmlModule(), index);

        // Подпись на событие загрузки данных в модуль
        module.onLoadData = this._loadData.bind(this);

        // Подпись на событие открытия модуля
        module.onOpen = this._openModule.bind(this);

        this._modules.push(module);
    }

    /**
     * Метод для закрытия всех модулей при открытии конкретного по id
     * @param {string} id Идентификатор модуля
     */
    _openModule(id) {
        this._modules.filter(m => m.id != id).forEach(m => m.closeBody());
    }

    _loadData(callBack) {
        this._model.getTextFromFile(callBack);
    }
}