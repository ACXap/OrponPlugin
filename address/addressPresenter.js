"use strict";
class AddressPresenter {
    _model;

    _canShowButtonJournal;
    _canShowId;
    _canCheckFias;
    _canShowButtonCopyAddress;
    _canUseGeoCoderUser;

    _globalid = "";
    _addressAttributes = [];

    _onOpenMap;
    _copyService;

    constructor(option) {
        this._model = option.model;
        this._onOpenMap = option.onOpenMap;
        this._copyService = option.copyService;
        this._canShowButtonJournal = option.state.canShowButtonJournal;
        this._canShowId = option.state.canShowId;
        this._canCheckFias = option.state.canCheckFias;
        this._canShowButtonCopyAddress = option.state.canShowButtonCopyAddress;
        this._canUseGeoCoderUser = option.state.canUseGeoCoderUser;

        this._initAttribute();
    }

    _initAttribute() {
        if (this._canCheckFias) {
            this._addressAttributes.push(new AddressAttributeTextAddress({ id: "textAddress", name: "Адрес" }));
            this._addressAttributes.push(new AddressAttribute({ id: "fias", name: "Идентификатор ФИАС" }));
            this._addressAttributes.push(new AddressAttribute({ id: "postcode", name: "Индекс" }));
            this._addressAttributes.push(new AddressAttribute({ id: "okato", name: "Код по ОКАТО" }));
            this._addressAttributes.push(new AddressAttribute({ id: "oktmo", name: "Код по ОКТМО" }));
            this._addressAttributes.push(new AddressAttribute({ id: "kladr", name: "Код КЛАДР" }));
            this._addressAttributes.push(new AddressAttributeTypeAddress({ id: "typeAddress", name: "Тип адреса" }));
            this._addressAttributes.push(new AddressAttributeHouse({ id: "house", name: "Дом" }));
            this._addressAttributes.push(new AddressAttributeCoordinate({ id: "coordinate", name: "Координаты" }));
        }

        if (this._canShowButtonJournal) this._addressAttributes.push(new AddressAttributeJournal({ id: "journal", name: "Журнал" }));
        if (this._canShowId) this._addressAttributes.push(new AddressAttributeId({ id: "idAddress", name: "АйДи" }));
        if (this._canShowButtonCopyAddress) this._addressAttributes.push(new AddressAttributeCopyAddress({ id: "copyAddress", name: "Копировать" }, this._copyService));
        if (this._canUseGeoCoderUser) this._addressAttributes.push(new AddressAttributeMap({ id: "coordinateMap", name: "Карта", onOpenMap: this._onOpenMap }));
    }

    Update() {
        const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
        if (divs.length > 1) {
            const id = divs[1].innerText;
            if (this._globalid != id) {
                this._globalid = id;

                this._updateAllAttributes();

                return true;
            }
        }
        return false;
    }

    _updateAllAttributes() {
        this._addressAttributes.forEach(item => item.Update());
        this._updateAttribute("journal", this._globalid);
        this._updateAttribute("coordinateMap", this._getAttribute("coordinate"));

        if (this._canCheckFias) this._checkFias();
    }

    async _checkFias() {
        const id = this._globalid;
        const fias = this._getAttribute("fias");
        if (fias && fias != "Не определено" && fias != "00000000-0000-0000-0000-000000000000") {
            const adr = await this._model.CheckFias(fias);
            if (id != this._globalid) return;

            if (adr != null) {
                this._updateAttribute("textAddress", adr.address);
                this._updateAttribute("fias", adr.fias);
                this._updateAttribute("postcode", adr.postalCode);
                this._updateAttribute("okato", adr.okato);
                this._updateAttribute("oktmo", adr.oktmo);
                this._updateAttribute("kladr", adr.kladr);
                this._updateAttributeCoordinate(adr.coordinate);

                this._updateAddressHouseOrType(adr);
            } else {
                this._setPossibleAddress();
                this._updateAttribute("fias", "ФИАС не найден");
            }
        } else if (fias === "00000000-0000-0000-0000-000000000000") {
            this._updateAttribute("textAddress", "Россия Матушка");
        } else {
            this._setPossibleAddress();
            this._updateAttributeCoordinate("Test");
        }
    }

    async _setPossibleAddress() {
        const id = this._globalid;
        const b = await this._model.CheckAddress(this._getAttribute("textAddress"));

        if (id === this._globalid) {
            const a = b != null ? `Ближайший ФИАС адрес: ${b.address} ФИАС: ${b.fias}${b.isDel ? " (удален)" : ""}` : "Ничего не найдено!";
            this._updateAttribute("textAddress", a, true);
        }
    }

    _getAttribute(id) {
        const atr = this._addressAttributes.find(item => item.id === id);
        if (atr) return atr.GetAttribute();
    }

    _updateAttribute(id, attribute, option) {
        const atr = this._addressAttributes.find(item => item.id === id);
        if (atr) atr.Update(attribute, option);
    }

    _updateAttributeCoordinate(attribute) {
        this._updateAttribute("coordinate", attribute);
        this._updateAttribute("coordinateMap", this._getAttribute("coordinate"));
    }

    _updateAddressHouseOrType(adr) {
        if (adr.fiasLevel == 8) {
            const attribute = adr.house;
            this._updateAttribute("house", attribute);

        } else {
            this._updateAttribute("coordinateMap", null);
            const attribute = adr.street ? adr.street.name :
                (adr.settlement ? adr.settlement.name :
                    (adr.city ? adr.city.name :
                        (adr.area ? adr.area.name : adr.region.name)));
            this._updateAttribute("typeAddress", attribute);
        }
    }
}