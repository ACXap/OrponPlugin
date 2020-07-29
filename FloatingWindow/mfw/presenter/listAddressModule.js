"use strict";

class ListAddressModule extends ModuleFloatingWindow {
    _factoryUrl = new FactoryUrlAddressModule();
    _canForwardDataAfterLoadData = false;

    //_countObserverMut = 0;

    constructor(option) {
        super(option);

        this._canForwardDataAfterLoadData = option.canForwardDataAfterLoadData;

        // Подпись на событие получения данных вью
        this._view.onLoadData = this._handlerLoadData.bind(this);
        // Подпись на событие получения следующих данных из коллекции
        this._view.onForward = this._handlerForwardData.bind(this);
        // Подпись на событие получения предыдущих данных из коллекции
        this._view.onBack = this._handlerBackData.bind(this);
    }

    _observerCardAddress = new MutationObserver((mut) => {
        if (mut.length > 2 && mut.length < 10) {
            const d = mut.find(x => x.target.localName == "body" && x.addedNodes.length == 1);
            if (d != null) {
                if (d.addedNodes[0].classList.contains("alert-danger"))
                    this._view.showAddressNotFound(d.addedNodes[0].innerText);
            }
        }
    });

    /**
     * Метод-обработчик события по получению данных из вью
     * @param {*} data 
     */
    _handlerLoadData(data) {
        this._countObserverMut = 0;

        // Если строка, то передаем в модель
        if (typeof data === "string") {
            this._view.update(this._model.SetData(data));
            if (this._canForwardDataAfterLoadData) this._handlerForwardData();
        }
        // Если файл, то считываем данные и передаем в модель
        else {
            const reader = new FileReader();
            reader.readAsText(data, "UTF-8");
            reader.onload = readerEvent => {
                this._view.update(this._model.SetData(readerEvent.target.result));
                if (this._canForwardDataAfterLoadData) this._handlerForwardData();
            }
        }
    }

    /**
    * Метод-обработчик события получения предыдущего значения из коллекции данных
    */
    _handlerBackData() {
        this._countObserverMut = 0;

        const data = this._model.GetPreviousElement();

        if (data) {
            data.href = this._factoryUrl.getHref(data.CurrentElement, this.id);
            this._view.execute(data);
        }
    }

    /**
    * Метод-обработчик события получения следующего значения из коллекции данных
    */
    _handlerForwardData() {
        this._countObserverMut = 0;

        const data = this._model.GetNextElement();

        if (data) {
            data.href = this._factoryUrl.getHref(data.CurrentElement, this.id);
            this._view.execute(data);
        }
    }

    _handlerOpenBody() {
        this._observerCardAddress.observe(document.documentElement, { childList: true, subtree: true });
        this.onOpen(this.id);
    }

    _handlerCloseBody() {
        this._observerCardAddress.disconnect();
    }

    openBody() {
        this._observerCardAddress.observe(document.documentElement, { childList: true, subtree: true });
        this._view.openBody();
    }

    closeBody() {
        this._view.closeBody();
        this._observerCardAddress.disconnect();
    }
}