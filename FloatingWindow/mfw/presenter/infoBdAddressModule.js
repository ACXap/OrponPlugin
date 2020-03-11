"use strict";

class InfoBdAddressModule extends ModuleFloatingWindow {
    _url = "http://10.132.17.153:8888/getHouse?id=";

    constructor(option) {
        super(option);
        this._view.onGetChildren = async (text, type) => {

            if (text) {
                // const response = await fetch(`${this._url}${text}`);

                this._view.execute(`${this._url}${text}`);
            }
            else {
                this._view.showAddressNotFound("Увы, тут нет адреса");
            }
        }
    }
}