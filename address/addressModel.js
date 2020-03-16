"use strict";
class AddressModel {
    _dadataRepository;

    constructor(option) {
        this._dadataRepository = option.dadataRepository;
    }

    async CheckFias(fias) {
        const adr = await this._dadataRepository.GetAddressByFias(fias);
        return adr;
    }

    async CheckAddress(address) {
        const adr = await this._dadataRepository.GetResultAddressByAddress(address);
        return adr;
    }
}