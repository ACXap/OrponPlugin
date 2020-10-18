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
                <div>${this._getModule()}</div>
                <div>Пользовательский формат:<input type="text" id="customCopyModule" style="width: 400px">
                    <button id="btCustomCopyModule" style="margin:10px">Применить</button>
                    <button id="btCustomCopyModuleShow" style="margin:10px">Просмотр</button>
                </div>
                <p style="margin-left:10px;font-size:14px;margin-top:-8px;">A - адрес, G - ГИД, F - ФИАС, n - перенос строки, t - табуляция</p>
                <p id="showCustomModule"></p>
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

    _getModule() {
        let str = "";
        this._copyService.collectionModule.forEach(element => {
            str += `<a class="data-field-link list-group-item list-group-item-action" id="${element.id}">
            <p class="pcopyService">${element.copy().replaceAll("\n", "<br>")}</p></a>`;
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

        const b = this._elementHtml.querySelector("#btCustomCopyModule");
        b.onclick = () => {
            this._copyService.setCopyCustomModule(this._elementHtml.querySelector("#customCopyModule").value);
            this._handlerCloseBody();
        };

        const bs = this._elementHtml.querySelector("#btCustomCopyModuleShow");
        bs.onclick = () => {
            this._copyService.setCopyCustomModule(this._elementHtml.querySelector("#customCopyModule").value);

            const a = this._copyService.copyModule.copy().replaceAll("\n", "<br>");
            this._elementHtml.querySelector("#showCustomModule").innerHTML = a;
        }
    }

    _setActive() {
        const a = this._elementHtml.querySelector(`#${this._copyService.copyModule.id}`);
        if (a) {
            a.className += " active"
        } else {
            this._elementHtml.querySelector("#customCopyModule").value = this._copyService.copyModule.args;
        };
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