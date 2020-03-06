"use strict";
class AttributesAddressDadata {
    id = "";
    name = "";
    typeFull = "";
    constructor(id, name, typeFull) {
        this.id = id;
        this.name = name;
        this.typeFull = typeFull;
    }
}

class ResultAddressDadata {
    address = "";
    fias = "";
    fiasLevel;
    postalCode = "";
    kladr = "";
    okato = "";
    oktmo = "";
    street;
    settlement;
    city;
    area;
    region;
    isDel = false;
    house = "";
    coordinate;
    fullInfo;
    constructor(address, fias, fiasLevel, postalCode, kladr, okato, oktmo, street, settlement, city, area, region, isDel, house, coordinate, data) {
        this.address = address;
        this.postalCode = postalCode;
        this.fias = fias;
        this.fiasLevel = fiasLevel;
        this.kladr = kladr;
        this.okato = okato;
        this.oktmo = oktmo;
        this.street = street;
        this.settlement = settlement;
        this.city = city;
        this.area = area;
        this.region = region;
        this.isDel = isDel;
        this.house = house;
        this.coordinate = coordinate;
        this.fullInfo = data;
    }
}

class DadataRepository {
    _key;
    _urlRequestFindFias = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/address";
    _urlRequestFindAddress = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

    constructor(key) {
        this._key = key;
    }

    async GetResultAddressByAddress(address) {
        const result = await this.getResultRequest(this._urlRequestFindAddress, address);

        return this.resultToAddress(result);
    }

    async GetResultAddressByFias(fias) {
        const result = await this.getResultRequest(this._urlRequestFindFias, fias);

        return this.resultToAddress(result);
    }

    async GetResultAddressByFiasSimple(fias) {
        const result = await this.getResultRequest(this._urlRequestFindFias, fias);

        return this.resultToAddressSimple(result);
    }

    async GetResultAddressByAddressSimple(address) {
        let result = await this.getResultRequest(this._urlRequestFindAddress, address);

        return this.resultToAddressSimple(result);
    }

    resultToAddressSimple(result) {
        const arrAddress = [];
        if (result != null && result.suggestions != null && result.suggestions.length > 0) {
            for (let adr of result.suggestions) {
                arrAddress.push({
                    "address": this.getAddress(adr),
                    "fias": adr.data.fias_id,
                    "isDel": (adr.data.fias_actuality_state == "99")
                });
            }
        }

        return arrAddress;
    }

    resultToAddress(result) {
        if (result != null && result.suggestions != null && result.suggestions.length > 0) {
            const data = result.suggestions[0].data;
            const postalCode = data.postal_code;
            const kladr = data.kladr_id;
            const okato = data.okato;
            const oktmo = data.oktmo;
            const fias = data.fias_id;
            const fiasLevel = data.fias_level;
            const isDel = data.fias_actuality_state == "99";

            //const adr = `${postalCode != null ? (postalCode + ", ") : ""}` + this.getAddress(result.suggestions[0]);
            const adr = this.getAddress(result.suggestions[0]);

            const street = data.street != null ? new AttributesAddressDadata("Street", data.street, data.street_type_full) : null;
            const settlement = data.settlement != null ? new AttributesAddressDadata("Settlement", data.settlement, data.settlement_type_full) : null;
            const city = data.city != null ? new AttributesAddressDadata("city", data.city, data.city_type_full) : null;
            const area = data.area != null ? new AttributesAddressDadata("area", data.area, data.area_type_full) : null;
            const region = data.region != null ? new AttributesAddressDadata("region", data.region, data.region_type_full) : null;
            const house = data.house;
            const coordinate = { lat: data.geo_lat, lng: data.geo_lon, qc: data.qc_geo };


            return new ResultAddressDadata(adr, fias, fiasLevel, postalCode, kladr, okato, oktmo, street, settlement, city, area, region, isDel, house, coordinate, data);
        }
    }

    getAddress(suggestion) {
        let address = "";
        const data = suggestion.data;
        if (data.fias_id == data.house_fias_id) {
            // address += suggestion.value;
            address += suggestion.unrestricted_value;
        } else {
            address = (data.postal_code != null ? data.postal_code + ", " : "") +
                (data.region_fias_id != null ? data.region + " " + data.region_type : "") +
                (data.area_fias_id != null ? ", " + data.area + " " + data.area_type : "") +
                (data.city_fias_id != null ? ", " + data.city + " " + data.city_type : "") +
                (data.settlement_fias_id != null ? ", " + data.settlement + " " + data.settlement_type : "") +
                (data.street_fias_id != null ? ", " + data.street + " " + data.street_type : "");
        }

        return address;
    }

    async getResultRequest(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Token ' + this._key
            },
            body: "{\"query\":\"" + data + "\", \"count\":5}"
        });
        const result = await response.json();
        return result;
    }

    async CheckDadata() {
        let res = await this.GetResultAddressByAddressSimple("г Новосибирск, ул Орджоникидзе, д 18");

        return (res != null && res.length > 0) ? true : false
    }
}