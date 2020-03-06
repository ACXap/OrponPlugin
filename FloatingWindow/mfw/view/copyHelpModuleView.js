"use strict";

class CopyHelpModuleView extends ListAddressModuleView {

    _eventPressEnter = new KeyboardEvent("keyup", { view: window, keyCode: 13, bubbles: true, cancelable: true });

    constructor(option) {
        super(option);
    }

    /**
    * Метод выполняющий основное действие модуля
    * @param {*} data Текущий элемент из коллекции
    */
    execute(data) {
        if (data) {
            this._inputFocus.value = data.CurrentElement;
            this._inputFocus.dispatchEvent(this._eventPressEnter);
            this.update(data);
        }
    }
}