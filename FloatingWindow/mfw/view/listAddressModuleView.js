"use strict";

class ListAddressModuleView extends ModuleFloatingWindowView {
    _inputFocus;
    _elementOpenPage = document.createElement("a");

    /** @public Событие загрузки данных в модуль */
    onLoadData;
    /** @public Событие получения предыдущего значения из данных */
    onBack;
    /** @public Событие получения следующего значения из данных */
    onForward;

    constructor(option, text) {
        super(option);

        this._elementHtml.querySelector("p.headerText").innerHTML = `<b>${text.Header}</b>`;
        this._elementHtml.querySelector("span.popuptext").innerHTML = text.HelpPopup;

        // if (text.AutoExecute) {
        //     this._elementHtml.querySelector("div.divSectionBodyModuleNotPadding").hidden = false;
        //     this._elementHtml.querySelector("#autoExecuteLabel").innerHTML = text.AutoExecute + this._elementHtml.querySelector("#autoExecuteLabel").innerHTML;
        // }

        // Пользователь загружает данные для модуля
        this._elementHtml.querySelector("a.loadData").onclick = () => {
            const input = document.createElement("input");
            input.type = "file";
            input.onchange = e => this.onLoadData(e.target.files[0]);
            input.click();
        }
        // Пользователь перетаскивает файл на модуль
        this._elementHtml.ondragover = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };
        // Пользователь перетаскивает файл на модуль
        this._elementHtml.ondrop = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.onLoadData(e.dataTransfer.files[0]);
        };
        // Пользователь вставляет данные из буфера
        this._elementHtml.querySelector("a.clipboardData").onclick = async () => {
            if (navigator.clipboard) {
                const t = await navigator.clipboard.readText();
                this.onLoadData(t);
            }
            else {
                console.log("Доступ к буферу обмена запрещен!");
            }
        }
        // Пользователь перемещается назад по данным
        this._elementHtml.querySelector("a.backwardData").onclick = () => {
            this._inputFocus = document.activeElement;
            this.onBack();
        };
        // Пользователь перемещается вперед по данным
        this._elementHtml.querySelector("a.forwardData").onclick = () => {
            this._inputFocus = document.activeElement;
            this.onForward();
        };
    }

    /**
     * Метод выполняющий основное действие модуля
     * @param {*} data Текущий элемент из коллекции
     */
    execute(data) {
        if (data) {
            if (!isNaN(data.CurrentElement) && data.CurrentElement != "") {
                this._elementOpenPage.href = data.href;
                this._elementOpenPage.click();
            }
            this.update(data);
        }
    }

    /**
     * Метод обновления вью по полученным данным
     * @param {*} data Текущий элемент из данных
     */
    update(data) {
        if (data) {
            this._elementHtml.querySelector("span.countElement").textContent = data.CountElement;
            this._elementHtml.querySelector("span.countLeftElement").textContent = data.CountLeftElement;
            this._elementHtml.querySelector("span.nextElement").textContent = data.NextElement;
            this._elementHtml.querySelector("a.backwardData").title = data.PreviousElement;
        }
    }

    /**
     * Метод-обработчик нажатия горячей клавиши
     * @param {*} e 
     */
    _handlerPressHotKey(e) {
        const evtobj = window.event ? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey && evtobj.altKey) {
            const a = this._elementHtml.querySelector("a.forwardData").click();
        }
    }
}