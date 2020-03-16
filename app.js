"use strict";
const urlCardAddress = "#details/address"; // карточка адреса
const urlCardAddressDecommissioned = "#details/decommissioned"; // карточка выведенного из эксплуатации адреса
const urlCardChange = "#requests/change?type=CHANGE_ADDRESS"; // карточка изменений адреса
const urlCardDelete = "#requests/change?type=DELETE_ADDRESS"; // карточка вывода из эксплуатации адреса
const urlCardChangeEdit = "#requests/edit?"; // карточка подтверждения изменений адреса
const urlInstrumentsGeo = "#instruments/geoupload/journal/import"; // страница импорта геоданных
const urlMasDelHouse = "#requests/massive?type=MASSIVE_DECOMMISS_HOUSE" // страница массового удаления домов

let helpWindow;
let settings;
let address;
let map;
let mapEditor;
let importModuleGeo;
let syncAdjacentSystem;

const observerCardAddress = new MutationObserver((mut) => {
    if (window.location.hash.includes(urlCardAddress) || window.location.hash.includes(urlCardAddressDecommissioned)) {
        address.Update();
    }

    if (window.location.hash.includes(urlCardChangeEdit)) {
        if (mapEditor) mapEditor.Update();
    }

    if (window.location.hash.includes(urlCardChange)) {

        if (mapEditor) mapEditor.Update();
        if (settings.canNotSyncAdjacentSystem) syncAdjacentSystem.Update();
        return;
    }

    if (window.location.hash.includes(urlCardDelete)) {

        if (settings.canNotSyncAdjacentSystem) syncAdjacentSystem.Update();
        return;
    }

    if (window.location.hash.includes(urlMasDelHouse)) {

        if (settings.canNotSyncAdjacentSystem) syncAdjacentSystem.Update();
        return;
    }

    if (window.location.hash.includes(urlInstrumentsGeo)) {
        if (importModuleGeo) importModuleGeo.Update();
    }

    if (syncAdjacentSystem) syncAdjacentSystem.Reset();
});

chrome.storage.local.get(null, (result) => {
    settings = result;

    if (settings.canUseImportModuleGeo) {
        importModuleGeo = new ImportModuleGeo();
    }

    if (settings.canNotSyncAdjacentSystem) {
        syncAdjacentSystem = new SyncAdjacentSystem();
    }

    if (settings.canUseFloatingWindow) {
        helpWindow = HFW.LoadWindow(settings);
    }

    if (settings.canUseGeoCoderUser) {
        const mapTile = new MapTile({ keyHere: settings.apiKeyGeoCoderHere });

        map = new Map(mapTile);

        mapEditor = new MapEditor({
            repYandex: new GeoCodYandex(settings.apiKeyGeoCoderYandex),
            repHere: new GeoCodHere(settings.apiKeyGeoCoderHere),
            repOsm: new GeoCodOsm(),
            mapTile: mapTile
        });
    }

    address = new AddressPresenter({
        model: new AddressModel({ dadataRepository: new DadataRepository(settings.apiKeyCheckFias) }),
        state: {
            canShowButtonJournal: settings.canShowButtonJournal,
            canShowId: settings.canShowId,
            canCheckFias: settings.canAutoCheck,
            canShowButtonCopyAddress: settings.canShowButtonCopyAddress,
            canUseGeoCoderUser: settings.canUseGeoCoderUser
        },
        onOpenMap: settings.canUseGeoCoderUser ? map.OpenMap.bind(map) : null
    });

    observerCardAddress.observe(document.documentElement, { childList: true, subtree: true });
});