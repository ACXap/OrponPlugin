"use strict";

/**
 * Класс для обработки перемещения по окну браузера
 */
class FloatingWindow {
    _elementHtml;
    _pos1 = 0;
    _pos2 = 0;
    _pos3 = 0;
    _pos4 = 0;
    onChangedCoordinate;

    dragElement() {
        this._elementHtml.onmousedown = this._dragMouseDown.bind(this);
    }

    _dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        this._pos3 = e.clientX;
        this._pos4 = e.clientY;
        this._elementHtml.onmouseup = this._closeDragElement.bind(this);
        this._elementHtml.onmouseleave = this._closeDragElement.bind(this);
        this._elementHtml.onmousemove = this._elementDrag.bind(this);
    }
    _elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        this._pos1 = this._pos3 - e.clientX;
        this._pos2 = this._pos4 - e.clientY;
        this._pos3 = e.clientX;
        this._pos4 = e.clientY;

        const t = this._elementHtml.offsetTop - this._pos2;
        const l = this._elementHtml.offsetLeft - this._pos1;

        if ((t > 1100 || t < 0) || (l > 1700 || l < 50)) {
            return;
        }

        this._elementHtml.style.top = t + "px";
        this._elementHtml.style.left = l + "px";

        this.onChangedCoordinate(this._elementHtml.style.top, this._elementHtml.style.left);
    }

    _closeDragElement() {
        this._elementHtml.onmouseup = null;
        this._elementHtml.onmousemove = null;
        this._elementHtml.onmouseleave = null;
    }
}