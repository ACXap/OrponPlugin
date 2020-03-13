"use strict";
class MapTile {

    _osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ["a", "b", "c"]
    });

    _google = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.google.ru">Google</a>',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    _googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.google.ru">Google</a>',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // _sputnik = L.tileLayer('https://{s}.tilessputnik.ru/tiles/kmt2/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://maps.sputnik.ru">Sputnik</a>',
    //     subdomains: ["a", "b", "c", "d"]
    // });

    _gis = L.tileLayer('https://{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=46', {
        maxZoom: 18,
        maxNativeZoom: 16,
        attribution: '&copy; <a href="https://2gis.ru">2gis</a>',
        subdomains: ["tile3", "tile1", "tile2"]
    });

    constructor(option) {

        this._here = L.tileLayer(`https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${option.keyHere}&lg=rus&ppi=72&pview=RUS`, {
            maxZoom: 19,
            maxNativeZoom: 19,
            attribution: '&copy; <a href="https://here.com">Here</a>',
            subdomains: ["1", "2", "3", "4"]
        });

        this._baseMaps = {
            "OSM": this._osm,
            "Google": this._google,
            "Google спутник": this._googleSat,
            //"Спутник": this._sputnik,
            "2GIS": this._gis,
            "Here": this._here
        };
    }

    GetBaseMaps() {
        return this._baseMaps;
    }

    GetFirstMap() {
        return this._osm;
    }
}