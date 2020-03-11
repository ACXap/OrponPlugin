"use strict";
class AddressModel {
    _dadataRepository;

    constructor(option) {
        this._dadataRepository = option.dadataRepository;
    }

    async CheckFias(fias) {
        //console.log("Проверка фиас");
        const adr = await this._dadataRepository.GetResultAddressByFias(fias);
        return adr;
    }

    async CheckAddress(address) {
        //console.log("Проверка адреса");
        const adr = await this._dadataRepository.GetResultAddressByAddress(address);
        return adr;
    }
}