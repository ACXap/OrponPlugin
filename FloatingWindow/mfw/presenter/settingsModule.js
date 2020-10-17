"use strict";

class SettingsModule extends ModuleFloatingWindow {
    _set;
    _copyServiceView;

    constructor(option) {
        super(option);
        this._set = option.set;
        this._copyServiceView = option.copyServiceView;

        this._view.onChangeSync = this._handlerChangeSync.bind(this);
        this._view.onClickCopyService = this._handlerClickCopyService.bind(this);

        this._view.setSync(this._set.canNotSyncAdjacentSystem);
    }

    _handlerClickCopyService() {
        this._copyServiceView.view();
    }

    _handlerChangeSync(b) {
        this._set.canNotSyncAdjacentSystem = b;
    }
}