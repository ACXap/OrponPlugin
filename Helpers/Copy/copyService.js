"use strict";
class CopyService {
    _copyModule = new CopyAddressGidTwoRow();
    _collectionModule;

    constructor() {
        this._initModule();
    }

    copy() {
        const str = this._copyModule.copy()
        navigator.clipboard.writeText(str);
    }

    setCopyModuleById(id) {
        this._copyModule = this._collectionModule.get(id);
    }

    _initModule() {
        const map = new Map();

        map.set("addressGidTwoRow", new CopyAddressGidTwoRow());
        map.set("addressGidOneRow", new CopyAddressGidOneRow());
        map.set("addressGidTwoRowNoText", new CopyAddressGidTwoRowNoText());
        map.set("addressGidOneRowNoText", new CopyAddressGidOneRowNoText());
        map.set("gidAddressTwoRow", new CopyGidAddressTwoRow());
        map.set("gidAddressOneRow", new CopyGidAddressOneRow());
        map.set("gidAddressTwoRowNoText", new CopyGidAddressTwoRowNoText());
        map.set("gidAddressOneRowNoText", new CopyGidAddressOneRowNoText());

        this._collectionModule = map;
    }
}