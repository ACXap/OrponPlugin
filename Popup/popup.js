"use strict";
UI.AddEventListener("checkFias", "click", CheckAsync);
UI.AddEventListener("findAddress", "click", FindAsync);
UI.AddEventListener("checkDadata", "click", CheckDadata);
UI.AddEventListener("textBoxFias", "keyup", (e) => { if (e.keyCode == 13) CheckAsync(); });
UI.AddEventListener("textBoxFindAddress", "keyup", (e) => { if (e.keyCode == 13) FindAsync(); });

const ADDRESS_NOT_FOUND = "Адрес не найден";

let dadataRepository;

chrome.storage.local.get("apiKeyCheckFias", (result) => {
    dadataRepository = new DadataRepository(result.apiKeyCheckFias);
});

async function CheckDadata() {
    UI.SetValueElement("textBoxFias", "2388b5f4-1779-4c3b-a7c7-6078231a4e77");
    CheckAsync();

    UI.SetValueElement("textBoxFindAddress", "г Новосибирск, ул Орджоникидзе, д 18");
    FindAsync();
}

async function FindAsync() {
    if (UI.GetValueElement("textBoxFindAddress") == "") return;

    UI.SetVisibilityElement("progressBarFindAddress");
    UI.SetVisibilityElement("selectedAddressTable", false);

    const address = await dadataRepository.GetResultAddressByAddressSimple(UI.GetValueElement("textBoxFindAddress"));

    if (address != null && address.length > 0) {
        UI.SetVisibilityElement("resultFindAddress", false);
        UI.SetInnerHTMLElement("listBoxFindAddress", "");

        for (const adr of address) {
            UI.AddItemListBox("listBoxFindAddress", UI.CreateItemListBox({
                text: adr.address,
                tag: adr.fias + (adr.isDel ? " (удален)" : ""),
                click: function () {
                    UI.SetInnerTextElement("selectAddress", this.text);
                    UI.SetInnerTextElement("selectAddressFias", this.tag)
                    UI.SetVisibilityElement("selectedAddressTable", true);
                }
            }));
        }
        UI.SetVisibilityElement("listBoxFindAddress", true);
    }
    else {
        UI.SetVisibilityElement("selectedAddressTable", false);
        UI.SetVisibilityElement("listBoxFindAddress", false);
        UI.SetVisibilityElement("resultFindAddress", true);
        UI.SetInnerTextElement("resultFindAddress", ADDRESS_NOT_FOUND);
    }

    UI.SetVisibilityElement("progressBarFindAddress", false);
}

async function CheckAsync() {
    if (UI.GetValueElement("textBoxFias") == "") return;

    UI.SetVisibilityElement("progressBarCheckFias");

    const address = await dadataRepository.GetResultAddressByFiasSimple(UI.GetValueElement("textBoxFias"));
    const adr = (address != null && address.length > 0) ? address[0].address : ADDRESS_NOT_FOUND;
    UI.SetInnerTextElement("resultCheck", adr);

    UI.SetVisibilityElement("progressBarCheckFias", false);
}