"use strict";
class AddressAttributeTypeAddress extends AddressAttribute {
    constructor(option) {
        super(option)
    }

    _setDiv() {
        const divs = document.querySelectorAll("div.col-lg-12.col-md-12.col-sm-12.col-xs-12");
        this._div = divs[6];

        this._setDivDefault();
    }
}