"use strict";
class AddressAttribute {
    id;
    _name;
    _div;
    _icon;
    constructor(option) {
        this.id = option.id;
        this._name = option.name;
    }

    Update(attribute) {
        this._setDiv();
        this._setIcon();

        if (attribute) {
            this._setCheck(attribute);
        }
    }

    GetAttribute() {
        if (this._div != null) {
            return this._div.innerText;
        }
    }

    _setDiv() {
        if (this._div == null) {
            const divs = document.querySelectorAll("div.col-lg-12.col-md-12.col-sm-12.col-xs-12");
            for (const d of divs) {
                if (d.innerText.toUpperCase() == this._name.toUpperCase()) {
                    this._div = d.nextElementSibling;
                    break;
                }
            }
        }

        this._setDivDefault();
    }

    _setDivDefault() {
        if (this._div == null) { return; }

        this._div.title = "";
        this._div.className = "col-lg-12 col-md-12 col-sm-12 col-xs-12 divAttribute";
    }

    _setIcon() {
        if (this._div == null) { return; }

        if (this._icon == null) {
            this._icon = document.createElement("i");
            this._icon.id = this.id;
            this._div.appendChild(this._icon);
        }

        this._setIconDefault();
    }

    _setIconDefault() {
        if (this._icon != null) {
            this._icon.className = "iconAttribute";
        }
    }

    _setCheck(attribute) {
        if (attribute == null) { return; }
        if (this._div == null) { return; }

        const exact = this._div.innerText == attribute
        this._div.className += exact ? " divAttributeTrue" : " divAttributeFalse";
        this._div.title = attribute;
        this._setImageCheck(exact);
    }

    _setImageCheck(isCheck) {
        this._icon.className += " showIcon";
        this._icon.className += isCheck ? " fa fa-check-circle" : " fa fa-exclamation-circle";
    }
}