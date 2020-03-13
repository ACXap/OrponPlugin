"use strict";
class MapEditor {
    _divMap;
    _map;
    _tableResult;
    _inputAddress;
    _geoRepositoryYandex;
    _geoRepositoryHere;
    _geoRepositoryOsm;

    _mapChange = false;
    _masterMarker;
    _currentMarker;
    _originalAddress;
    _originalCoordinate;
    _currentCoordinate;
    _mapTile;

    constructor(option) {
        this._geoRepositoryYandex = option.repYandex;
        this._geoRepositoryHere = option.repHere;
        this._geoRepositoryOsm = option.repOsm;
        this._mapTile = option.mapTile;
    }

    Update() {
        const div = document.getElementById("map");

        if (!this._mapChange && div == null) return;

        if (div == null || div.innerHTML == "") {
            this._mapChange = false;
            if (this._map != null) {
                this._map.remove();
                this._masterMarker = null;
                this._currentMarker = null;
                this._map = null;
            }
            return;
        }

        if (this._mapChange) return;

        this._initMap(div);
        this._mapChange = true;
    }

    _initMap(div) {
        this._divMap = div;
        this._divMap.innerHTML = "";
        this._originalCoordinate = { latitude: 55.02, longitude: 82.91, quality: 0, zoom: 9 };
        this._currentCoordinate = { latitude: 55.02, longitude: 82.91, quality: 0, zoom: 9 };

        this._inputCoordinateListener();
        this._createInputAddressElement();
        this._createTableResultGeoCoding();
        this._createButtonSetOriginalCoordinate();
        this._createButtonGeoCoding();
        this._updateButtonSaveCoordinate();
        this._createCombo

        this._createMap();
    }

    _updateButtonSaveCoordinate() {
        const divButton = this._divMap.parentElement.childNodes[0].childNodes[1];
        const oldButtonSaveCoordinate = divButton.childNodes[1];
        oldButtonSaveCoordinate.addEventListener("click", () => {
            const sel = document.querySelectorAll("select.selectpicker.form-control.orpon-select")[6];
            if (sel != null) {
                sel.parentElement.firstChild.firstChild.innerText = sel.children[this._currentCoordinate.quality].innerText;
                sel.value = this._currentCoordinate.quality;
            }
        });
    }

    _createButtonSetOriginalCoordinate() {
        const divButton = this._divMap.parentElement.childNodes[0].childNodes[1];
        const oldButtonSetOriginalCoordinate = divButton.childNodes[0];
        const myButtonSetOriginal = oldButtonSetOriginalCoordinate.cloneNode(true);
        myButtonSetOriginal.onclick = () => {
            this._setCurrentCoordinate(this._originalCoordinate, this._originalAddress, true);
        };
        divButton.removeChild(oldButtonSetOriginalCoordinate);
        divButton.prepend(myButtonSetOriginal);
    }

    _inputCoordinateListener() {
        const inputLatLng = this._divMap.parentElement.querySelectorAll("input.orpon-input");
        const lat = inputLatLng[0].value;
        const lon = inputLatLng[1].value;

        if (lat != "" && lon != "") {
            const sel = document.querySelectorAll("select.selectpicker.form-control.orpon-select")[6];
            this._originalCoordinate = { latitude: lat, longitude: lon, zoom: 17, quality: sel.value };
            this._currentCoordinate = { latitude: lat, longitude: lon, zoom: 17, quality: sel.value };
        }

        inputLatLng[0].oninput = () => {
            const v = inputLatLng[0].value;
            if (v.includes(",")) {
                const a = v.split(",");
                this._currentCoordinate.latitude = a[0];
                this._currentCoordinate.longitude = a[1];
            }
            else {
                this._currentCoordinate.latitude = inputLatLng[0].value;
            }
            this._currentCoordinate.quality = 2;
            this._setCurrentCoordinate(this._currentCoordinate);
        }

        inputLatLng[1].oninput = () => {
            const v = inputLatLng[1].value;
            if (v.includes(",")) {
                const a = v.split(",");
                this._currentCoordinate.latitude = a[0];
                this._currentCoordinate.longitude = a[1];
            }
            else {
                this._currentCoordinate.longitude = inputLatLng[1].value;
            }
            this._currentCoordinate.quality = 2;
            this._setCurrentCoordinate(this._currentCoordinate);
        }
    }

    _setViewMap(coordinate) {
        this._map.setView([coordinate.latitude, coordinate.longitude], coordinate.zoom);
    }

    _createInputAddressElement() {
        const d = this._divMap.parentElement.parentElement.previousSibling;
        this._inputAddress = document.createElement("input");
        this._inputAddress.id = "inputAddress";
        this._inputAddress.value = d.innerText;
        this._inputAddress.style.cssText = "width:1000px;padding:5px;font-size:18px;font-weight:bold;";
        d.parentElement.prepend(this._inputAddress);
        d.parentElement.removeChild(d);
        this._originalAddress = d.innerText;
    }

    _createMap() {
        this._map = L.map(this._divMap.id, { layers: this._mapTile.GetFirstMap() });
        this._setViewMap(this._originalCoordinate);
        L.control.layers(this._mapTile.GetBaseMaps()).addTo(this._map);

        if (this._originalCoordinate.zoom != 9) {
            this._masterMarker = L.marker([this._originalCoordinate.latitude, this._originalCoordinate.longitude]);
            this._masterMarker.bindPopup(this._inputAddress.value);
            this._masterMarker.addTo(this._map);
        }

        this._map.on("click", (e) => {
            const latlng = e.latlng;
            this._currentCoordinate = { latitude: latlng.lat.toFixed(5), longitude: latlng.lng.toFixed(5), zoom: 17, quality: 2 };
            this._setCurrentCoordinate(this._currentCoordinate);
            this._currentMarker.openPopup();
        });
    }

    _createButtonGeoCoding() {
        const oldButtonGeocod = this._divMap.parentElement.firstChild.firstChild;

        const div = document.createElement("div");
        div.style.cssText = "display:inline;";

        const myButtonGeocod = oldButtonGeocod.cloneNode(true);
        myButtonGeocod.style.display = "inline";
        myButtonGeocod.onclick = () => this._geoCoding();

        const progress = document.createElement("progress");
        progress.style.cssText = "margin-left:10px";
        progress.id = "progressGeoCoding";
        progress.hidden = true;

        div.appendChild(myButtonGeocod);
        div.appendChild(progress);

        this._divMap.parentElement.firstChild.removeChild(oldButtonGeocod);
        this._divMap.parentElement.firstChild.prepend(div);
    }

    _createTableResultGeoCoding() {
        const div = document.createElement("div");
        this._tableResult = document.createElement("ul");
        this._tableResult.className = "nav nav-pills nav-stacked";
        this._tableResult.id = "tableResult";
        div.appendChild(this._tableResult);

        this._divMap.parentElement.appendChild(div);
    }

    async _geoCoding() {
        document.getElementById("progressGeoCoding").hidden = false;

        if (this._tableResult.innerHTML != "") {
            this._tableResult.innerHTML = "";
        }

        this._geoCodingGeo("Yandex");
        this._geoCodingGeo("Here");
        this._geoCodingGeo("Osm");

        //const geoCods = await this._geoRepository.GeoCodingDirect(this._inputAddress.value);
        // if (this._tableResult.innerHTML != "") {
        //     this._tableResult.innerHTML = "";
        // }
        // for (let g of geoCods) {
        //     this._creatItemsForTableResult(g);
        // }

        // document.getElementById("progressGeoCoding").hidden = true;
    }


    async _geoCodingGeo(nameGeoCod) {
        let geoCods;

        if (nameGeoCod == "Yandex") {
            geoCods = await this._geoRepositoryYandex.GeoCodingDirect(this._inputAddress.value);
        }

        if (nameGeoCod == "Here") {
            geoCods = await this._geoRepositoryHere.GeoCodingDirect(this._inputAddress.value);
        }

        if (nameGeoCod == "Osm") {
            geoCods = await this._geoRepositoryOsm.GeoCodingDirect(this._inputAddress.value);
        }

        for (let g of geoCods) {
            this._creatItemsForTableResult(g);
        }

        document.getElementById("progressGeoCoding").hidden = true;

    }

    _creatItemsForTableResult(geo) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = geo.address;
        a.style.cursor = "pointer";
        a.addEventListener("click", () => {
            const quality = geo.precision == "exact" ? 1 : 2;
            const zoom = quality == 1 ? 18 : 16
            this._currentCoordinate = { latitude: geo.latitude, longitude: geo.longitude, quality: quality, zoom: zoom };
            this._setCurrentCoordinate(this._currentCoordinate, geo.address);
        });
        li.appendChild(a);
        this._tableResult.appendChild(li);
    }

    _setCurrentCoordinate(coordinate, address, isOriginal = false) {

        if (isOriginal) {
            if (this._currentMarker != null) {
                this._currentMarker.remove();
                this._currentMarker = null;
            }
        }
        else {
            if (this._currentMarker == null) {
                this._currentMarker = L.marker([coordinate.latitude, coordinate.longitude]);
                this._currentMarker.addTo(this._map);
            }
            else {
                this._currentMarker.setLatLng([coordinate.latitude, coordinate.longitude]);
            }

            this._currentMarker.bindPopup(address);//.openPopup();;
        }
        this._setViewMap(coordinate);

        const inputLatLng = this._divMap.parentElement.querySelectorAll("input.orpon-input");
        inputLatLng[0].value = coordinate.latitude;
        inputLatLng[1].value = coordinate.longitude;
        const ev = new KeyboardEvent("keyup", { view: window, keyCode: 13, bubbles: true, cancelable: true });
        inputLatLng[0].dispatchEvent(ev);

        //this.setQuality(quality);

        if (!address && this._currentMarker != null) {
            this._setAddressCurrentMarker(coordinate);
        }
    }

    async _setAddressCurrentMarker(coordinate) {
        this._currentMarker.bindPopup("Поиск...");
        const geo = await this._geoRepositoryYandex.GeoCodingBack(coordinate.latitude, coordinate.longitude);
        if (geo != null && geo.length > 0) {
            this._currentMarker.bindPopup(geo[0].address).openPopup();
        }
        else {
            this._currentMarker.bindPopup("Ничего не найдено!");
        }
    }
}