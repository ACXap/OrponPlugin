"use strict";
class AddressAttributeCopyAddress extends AddressAttribute {
    constructor(option) {
        super(option);
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
            this._div.onclick = () => {
                const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
                const h = document.querySelector("i.fa.fa-building.blue");
                if (divs && h) {
                    const adr = h.parentElement.innerText.split("\n")[0];
                    const gid = divs[1].innerText;
                    if (adr.length > 0 && gid.length > 0) {
                        navigator.clipboard.writeText(`Адрес: ${adr}\nГИД: ${gid}`);
                    }
                    else {
                        navigator.clipboard.writeText("Увы тут нет адреса");
                    }
                }
            };
        }
    }
}