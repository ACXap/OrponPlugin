"use strict";
class SyncAdjacentSystem {

    _isCheck = false;
    _globalid = "";

    Update() {

        const d = document.querySelectorAll("div.col-lg-4.col-md-4.col-sm-6.col-xs-12");
        if (d.length > 0) {
            for (const div of d) {
                if (div.innerText == "Глобальный идентификатор") {
                    const id = div.nextElementSibling.innerText;
                    if (this._globalid != id) {
                        this._isCheck = false;
                        this._globalid = id;
                        break;
                    }
                }
            }
        }

        if (this._isCheck) return;

        const divs = document.querySelectorAll("div.checkbox-panel");
        if (divs.length > 0) {
            for (const div of divs) {
                if (div.innerText == "Синхронизировать со смежными системами") {
                    if (!this._isCheck) {
                        div.click();
                        const d = div.querySelectorAll("div.fa.orpon-form-widget.checkbox-icon.fa-square-o");

                        if (d != null && d.length > 0) {
                            this._isCheck = true;
                            return;
                        }
                    }
                }
            }
        }
    }

    Reset() {
        this._isCheck = false;
        this._globalid = "";
    }
}