"use strict";

class CopyServiceView {
    _elementHtml;
    _copyService;

    constructor(copyService) {
        this._copyService = copyService;
    }

    view() {
        if (this._elementHtml == null) {
            this._elementHtml = document.createElement("div");
            this._elementHtml.className = "rootMapDivHelper";

            this._elementHtml.innerHTML = `<nav class="navHelperOrpon">
            <h2 class="text-h2" style="margin:10px">Режим копирования</h2>
            <div class="buttonClose"><a id="closeMap" class="btn btn-secondary-a btn-second btn-primarys">Закрыть</a></div></nav>

            <div style="margin:10px">
                <div class="list-group">
                        ${this._getModule()}
                </div>
            </div>`;
            this._elementHtml.querySelector("#closeMap").onclick = () => this._handlerCloseBody();

            document.body.insertBefore(this._elementHtml, document.body.firstChild);

            window.setTimeout(() => {
                this._elementHtml.className += " rootMapDivHelperOpen";
            }, 1);


            this._setHandler();
            this._setActive();
        }
        else {
            this._handlerCloseBody();
        }
    }

    // <a class="data-field-link list-group-item list-group-item-action" id="addressGidTwoRow">
    // <p class="pcopyService">Адрес: Новосибирск г.<br>Гид: 5203051</p></a>
    // <a class="data-field-link list-group-item list-group-item-action" id="addressGidOneRow">
    //     <p class="pcopyService">Адрес: Новосибирск г.   Гид: 5203051</p></a>
    // <a class="data-field-link list-group-item list-group-item-action" id="addressGidTwoRowNoText">
    //     <p class="pcopyService">Новосибирск г.<br>5203051</p></a>
    //     <a class="data-field-link list-group-item list-group-item-action" id="addressGidOneRowNoText">
    //         <p class="pcopyService">Новосибирск г.  5203051</p></a>
    //     <a class="data-field-link list-group-item list-group-item-action" id="gidAddressTwoRow">
    //         <p class="pcopyService">Гид: 5203051<br>Адрес: Новосибирск г.</p></a>
    //         <a class="data-field-link list-group-item list-group-item-action" id="gidAddressOneRow">
    //             <p class="pcopyService">Гид: 5203051    Адрес: Новосибирск г.</p></a>
    //         <a class="data-field-link list-group-item list-group-item-action" id="gidAddressTwoRowNoText">
    //             <p class="pcopyService">5203051<br>Новосибирск г.</p></a>
    //             <a class="data-field-link list-group-item list-group-item-action" id="gidAddressOneRowNoText">
    //                 <p class="pcopyService">5203051 Новосибирск г.</p></a>

    _getModule() {
        let str = "";
        this._copyService._collectionModule.forEach(element => {
            str += `<a class="data-field-link list-group-item list-group-item-action" id="${element.id}">
            <p class="pcopyService">${element.copy().replace("\n", "<br>")}</p></a>`;
        });

        return str;
    }

    _setHandler() {
        const a = this._elementHtml.querySelectorAll("a.data-field-link");

        a.forEach(element => {
            element.onclick = () => {
                this._copyService.setCopyModuleById(element.id);
                this._handlerCloseBody();
            }
        });
    }

    _setActive() {
        const a = this._elementHtml.querySelector(`#${this._copyService._copyModule.id}`);
        a.className += " active";
    }

    _handlerCloseBody() {
        this._elementHtml.className = "rootMapDivHelper";
        window.setTimeout(() => {
            try {
                document.body.removeChild(this._elementHtml);
            } finally {
                this._elementHtml.innerHTML = "";
                this._elementHtml = null;
            }
        }, 1000);
    }
}