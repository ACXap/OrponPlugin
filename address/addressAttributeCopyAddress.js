"use strict";
class AddressAttributeCopyAddress extends AddressAttribute {
    _copyService;

    constructor(option, copyService) {
        super(option);

        this._copyService = copyService;
    }

    Update() {
        this._setDiv();
    }

    _setDiv() {
        if (this._div == null) {
            this._div = document.createElement("a");
            this._div.className = "btns btn-primarys btn-lg";
            this._div.innerText = this._name;
            this._div.title = "Скопировать адрес и ГИД";
            document.querySelector("div.tab-panel-tabs").appendChild(this._div);
            this._div.onclick = () => this._copyService.copy();
        }
    }
}