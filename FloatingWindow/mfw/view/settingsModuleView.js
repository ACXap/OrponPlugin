"use strict";

class SettingsModuleView extends ModuleFloatingWindowView {

    onChangeSync;

    constructor(option) {
        super(option);


    }

    setSync(sync) {
        const c = this._elementHtml.querySelector("#canNotSyncAdjacentSystem");

        c.checked = sync;
        c.onclick = () => {
            this.onChangeSync(c.checked);
        };
    }
}