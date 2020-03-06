"use strict";
class CopyAddressModuleView extends ModuleFloatingWindowView {

    /** @public Событие копирования информации в буфер */
    onCopyShotInfo;

    constructor(option) {
        super(option);

        this._elementHtml.querySelector("#copyAddressGid").onclick = () => {
            this.onCopyShotInfo(this._getAddressGid(), "copyAddressGid");
        }

        this._elementHtml.querySelector("#copyGidAddress").onclick = () => {
            this.onCopyShotInfo(this._getAddressGid(), "copyGidAddress");
        }
    }

    /**
     * Метод получения данных о адресе
     */
    _getAddressGid() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
        const h = document.querySelector("i.fa.fa-building.blue");
        const adr = [];
        if (divs && h) {
            adr.push(h.parentElement.innerText.split("\n")[0]);
            adr.push(divs[1].innerText);
        }

        return adr;
    }
}