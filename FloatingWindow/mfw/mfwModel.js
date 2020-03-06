"use strict";
/**
 * Класс отвечающий за модель модулей по работе с данными из списков
 */
class ModuleFloatingWindowModel {
    _data = [];
    _countElement = 0;
    _countLeftElement = 0;
    _nextElement = "";
    _currentElement = "";
    _currentIndex = -1;
    _previousElement = "";
    _noData = "Нет данных";

    /**
     * Конструктор класс
     * @param {*} data Коллекция данных
     */
    constructor(data) {

        this._data = data ? data.split("\n") : [];
        this._initProperty();
    }

    _initProperty() {
        if (this._data != null && this._data.length > 0) {
            this._countElement = this._data.length;
            this._countLeftElement = this._countElement;
            this._nextElement = this._data[this._countElement - this._countLeftElement];
            this._currentElement = this._noData;
            this._previousElement = this._noData;
            this._currentIndex = -1;
        }
    }

    /**
     * Метод для получения данных из коллекции по индексу
     * @param {int} index Индекс элемента
     */
    _getData(index) {
        const d = this._data[index];
        if (d != null) return d;
        return this._noData;
    }

    _setElement(isForward = true) {
        const i = isForward ? 1 : -1;
        this._currentIndex = this._currentIndex + i;
        this._currentElement = this._getData(this._currentIndex);
        this._nextElement = this._getData(this._currentIndex + 1);
        this._previousElement = this._getData(this._currentIndex - 1);
        this._countLeftElement = this._countElement - this._currentIndex - 1;
    }

    /**
     * Метод для добавления данных в модель
     * @param {*} data Список строк разделенных переносом строки
     */
    SetData(data) {
        this._data = data.split("\n");
        this._initProperty();

        return this.GetProperty();
    }

    /**
     * Метод для получения элемента из коллекции
     */
    GetProperty() {
        return {
            CountElement: this._countElement,
            CountLeftElement: this._countLeftElement,
            NextElement: this._nextElement,
            CurrentElement: this._currentElement,
            PreviousElement: this._previousElement
        };
    }

    /**
     * Метод для получения следующего значения из коллекции
     */
    GetNextElement() {
        if (this._currentIndex < this._countElement - 1) {
            this._setElement();
            return this.GetProperty();
        }
    }

    /**
     * Метод для получения предыдущего значения из коллекции
     */
    GetPreviousElement() {
        if (this._currentIndex <= this._countElement && this._currentIndex > 0) {
            this._setElement(false);
            return this.GetProperty();
        }
    }
}