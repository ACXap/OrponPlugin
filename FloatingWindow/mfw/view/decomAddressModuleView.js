"use strict";

class DecomAddressModuleView extends ListAddressModuleView {

    _url = "#details/decommissioned?code=";

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
                this._elementOpenPage.href = `${this._url}${data.CurrentElement}&level=8`;
                this._elementOpenPage.click();
            }
            this.update(data);
        }
    }
}