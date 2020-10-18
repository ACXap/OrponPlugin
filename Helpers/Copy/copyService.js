"use strict";
class CopyService {
    copyModule = new CopyAddressGidTwoRow();
    collectionModule;

    constructor() {
        this._initModule();
    }

    copy() {
        const str = this.copyModule.copy()
        navigator.clipboard.writeText(str);
    }

    setCopyModuleById(id) {
        this.copyModule = this.collectionModule.get(id);
    }

    setCopyCustomModule(args) {
        this.copyModule = new CopyCustom(args);
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

        this.collectionModule = map;
    }
}