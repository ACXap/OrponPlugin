"use strict";
/**
 * Класс для реализации сервиса по работе с файлами, добавление данных, получение файла
 */
class FileService {
    /** @private данные для сохранения в фале */
    _dataForSave;
    /** @private элемент для получения файла с данными */
    _downloadFile = document.createElement("a");

    /**
     * Конструктор сервиса по работе с файлами
     * @param {string} fileName Заголовок имени файла
     */
    constructor(fileName) {
        this._downloadFile.download = `${fileName}_${this._formatDate(new Date())}.csv`;
    }

    /**
     * Метод для добавления данных в файл
     * @param {string} data Данные в строковом представлении
     */
    addData(data) {
        if (!this._dataForSave) this._dataForSave = "data:application/txt;charset=utf-8,%EF%BB%BF";
        this._dataForSave += encodeURIComponent(data);
    }

    /**
     * Метод для добавления данных в файл
     * @param {Array} data Данные в строковом представлении
     */
    addDatas(data) {
        this.addData(data.join("\r\n"));
    }

    /**
     * Метод получения(загрузки) файла
     * Если он пустой, то ничего не загружается
     */
    getFile() {
        if (!this._dataForSave) return;
        this._downloadFile.href = this._dataForSave;
        this._downloadFile.click();
    }

    /**
     * Метод получения даты в нужном формате 12_01_20_12_12 (дд_мм_гг_ч_м)
     * @param {Date} date 
     * @returns {string} Дата в нужном формате
     */
    _formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = `0${dd}`;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = `0${mm}`;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = `0${yy}`;

        return `${dd}_${mm}_${yy}_${date.getHours()}_${date.getMinutes()}`;
    }
}