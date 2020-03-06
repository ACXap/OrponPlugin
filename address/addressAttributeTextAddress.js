"use strict";
class AddressAttributeTextAddress extends AddressAttribute {
    _addressByFiasElement;

    constructor(option) {
        super(option);
    }

    Update(attribute, isPossible) {
        this._setDiv();

        if (attribute) {
            this._addressByFiasElement.innerText = attribute;
            this._addressByFiasElement.className += isPossible ? " textAddressPossible" : " textAddressExact";
        }
    }

    _setDiv() {
        if (this._div == null) {
            this._div = document.querySelector("i.fa.fa-building.blue").parentNode;
            this._addressByFiasElement = document.createElement("p");
            this._div.appendChild(this._addressByFiasElement);
        }

        this._setDivDefault();
    }

    _setDivDefault() {
        this._addressByFiasElement.innerText = "";
        this._addressByFiasElement.className = "textAddress";
    }
}