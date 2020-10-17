"use strict";
class CopyBase {

    copy() {

    }

    _getAddress() {
        const h = document.querySelector("i.fa.fa-building.blue");
        const adr = h.parentElement.innerText.split("\n")[0];

        return adr;
    }

    _getGid() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
        const gid = divs[1].innerText;

        return gid;
    }

    _getFias() {
        const divs = document.querySelectorAll("div.col-lg-12.col-md-12.col-sm-12.col-xs-12");

        for (const d of divs) {
            if (d.innerText.toUpperCase() === "Идентификатор ФИАС") {
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