"use strict";
class AddressAttributeMap extends AddressAttribute {
    _coordinateElement;
    _onOpenMap;

    constructor(option) {
        super(option);
        this._onOpenMap = option.onOpenMap;
    }

    Update(attribute) {
        this._setDiv();

        if (attribute) {
            this._setCheck(attribute);
        }
        else {
            const divs = document.querySelectorAll("div.no-margin.col-lg-12.col-md-12.col-sm-12.col-xs-12");
            for (const d of divs) {
                if (d.innerText.toUpperCase() == "Координаты".toUpperCase()) {
                    let coords = d.nextSibling.innerText;
                    if (coords[0] === "(") {
                        coords = coords.slice(1);
                        coords = coords.split(")")[0];
                    }
                    this._setCheck(coords);

                    break;
                }
            }
        }
    }
    _setDiv() {
        if (this._div == null) {
            const divs = document.querySelectorAll("div.no-margin.col-lg-12.col-md-12.col-sm-12.col-xs-12");
            for (const d of divs) {
                if (d.innerText.toUpperCase() == "Координаты".toUpperCase()) {
                    this._div = document.createElement("a");
                    this._div.className = "btns btn-primarys btn-lg iconAttribute";
                    this._div.style.cssText = "margin-top:-16px;";
                    this._div.innerHTML = '<l class="fa fa-map-marker red"></l> Карта';
                    this._div.title = "Карта";

                    d.nextElementSibling.appendChild(this._div);
                    break;
                }
            }
        }

        this._setDivDefault();
    }

    _setDivDefault() {
        if (this._div == null) { return; }
        this._div.className = "btns btn-primarys btn-lg iconAttribute";
    }

    _setCheck(attribute) {
        if (this._div == null || attribute.includes("Не определено")) {
            this._div.style.display = "none";
            return;
        }

        this._div.style.display = "inline";
        this._div.className += " showCoordinate";
        this._div.onclick = (e) => {
            e.stopPropagation();
            this._onOpenMap(attribute);
        }
    }
}