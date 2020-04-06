"use strict";

class GeoCodOsm extends GeoCodRepository {

    /** @private Url геокодера */
    _urlGeocoding = "https://nominatim.openstreetmap.org/search?q=";
    _urlGeocodingLastChar = "&format=json&limit=5&countrycodes=ru";

    constructor() {
        super();
    }

    /** Прямое геокодирование адреса
    * @param {string} address Адрес для геокодирования
    * @return {Promise<ResultGeoCod[]>} Возвращает промис с результатом геокодирования
    */
    async GeoCodingDirect(address) {
        const adr = encodeURI(address);
        const response = await fetch(`${this._urlGeocoding}${adr}${this._urlGeocodingLastChar}`);

        return await this._responseToResultGeoCod(response);
    }

    /** Преобразует ответ геокодера в результаты геокодирования
        * @private
        * @param  {json} response Результат запроса к серверу
        * @return {Promise<ResultGeoCod[]>} Возвращает массив геокоординат
        */
    async _responseToResultGeoCod(response) {
        const geoCods = [];
        const result = await response.json();

        if (result) {
            for (const geo of result) {
                const adr = geo.display_name;
                const lat = geo.lat;
                const lng = geo.lon;
                const kind = geo.type;
                const precision = geo.importance > 0.9 ? "exact" : "may be";
                const geoCod = new ResultGeoCod(adr, lat, lng, kind, precision, "Osm");

                geoCods.push(geoCod);
            }
        }

        return geoCods;
    }
}