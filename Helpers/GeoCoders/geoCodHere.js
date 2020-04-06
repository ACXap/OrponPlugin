"use strict";

class GeoCodHere extends GeoCodRepository {

    /** @private Url геокодера */
    _urlGeocoding = "https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=";

    constructor(key) {
        super();
        this._key = key;
    }

    /** Преобразует ответ геокодера в результаты геокодирования
        * @private
        * @param  {json} response Результат запроса к серверу
        * @return {Promise<ResultGeoCod[]>} Возвращает массив геокоординат
        */
    async _responseToResultGeoCod(response) {
        const geoCods = [];
        const result = await response.json();

        if (result && result.Response && result.Response.View && result.Response.View.length > 0) {
            for (const geo of result.Response.View[0].Result) {
                const adr = geo.Location.Address.Label;
                const lat = geo.Location.DisplayPosition.Latitude;
                const lng = geo.Location.DisplayPosition.Longitude;
                const kind = geo.MatchLevel;
                const precision = geo.Relevance > 0.9 ? "exact" : "may be";
                const geoCod = new ResultGeoCod(adr, lat, lng, kind, precision, "Here");

                geoCods.push(geoCod);
            }
        }

        return geoCods;
    }
}