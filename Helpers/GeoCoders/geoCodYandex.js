"use strict";

class GeoCodYandex extends GeoCodRepository {
    /** @private Api-key геокодера */
    _key;
    /** @private Url геокодера */
    _urlGeocoding = "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=";

    constructor(key) {
        super();
        this._key = key;
    }

    /** Обратное геокодирование адреса
    * @param {string} key API ключ геокодера
    * @param {string} latitude Широта точки
    * @param {string} longitude Долгота точки
    * @return {Promise<ResultGeoCod[]>} Возвращает промис с результатом геокодирования
    */
    async GeoCodingBack(latitude, longitude) {
        const response = await fetch(`${this._urlGeocoding}${longitude},${latitude}&apikey=${this._key}`);

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

        if (result != null && result.response != null && result.response.GeoObjectCollection != null) {
            for (const geo of result.response.GeoObjectCollection.featureMember) {
                const adr = geo.GeoObject.metaDataProperty.GeocoderMetaData.text;
                const point = geo.GeoObject.Point.pos.split(" ");
                const lat = point[1];
                const lng = point[0];
                const kind = geo.GeoObject.metaDataProperty.GeocoderMetaData.kind;
                const precision = geo.GeoObject.metaDataProperty.GeocoderMetaData.precision;
                const geoCod = new ResultGeoCod(adr, lat, lng, kind, precision);

                geoCods.push(geoCod);
            }
        }

        return geoCods;
    }
}