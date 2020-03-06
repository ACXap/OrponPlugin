"use strict";
class AddressAttributeId extends AddressAttribute {
    constructor(option) {
        super(option);
    }

    Update() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
        if (divs.length > 0) {
            divs[0].parentElement.style.cssText = "color:Blue;display:block";
        }
    }
}