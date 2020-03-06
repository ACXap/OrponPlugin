"use strict";
class AddressAttributeCoordinate extends AddressAttribute {
    _coordinateElement;

    constructor(option) {
        super(option);
    }

    Update(attribute) {
        this._setDiv();
        this._setIcon();

        this._setCoordinatesElement();

        if (attribute) {
            this._setCheck(attribute);
        }
        else {
            if (this._div == null) return;
            let coords = this._div.innerText;
            if (coords[0] === "(") {
                coords = coords.slice(1);
                coords = coords.split(")")[0];
                this._div.firstChild.innerText = coords;
            }
        }
    }

    GetAttribute() {
        if (this._div != null) {
            return this._div.firstChild.innerText;
        }
    }

    _setCoordinatesElement() {
        if (this._div == null) return;
        if (this._coordinateElement == null) {
            const p = document.createElement("p");
            this._div.appendChild(p);
            this._coordinateElement = p;
        }
        this._setCoordinatesElementDefault();
    }

    _setCoordinatesElementDefault() {
        this._coordinateElement.className = "coordinateElement";
        this._coordinateElement.innerText = "";
    }

    _setIcon() {
        if (this._div == null) { return; }

        if (this._icon == null) {
            this._icon = document.createElement("i");
            this._icon.id = this.id;
            this._div.insertBefore(this._icon, this._div.children[3]);
            var a = document.createElement("a");
            a.before()
        }

        this._setIconDefault();
    }

    _setCheck(attribute) {
        if (attribute == null) { return; }
        if (this._div == null) { return; }

        if (this._div.firstChild.innerText === "Не определено" && attribute != "Test") {
            this._coordinateElement.innerText = `(${attribute.lat}, ${attribute.lng})`;
            this._coordinateElement.className += " showCoordinate";
        } else {
            let coords = this._div.firstChild.innerText;
            if (coords[0] === "(") {
                coords = coords.slice(1);
                coords = coords.split(")")[0];
                this._div.firstChild.innerText = coords;
            }
            if (attribute == "Test") return;
            this._checkCoordinate(coords, attribute);
        }
    }

    _checkCoordinate(currentCoordinate, dadataCoordinate) {
        const c = currentCoordinate.split(",");

        const d = this._distance(c[0], c[1], dadataCoordinate.lat, dadataCoordinate.lng);
        const dis = (+d).toFixed(3);

        if (dis < 0.1) {
            this._setImageCheck(true);
            this._div.className += " divAttributeTrue";
        } else if (dis > 0.1 && dis < 1) {
            this._setImageCheck(true);
            this._div.className += " divAttributeAlert";
        } else {
            this._setImageCheck(false);
            this._div.className += " divAttributeFalse";
        }
        this._div.title = `Расстояние между координатами: ${dis} км. (${dadataCoordinate.lat}, ${dadataCoordinate.lng})`;
    }

    _distance(lat1, lon1, lat2, lon2) {
        const deg2rad = 0.017453292519943295;
        var cos = Math.cos;
        lat1 *= deg2rad;
        lon1 *= deg2rad;
        lat2 *= deg2rad;
        lon2 *= deg2rad;
        const a = (
            (1 - cos(lat2 - lat1)) +
            (1 - cos(lon2 - lon1)) * cos(lat1) * cos(lat2)
        ) / 2;

        return 12742 * Math.asin(Math.sqrt(a));
    }
}