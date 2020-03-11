"use strict";

class EditAddressModuleView extends ListAddressModuleView {

    constructor(option, text) {
        super(option, text);
    }

    /**
    * Метод выполняющий основное действие модуля
    * @param {*} data Текущий элемент из коллекции
    */
    execute(data) {
        if (data) {
            if (!isNaN(data.CurrentElement) && data.CurrentElement != "") {
                this._elementOpenPage.href = data.href;
                this._elementOpenPage.click();
            }
            this.update(data);

            const autoExecute = this._elementHtml.querySelector("#autoExecute");
            if (autoExecute && autoExecute.checked) {
                const a = document.querySelectorAll("a.btn.btn-secondary-a.btn-primary-blue");
                if (a && a.length > 0) {
                    for (const d of a) {
                        if (d.innerText === "Подтвердить заявку") {
                            console.log(d);
                            //d.click();
                            break;
                        }
                    }
                }
            }
        }
    }
}