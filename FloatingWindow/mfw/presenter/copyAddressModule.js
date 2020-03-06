"use strict";

class CopyAddressModule extends ModuleFloatingWindow {

    constructor(option) {
        super(option);
        this._view.onCopyShotInfo = (text, type) => {

            let adr = "Увы, тут нет адреса";
            if (type === "copyAddressGid") if (text && text.length > 0) adr = `Адрес: ${text[0]}\nГИД: ${text[1]}`;
            if (type === "copyGidAddress") if (text && text.length > 0) adr = `ГИД: ${text[1]}\nАдрес: ${text[0]}`;

            navigator.clipboard.writeText(adr);
            this._view.showAddressNotFound(adr);
        }
    }
}