"use strict";
/**
 * Класс для создания плавающего окно с дополнительными модулями
 */
class HFW {
    static set;
    static helpWindow;
    static copyServiceView;

    static LoadWindow(set, copyServiceView) {
        this.set = set;
        this.copyServiceView = copyServiceView;

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

        const factoryText = new FactoryTextModule();

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/listAddress.html", (html) => {

            let m = new ListAddressModule({
                id: "copyHelper",
                model: new ModuleFloatingWindowModel(),
                view: new CopyHelpModuleView(html, factoryText.getTextModule("copyHelper"))
            });
            HFW.helpWindow.addModule(m, 0);

            m = new ListAddressModule({
                id: "listAddress",
                model: new ModuleFloatingWindowModel(),
                view: new ListAddressModuleView(html, factoryText.getTextModule("listAddress")),
                canForwardDataAfterLoadData: HFW.set.canForwardDataAfterLoadData
            });
            HFW.helpWindow.addModule(m, 1);

            m = new ListAddressModule({
                id: "delAddress",
                model: new ModuleFloatingWindowModel(),
                view: new ListAddressModuleView(html, factoryText.getTextModule("delAddress"))
            });
            HFW.helpWindow.addModule(m, 2);

            m = new ListAddressModule({
                id: "changeAddress",
                model: new ModuleFloatingWindowModel(),
                view: new ListAddressModuleView(html, factoryText.getTextModule("changeAddress"))
            });
            HFW.helpWindow.addModule(m, 3);

            m = new ListAddressModule({
                id: "decomAddress",
                model: new ModuleFloatingWindowModel(),
                view: new ListAddressModuleView(html, factoryText.getTextModule("decomAddress"))
            });
            HFW.helpWindow.addModule(m, 4);

            m = new ListAddressModule({
                id: "editAddress",
                model: new ModuleFloatingWindowModel(),
                view: new EditAddressModuleView(html, factoryText.getTextModule("editAddress"))
            });
            HFW.helpWindow.addModule(m, 5);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/foundAddress.html", (html) => {
            const m = new FoundAddressModule({
                id: "foundAddress",
                model: new ModuleFloatingWindowModel(),
                view: new FoundAddressModuleView(html, factoryText.getTextModule("foundAddress"))
            });
            HFW.helpWindow.addModule(m, 6);
        });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/copyAddress.html", (html) => {
            const m = new CopyAddressModule({
                id: "copyAddress",
                model: null,
                view: new CopyAddressModuleView(html)
            });
            HFW.helpWindow.addModule(m, 7);
        });

        // HFW._loadFile("FloatingWindow/modulesFloatingWindow/infoBdAddress.html", (html) => {
        //     const m = new InfoBdAddressModule({
        //         id: "infoBd",
        //         model: null,
        //         view: new InfoBdAddressModuleView(html)
        //     });
        //     HFW.helpWindow.addModule(m, 9);
        // });

        HFW._loadFile("FloatingWindow/modulesFloatingWindow/settings.html", (html) => {
            const m = new SettingsModule({
                id: "settings",
                model: null,
                view: new SettingsModuleView(html),
                set: HFW.set,
                copyServiceView: HFW.copyServiceView
            });
            HFW.helpWindow.addModule(m, 8);
        });
    }

    static _saveNewCoordinate(t, l) {
        try {

            if (chrome.app) {
                chrome.storage.local.set({
                    topFloatingWindow: t,
                    leftFloatingWindow: l
                });
            }
            else {
                console.log("Требуется обновление страницы. Перезапуск расширения");
            }

        } catch (error) {
            console.log(error);
        }
    }
}