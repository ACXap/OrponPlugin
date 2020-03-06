"use strict";

class ResultGeoCod {
    address;
    latitude;
    longitude;
    kind;
    precision;
    constructor(address, latitude, longitude, kind, precision) {
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.kind = kind;
        this.precision = precision;
    }
}

/** GeoCodRepository класс работы с геокодером */
class GeoCodRepository {
    /** @private Api-key геокодера */
    _key;
    /** @private Url геокодера */
    _urlGeocoding = "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=";

    constructor(key) {
        this._key = key;
    }

    /** Прямое геокодирование адреса
    * @param {string} address Адрес для геокодирования
    * @return {Promise<ResultGeoCod[]>} Возвращает промис с результатом геокодирования
    */
    async GeoCodingDirect(address) {
        const response = await fetch(`${this._urlGeocoding}${address}&apikey=${this._key}`);

        return await this._responseToResultGeoCod(response);
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

    /** Проверка работоспособности геокодера, если true - то все хорошо
     * @return Promise<boolean> Возвращает Promise<boolean>
     */
    async CheckGeoCoder() {
        const geoCods = await this.GeoCodingDirect("г Новосибирск, ул Орджоникидзе, д 18");

        return (geoCods != null && geoCods.length > 0) ? true : false;
    }
}