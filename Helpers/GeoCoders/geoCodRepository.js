"use strict";

class ResultGeoCod {
    address;
    latitude;
    longitude;
    kind;
    precision;
    geocoder;
    constructor(address, latitude, longitude, kind, precision, geocoder) {
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.kind = kind;
        this.precision = precision;
        this.geocoder = geocoder;
    }
}

/** GeoCodRepository класс работы с геокодером */
class GeoCodRepository {

    /** Проверка работоспособности геокодера, если true - то все хорошо
     * @return Promise<boolean> Возвращает Promise<boolean>
     */
    async CheckGeoCoder() {
        const geoCods = await this.GeoCodingDirect("г Новосибирск, ул Орджоникидзе, д 18");

        return (geoCods && geoCods.length > 0) ? true : false;
    }

    /** Прямое геокодирование адреса
    * @param {string} address Адрес для геокодирования
    * @return {Promise<ResultGeoCod[]>} Возвращает промис с результатом геокодирования
    */
    async GeoCodingDirect(address) {
        const response = await fetch(`${this._urlGeocoding}${address}&apikey=${this._key}`);

        return await this._responseToResultGeoCod(response);
    }
}