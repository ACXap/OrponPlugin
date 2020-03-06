"use strict";
/**
 * Класс для создания плавающего окно с дополнительными модулями
 */
class HFW {
    static set;
    static helpWindow
    static LoadWindow(set) {
        this.set = set;

        HFW.helpWindow = new HelperFloatingWindow({
            model: new HelperFloatingWindowModel(),
            view: new HelperFloatingWindowView({
                top: set.topFloatingWindow,
                left: settings.leftFloatingWindow
            }),
        });

        HFW.helpWindow.onChangedCoordinate = HFW._saveNewCoordinate;

        HFW._addModule();
        return HFW.helpWindow;
    }

    static _loadFile(url, callback) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) { callback(this.responseText); }
        };
        xhttp.open("GET", chrome.extension.getURL(url), true);
        xhttp.send();
    }

    static _addModule() {

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/copyHelper.html", (html) => {
            const m = new ListAddressModule({
                id: "copyHelper",
                model: new ModuleFloatingWindowModel(),
                view: new CopyHelpModuleView({ id: "copyHelper", html: html })
            });
            HFW.helpWindow.addModule(m, 0);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/listAddress.html", (html) => {
            const m = new ListAddressModule({
                id: "listAddress",
                model: new ModuleFloatingWindowModel(),
                view: new ListAddressModuleView({ id: "listAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 1);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/delAddress.html", (html) => {
            const m = new ListAddressModule({
                id: "delAddress",
                model: new ModuleFloatingWindowModel(),
                //view: new DelAddressModuleView({ id: "delAddress", html: html })
                view: new ListAddressModuleView({ id: "delAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 2);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/changeAddress.html", (html) => {
            const m = new ListAddressModule({
                id: "changeAddress",
                model: new ModuleFloatingWindowModel(),
                //view: new ChangeAddressModuleView({ id: "changeAddress", html: html })
                view: new ListAddressModuleView({ id: "changeAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 3);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/decomAddress.html", (html) => {
            const m = new ListAddressModule({
                id: "decomAddress",
                model: new ModuleFloatingWindowModel(),
                //view: new DecomAddressModuleView({ id: "decomAddress", html: html })
                view: new ListAddressModuleView({ id: "decomAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 4);
        });

        // HFW._loadFile("FloatingWindow/modulesFloatingWindow/syncListAddress.html", (html) => {
        //     const m = new SyncListAddressModule({
        //         id: "syncListAddress",
        //         model: new ModuleFloatingWindowModel(),
        //         view: new SyncListAddressModuleView({ id: "syncListAddress", html: html })
        //     });
        //     HFW.helpWindow.addModule(m);
        // });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/editAddress.html", (html) => {
            const m = new ListAddressModule({
                id: "editAddress",
                model: new ModuleFloatingWindowModel(),
                //view: new EditAddressModuleView({ id: "editAddress", html: html })
                view: new ListAddressModuleView({ id: "editAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 5);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/copyAddress.html", (html) => {
            const m = new CopyAddressModule({
                id: "copyAddress",
                model: null,
                view: new CopyAddressModuleView({ id: "copyAddress", html: html })
            });
            HFW.helpWindow.addModule(m, 6);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/settings.html", (html) => {
            const m = new SettingsModule({
                id: "settings",
                model: null,
                view: new SettingsModuleView({ id: "settings", html: html }),
                set: HFW.set
            });
            HFW.helpWindow.addModule(m, 7);
        });
    }

    static _saveNewCoordinate(t, l) {
        chrome.storage.local.set({
            topFloatingWindow: t,
            leftFloatingWindow: l
        });
    }
}