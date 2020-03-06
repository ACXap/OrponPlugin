let canLoad = false;

const updatePage = (r) => {
    //console.log(r);
    chrome.storage.local.get("canUpdateImportGeo", (result) => {
        canLoad = result.canUpdateImportGeo;
    });

    if (r.url.includes("https://api-maps.yandex.ru")) {
        return { cancel: true };
    }

    if (r.requestBody != null && r.requestBody.raw[0] != null) {
        const str = new TextDecoder().decode(r.requestBody.raw[0].bytes);
        if (str.includes("loadExecutedEtriesInfo")) {
            if (canLoad) {
                canLoad = false;
                chrome.storage.local.set({ canUpdateImportGeo: false });
                return { cancel: false };
            }
            return { cancel: true };
        }
    }
}

chrome.storage.local.get("canUseImportModuleGeo", (result) => {
    if (result.canUseImportModuleGeo) {
        chrome.webRequest.onBeforeRequest.addListener(
            updatePage,
            { urls: ["https://orpon-prod.rt.ru/orpon/pon/geoService", "https://api-maps.yandex.ru/*"] },
            ["blocking", "requestBody"]);
    }
});