"use strict";
class ImportModuleGeo {
    buttonUpdate;
    progress;
    buttonAddShowRow;
    table;

    countRowShow = 10;

    constructor() { }

    Update() {
        if (this.buttonUpdate == null) {
            let d = document.querySelector("div.tab-panel-content");
            if (d != null) {
                let b = d.querySelector("div.tab-panel-tabs")
                if (b != null) {
                    this.buttonUpdate = document.createElement("a");
                    this.buttonUpdate.className = "btns btn-primarys btn-lg";
                    this.buttonUpdate.innerText = "Обновить";
                    this.buttonUpdate.title = "Обновить";
                    this.buttonUpdate.onclick = () => {
                        chrome.storage.local.set({ canUpdateImportGeo: true });
                        this.progress.hidden = false;
                        this.countRowShow = 10;
                        window.setTimeout(() => {
                            this.progress.hidden = true
                        }, 8000);
                    };

                    this.progress = document.createElement("progress");
                    this.progress.style.cssText = "margin-left:10px;margin-right:10px";
                    this.progress.id = "progressUpdateInputGeo";
                    this.progress.hidden = true;

                    this.buttonAddShowRow = document.createElement("a");
                    this.buttonAddShowRow.className = "btns btn-primarys btn-lg";
                    this.buttonAddShowRow.innerText = "Подгрузить еще";
                    this.buttonAddShowRow.title = "Подгрузить еще строк";
                    this.buttonAddShowRow.style.display = "none";
                    this.buttonAddShowRow.onclick = () => {
                        this.countRowShow += 10;
                        for (let i = 0; i < this.table.rows.length - 1 && i < this.countRowShow; i++) {
                            this.table.rows[i].hidden = false;
                        }
                    };

                    b.appendChild(this.buttonUpdate);
                    b.appendChild(this.progress);
                    b.appendChild(this.buttonAddShowRow);
                }
            }
        }

        if (this.table == null) {
            let table = document.querySelector("table.orpon-table.table-bordered.table-striped.table-condensed");
            if (table != null) {
                this.table = table;
            }
        }

        if (this.table != null) {
            let countRow = this.table.rows.length;
            for (let i = countRow; i > this.countRowShow + 1; i--) {
                this.table.rows[i - 1].hidden = true;
            }
            if (countRow < 2) {
                this.buttonAddShowRow.style.display = "none";
            }
            else {
                this.buttonAddShowRow.style.display = "inline-block";
            }
        }
    }
}