"use strict";
/**
 * Класс отвечающий за получение описаний полей по идентификатору модуля
 */
class FactoryTextModule {

    _idMove = "перебираются по комбинации Ctrl+ Alt + Z или нажатием соответствующих кнопок управления.";

    getTextModule(id) {

        switch (id) {
            case "listAddress":
                return {
                    Header: "Адреса по списку",
                    HelpPopup: `Данный помощник будет переходить по списку адресов (ГИД). ГИДы ${this._idMove}`
                };
                break;

            case "editAddress":
                return {
                    Header: "Заявки по списку",
                    HelpPopup: `Данный помощник будет переходить по списку заявок. Заявки ${this._idMove}`,
                    AutoExecute: "Автоматически подтвердить"
                };
                break;

            case "delAddress":
                return {
                    Header: "Удалить по списку",
                    HelpPopup: `Данный помощник будет удалять по списку адресов (ГИД). ГИДы ${this._idMove}`,
                    AutoExecute: "Автоматически удалить"
                };
                break;

            case "decomAddress":
                return {
                    Header: "Удаленные по списку",
                    HelpPopup: `Данный помощник будет переходить по списку удаленных домов (ГИДы). ГИДы ${this._idMove}`,
                    AutoExecute: "Автоматически восстановить"
                };
                break;

            case "copyHelper":
                return {
                    Header: "Помощь в копировании",
                    HelpPopup: "Данный помощник будет вставлять поочередно данные из вашего списка. Данные вставляются в выбранное поле по комбинации Ctrl+ Alt + Z"
                };
                break;

            case "changeAddress":
                return {
                    Header: "Редактировать по списку",
                    HelpPopup: `Данный помощник будет редактировать по списку адресов (ГИД). ГИДы ${this._idMove}`
                };
                break;

            default:
                break;
        }
    }
}