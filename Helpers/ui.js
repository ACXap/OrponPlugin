"use strict";
class UI {
    static AddEventListener(name, nameEvent, func) {
        document.getElementById(name).addEventListener(nameEvent, func);
    }
    static OpenPassword(name) {
        document.getElementById(name).type = "text";
        window.setTimeout(() => {
            document.getElementById(name).type = "password"
        }, 1000);
    }
    static DisabledElement(name, value) {
        document.getElementById(name).disabled = value;
    }
    static SetValueElement(name, value) {
        let elem = document.getElementById(name);
        if (elem != null) {
            if (elem.type == "checkbox") {
                elem.checked = value;
            }
            else {
                elem.value = value;
            }
        }
    }
    static GetValueElement(name) {
        let elem = document.getElementById(name);
        if (elem != null) {
            if (elem.type == "checkbox") {
                return elem.checked;
            }
            else {
                return elem.value;
            }
        }
    }
    static SetInnerTextElement(name, text) {
        document.getElementById(name).innerText = text;
    }
    static SetVisibilityElement(name, isVisibility) {
        let element = document.getElementById(name);
        element.hidden = isVisibility != null ? !isVisibility : !element.hidden;
    }
    static SetTextContent(name, text) {
        let element = document.getElementById(name);
        element.textContent = text;
    }
    static SetInnerHTMLElement(name, text) {
        let elem = document.getElementById(name);
        elem.innerHTML = text;
    }
    static CreateItemListBox({ text: text, tag: tag, click: click }) {
        let item = document.createElement("option");
        item.text = text;
        item.tag = tag;
        if (click != null) {
            item.addEventListener("click", click);
        }
        return item;
    }
    static AddItemListBox(name, item) {
        document.getElementById(name).add(item);
    }
}