"use strict";
UI.AddEventListener("save", "click", SaveOptions);
UI.AddEventListener("checkDadata", "click", CheckApiDadata);
UI.AddEventListener("checkApiGeoCoderYandex", "click", () => CheckApiGeoCoder("Yandex"));
UI.AddEventListener("checkApiGeoCoderHere", "click", () => CheckApiGeoCoder("Here"));

UI.AddEventListener("textBoxApiKeyGeoCoderYandex", "mouseover", () => UI.OpenPassword("textBoxApiKeyGeoCoderYandex"));
UI.AddEventListener("textBoxApiKeyGeoCoderHere", "mouseover", () => UI.OpenPassword("textBoxApiKeyGeoCoderHere"));
UI.AddEventListener("textBoxApiKey", "mouseover", () => UI.OpenPassword("textBoxApiKey"));
UI.AddEventListener("canUseGeoCoderUser", "click", () => UI.SetVisibilityElement("divGeoModule", UI.GetValueElement("canUseGeoCoderUser")));


chrome.storage.local.get({
    apiKeyCheckFias: "",
    canAutoCheck: false,
    canShowId: false,
    canShowButtonJournal: false,
    canShowButtonCopyAddress: false,
    canUseGeoCoderUser: false,
    apiKeyGeoCoderYandex: "",
    apiKeyGeoCoderHere: "",
    canUseFloatingWindow: false,
    canUseImportModuleGeo: false,
    canNotSyncAdjacentSystem: false
},
    (items) => {
        UI.SetValueElement("textBoxApiKey", items.apiKeyCheckFias);
        UI.SetValueElement("canAutoCheck", items.canAutoCheck);
        UI.SetValueElement("canShowId", items.canShowId);
        UI.SetValueElement("canShowButtonJournal", items.canShowButtonJournal);
        UI.SetValueElement("canShowButtonCopyAddress", items.canShowButtonCopyAddress);
        UI.SetValueElement("canUseGeoCoderUser", items.canUseGeoCoderUser);
        UI.SetValueElement("textBoxApiKeyGeoCoderYandex", items.apiKeyGeoCoderYandex);
        UI.SetValueElement("textBoxApiKeyGeoCoderHere", items.apiKeyGeoCoderHere);
        UI.SetValueElement("canUseFloatingWindow", items.canUseFloatingWindow);
        UI.SetValueElement("canUseImportModuleGeo", items.canUseImportModuleGeo);
        UI.SetValueElement("canNotSyncAdjacentSystem", items.canNotSyncAdjacentSystem);

        UI.SetVisibilityElement("divGeoModule", UI.GetValueElement("canUseGeoCoderUser"));
    });

function SaveOptions() {
    chrome.storage.local.set({
        apiKeyCheckFias: UI.GetValueElement("textBoxApiKey"),
        canAutoCheck: UI.GetValueElement("canAutoCheck"),
        canShowId: UI.GetValueElement("canShowId"),
        canShowButtonJournal: UI.GetValueElement("canShowButtonJournal"),
        canShowButtonCopyAddress: UI.GetValueElement("canShowButtonCopyAddress"),
        canUseGeoCoderUser: UI.GetValueElement("canUseGeoCoderUser"),
        apiKeyGeoCoderYandex: UI.GetValueElement("textBoxApiKeyGeoCoderYandex"),
        apiKeyGeoCoderHere: UI.GetValueElement("textBoxApiKeyGeoCoderHere"),
        canUseFloatingWindow: UI.GetValueElement("canUseFloatingWindow"),
        canUseImportModuleGeo: UI.GetValueElement("canUseImportModuleGeo"),
        canNotSyncAdjacentSystem: UI.GetValueElement("canNotSyncAdjacentSystem")
    }, () => {
        UI.SetVisibilityElement("save", false);
        UI.SetTextContent("status", "Настройки сохранены!");

        window.setTimeout(() => {
            UI.SetTextContent("status", "");
            UI.SetVisibilityElement("save", true);
        }, 850);
    });
}

function CheckUseGeoCodModule() {
    UI.SetVisibilityElement("divGeoModule", this.checked);
}

async function CheckApiGeoCoder(nameGeoCod) {
    if (nameGeoCod == "Yandex") {
        CheckApi("statusCheckApiGeoCoderYandex", "checkApiGeoCoderYandex", async function () {
            return await new GeoCodYandex(UI.GetValueElement("textBoxApiKeyGeoCoderYandex")).CheckGeoCoder();
        });
    }

    if (nameGeoCod == "Here") {
        CheckApi("statusCheckApiGeoCoderHere", "checkApiGeoCoderHere", async function () {
            return await new GeoCodHere(UI.GetValueElement("textBoxApiKeyGeoCoderHere")).CheckGeoCoder();
        });
    }
}

async function CheckApiDadata() {
    CheckApi("statusCheckDadata", "checkDadata", async function () {
        return await new DadataRepository(UI.GetValueElement("textBoxApiKey")).CheckDadata();
    });
}

async function CheckApi(nameStatusElem, nameStartElem, funcCheck) {
    UI.SetVisibilityElement(nameStartElem, false);
    UI.SetInnerHTMLElement(nameStatusElem, "Проверка...");

    const st = await funcCheck();
    const status = st ? '<font color="green"><b>Все хорошо!</b></font>' : '<font color="red"><b>Все плохо!!!</b></font>';

    UI.SetInnerHTMLElement(nameStatusElem, status);

    window.setTimeout(() => {
        UI.SetTextContent(nameStatusElem, "");
        UI.SetVisibilityElement(nameStartElem, true);
    }, 1000);
}