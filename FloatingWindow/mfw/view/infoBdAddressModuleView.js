"use strict";
class InfoBdAddressModuleView extends ModuleFloatingWindowView {

    _elementOpenPage;

    /** @public Событие копирования информации в буфер */
    onGetChildren;

    constructor(option) {
        super(option);

        this._elementHtml.querySelector("#getChildrenWithoutLid").onclick = () => {
            this.onGetChildren(this._getAddressGid(), "getChildrenWithoutLid");
        }

        this._elementOpenPage = document.createElement("a");
        this._elementOpenPage.target = "_blank";
    }

    /**
     * Метод получения глобального идентификатора
     */
    _getAddressGid() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
        if (divs) {

            return divs[1].innerText;
        }
    }

    /**
     * Метод выполняющий основное действие модуля
     * @param {*} data Текущий элемент из коллекции
     */
    execute(data) {
        if (data) {
            if (data) {
                this._elementOpenPage.href = data;
                this._elementOpenPage.click();
            }
        }
    }
}