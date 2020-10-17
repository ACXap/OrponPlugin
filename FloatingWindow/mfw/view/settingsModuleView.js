"use strict";

class SettingsModuleView extends ModuleFloatingWindowView {

    onChangeSync;
    onClickCopyService;

    constructor(option) {
        super(option);

        const b = this._elementHtml.querySelector("#changeCopyService");
        b.onclick = (e) => {
            e.stopPropagation();
            this.onClickCopyService();
        }
    }

    setSync(sync) {
        const c = this._elementHtml.querySelector("#canNotSyncAdjacentSystem");

        c.checked = sync;
        c.onclick = () => this.onChangeSync(c.checked);
    }
}