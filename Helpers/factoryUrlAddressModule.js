"use strict";
/**
 * Класс отвечающий за создание ссылки url по типу модуля и данным
 */
class FactoryUrlAddressModule {
    _urlAddress = "#details/address?code=";
    _urlEdit = "#requests/edit?";
    _urlDel = "#requests/change?type=DELETE_ADDRESS&code=";
    _urlDecom = "#details/decommissioned?code=";
    _urlChange = "#requests/change?type=CHANGE_ADDRESS&code=";
    _urlFoundAddress = "#search/addresses";

    _levelNon = "level=-1";
    _levelHouse = "level=8";

    getHref(data, id) {

        switch (id) {
            case "listAddress":
                return `${this._urlAddress}${data}&${this._levelNon}`;

            case "delAddress":
                return `${this._urlDel}${data}&${this._levelNon}`;

            case "editAddress":
                return `${this._urlEdit}${data}`;

            case "decomAddress":
                return `${this._urlDecom}${data}&${this._levelHouse}`;

            case "changeAddress":
                return `${this._urlChange}${data}&${this._levelNon}`;

            case "foundAddress":
                return `${this._urlFoundAddress}`;

            default:
                break;
        }
    }
}