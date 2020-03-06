"use strict";
class AddressAttributeJournal extends AddressAttribute {
    constructor(option) {
        super(option);
    }

    Update(attribute) {
        this._setDiv();

        if (attribute) {
            if (this._div != null) {
                const d = new Date();
                const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                this._div.href = `#admin/sync/journal?from=${date}%2000:00:00.000000000&globalId=${attribute}&`;
            }
        }
    }

    _setDiv() {
        if (this._div == null) {
            this._div = document.createElement("a");
            this._div.className = "btns btn-primarys btn-lg";
            this._div.innerText = this._name;
            this._div.title = "Журнал синхронизации за сегодня по адресу (в новом окне)";
            this._div.target = "_blank";
            document.querySelector("div.tab-panel-tabs").appendChild(this._div);
        }
    }
}