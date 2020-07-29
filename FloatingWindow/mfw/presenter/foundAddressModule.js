"use strict";

class FoundAddressModule extends ModuleFloatingWindow {
    _factoryUrl = new FactoryUrlAddressModule();
    _currentData;
    _downloadFile;

    _eventPressEnter = new KeyboardEvent("keyup", { view: window, keyCode: 13, bubbles: true, cancelable: true });

    constructor(option) {
        super(option);

        // Подпись на событие получения данных вью
        this._view.onLoadData = this._handlerLoadData.bind(this);
        // Подпись на событие получения следующих данных из коллекции
        this._view.onForward = this._handlerForwardData.bind(this);
        // Подпись на событие получения предыдущих данных из коллекции
        this._view.onBack = this._handlerBackData.bind(this);

        // Подпись на событие получения предыдущих данных из коллекции
        this._view.onSave = this._handlerSaveData.bind(this);
    }

    _handlerSaveData() {
        if (this._downloadFile) {
            this._downloadFile.getFile();
        }
    }

    _observer = new MutationObserver((mut) => {
        if (window.location.hash.includes("search/addresses")) {
            console.log(mut);
            if (!this._currentData) return;

            const tp = document.querySelectorAll("div.tab-panel-content");
            if (tp[0] && tp.length === 1) {
                const input = tp[0].querySelectorAll("input.form-control");
                if (input[0] && input.length === 1) {
                    input[0].value = this._currentData.CurrentElement;
                    this._observer.disconnect();
                    input[0].dispatchEvent(this._eventPressEnter);
                    this._observerCardAddress.observe(document.documentElement, { childList: true, subtree: true });
                }
            }
        }
    });

    _observerCardAddress = new MutationObserver((mut) => {
        if (window.location.hash.includes("details/address")) {
            console.log(mut);
            if (mut.length > 30) {
                const divs = document.querySelectorAll("div.col-lg-8.col-md-8.col-sm-6.col-xs-12");
                const h = document.querySelector("i.fa.fa-building.blue");
                if (divs && h && divs[1].textContent !== "" && h.parentElement.textContent !== "") {
                    this._downloadFile.addData(`${this._currentData.CurrentElement};${h.parentElement.innerText.split("\n")[0]};${divs[1].innerText}\n`);
                    this._observerCardAddress.disconnect();
                }
            }
        }
    });

    /**
    * Метод-обработчик события получения предыдущего значения из коллекции данных
    */
    _handlerBackData() {
        //this._countObserverMut = 0;
        this._observer.observe(document.documentElement, { childList: true, subtree: true });

        const data = this._model.GetPreviousElement();
        this._currentData = data;

        if (data) {
            data.href = this._factoryUrl.getHref(data.CurrentElement, this.id);
            this._view.execute(data);
        }
    }

    /**
    * Метод-обработчик события получения следующего значения из коллекции данных
    */
    _handlerForwardData() {
        //this._countObserverMut = 0;
        this._observer.observe(document.documentElement, { childList: true, subtree: true });

        const data = this._model.GetNextElement();
        this._currentData = data;

        if (data) {
            data.href = this._factoryUrl.getHref(data.CurrentElement, this.id);
            this._view.execute(data);
        }
    }

    /**
     * Метод-обработчик события по получению данных из вью
     * @param {*} data 
     */
    _handlerLoadData(data) {
        // Если строка, то передаем в модель
        if (typeof data === "string") {
            this._view.update(this._model.SetData(data));
        }
        // Если файл, то считываем данные и передаем в модель
        else {
            const reader = new FileReader();
            reader.readAsText(data, "UTF-8");
            reader.onload = readerEvent => {
                this._view.update(this._model.SetData(readerEvent.target.result));
            }
        }

        this._downloadFile = new FileService("СписокПоиска");
    }

    _handlerOpenBody() {
        this._observer.observe(document.documentElement, { childList: true, subtree: true });
        this.onOpen(this.id);
    }

    _handlerCloseBody() {
        this._observer.disconnect();
        this._observerCardAddress.disconnect();
    }

    openBody() {
        this._observer.observe(document.documentElement, { childList: true, subtree: true });
        this._view.openBody();
    }

    closeBody() {
        this._view.closeBody();
        this._observer.disconnect();
        this._observerCardAddress.disconnect();
    }
}