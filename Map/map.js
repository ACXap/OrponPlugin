"use strict";
class Map {
    _elementHtml;
    _map;
    _mapTile;

    _handlerClickBody = this._closeMap.bind(this);

    constructor(option) {
        this._mapTile = option;
    }

    OpenMap(attribute) {
        if (this._elementHtml == null) {
            this._elementHtml = document.createElement("div");
            this._elementHtml.className = "rootMapDivHelper";
            this._elementHtml.innerHTML = '<nav class="navHelperOrpon"><label class="lbMap" for="lat">Широта</label><input id="lat" readonly><label class="lbMap" for="lng">Долгота</label><input readonly id="lng"><div class="buttonClose"><a id="closeMap" class="btn btn-secondary-a btn-second btn-primarys">Закрыть</a></div></nav><div id="mapHelperOrpon"></div>';
            this._elementHtml.querySelector("#closeMap").onclick = () => this._closeMap();

            document.body.addEventListener("click", this._handlerClickBody);
            document.body.insertBefore(this._elementHtml, document.body.firstChild);
            this._createMap(attribute);
        }
        else {
            this._closeMap()
        }
    }

    _closeMap(e) {
        if (e != null) {
            if (e.path.find(x => x.className != null && x.className.includes("rootMapDivHelper"))) return;
        }

        document.body.removeEventListener("click", this._handlerClickBody);
        this._elementHtml.className = "rootMapDivHelper";

        window.setTimeout(() => {
            this._map.remove();
            document.body.removeChild(this._elementHtml);
            this._elementHtml.innerHTML = "";
            this._elementHtml = null;
            this._map = null;
        }, 1000);
    }

    _createMap(atr) {
        let lat = 55.02;
        let lon = 82.91;
        let zoom = 9;
        let marker;

        if (atr && atr.includes(",")) {
            const cord = atr.split(",");
            lat = cord[0];
            lon = cord[1];
            zoom = 17;
            marker = L.marker([lat, lon]);

            this._elementHtml.querySelector("#lat").value = lat;
            this._elementHtml.querySelector("#lng").value = lon;
        }

        this._map = L.map("mapHelperOrpon", { layers: this._mapTile.GetFirstMap() });
        this._map.setView([lat, lon], zoom);
        L.control.layers(this._mapTile.GetBaseMaps()).addTo(this._map);

        if (marker) {
            marker.addTo(this._map);
        }

        this._elementHtml.className += " rootMapDivHelperOpen";
    }
}