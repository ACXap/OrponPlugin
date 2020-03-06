"use strict";

class EditAddressModuleView extends ListAddressModuleView {

    _url = "#requests/edit?";

    constructor(option) {
        super(option);
    }

    /**
    * Метод выполняющий основное действие модуля
    * @param {*} data Текущий элемент из коллекции
    */
    execute(data) {
        if (data) {
            if (!isNaN(data.CurrentElement) && data.CurrentElement != "") {
                this._elementOpenPage.href = `${this._url}${data.CurrentElement}`;
                this._elementOpenPage.click();
            }
            this.update(data);
        }
    }
}