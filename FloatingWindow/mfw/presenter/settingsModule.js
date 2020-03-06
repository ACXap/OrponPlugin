"use strict";

class SettingsModule extends ModuleFloatingWindow {
    _set;

    constructor(option) {
        super(option);
        this._set = option.set;

        this._view.onChangeSync = this._handlerChangeSync.bind(this);

        this._view.setSync(this._set.canNotSyncAdjacentSystem);
    }

    _handlerChangeSync(b) {
        this._set.canNotSyncAdjacentSystem = b;
    }
}