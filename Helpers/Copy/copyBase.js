"use strict";
class CopyBase {

    copy() {

    }

    _getAddress() {
        const h = document.querySelector("i.fa.fa-building.blue");

        if (h && h.length > 0) {
            return h.parentElement.innerText.split("\n")[0];
        }
        else {
            return "Новосибирская обл, Новосибирск г.";
        }
    }

    _getGid() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");

        if (divs && divs.length > 1) {
            return divs[1].innerText;
        }
        else {
            return "5203051"
        }
    }

    _getFias() {
        const divs = document.querySelectorAll("div.col-lg-12.col-md-12.col-sm-12.col-xs-12");

        for (const d of divs) {
            if (d.innerText === "Идентификатор ФИАС") {
                return d.nextElementSibling.innerText;
            }
        }
    }
}

class CopyAddressGidTwoRow extends CopyBase {
    id = "addressGidTwoRow";

    copy() {
        return `Адрес: ${this._getAddress()}\nГИД: ${this._getGid()}`;
    }
}

class CopyGidAddressTwoRow extends CopyBase {
    id = "gidAddressTwoRow";

    copy() {
        return `ГИД: ${this._getGid()}\nАдрес: ${this._getAddress()}`;
    }
}

class CopyAddressGidOneRow extends CopyBase {
    id = "addressGidOneRow";

    copy() {
        return `Адрес: ${this._getAddress()}\tГИД: ${this._getGid()}`;
    }
}

class CopyGidAddressOneRow extends CopyBase {
    id = "gidAddressOneRow";

    copy() {
        return `ГИД: ${this._getGid()}\tАдрес: ${this._getAddress()}`;
    }
}

class CopyAddressGidTwoRowNoText extends CopyBase {
    id = "addressGidTwoRowNoText";

    copy() {
        return `${this._getAddress()}\n${this._getGid()}`;
    }
}

class CopyGidAddressTwoRowNoText extends CopyBase {
    id = "gidAddressTwoRowNoText";

    copy() {
        return `${this._getGid()}\n${this._getAddress()}`;
    }
}

class CopyAddressGidOneRowNoText extends CopyBase {
    id = "addressGidOneRowNoText";

    copy() {
        return `${this._getAddress()}\t${this._getGid()}`;
    }
}

class CopyGidAddressOneRowNoText extends CopyBase {
    id = "gidAddressOneRowNoText";

    copy() {
        return `${this._getGid()}\t${this._getAddress()}`;
    }
}

class CopyCustom extends CopyBase {
    id = "custom";
    args = "";

    constructor(args) {
        super();
        this.args = args;
    }

    copy() {
        const str = [];

        for (var i = 0; i < this.args.length; i++) {
            const el = this.args.charAt(i);

            if (el === "A") {
                str.push(this._getAddress());
            } else if (el === "G") {
                str.push(this._getGid());
            } else if (el === "F") {
                str.push(this._getFias());
            } else if (el === "n") {
                str.push("\n");
            } else if (el === "t") {
                str.push("\t");
            }
            else {
                str.push(el);
            }
        }

        return str.join("");
    }
}