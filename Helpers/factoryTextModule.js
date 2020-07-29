"use strict";
/**
 * Класс отвечающий за получение описаний полей по идентификатору модуля
 */
class FactoryTextModule {

    _idMove = "перебираются по комбинации Ctrl+ Alt + Z или нажатием соответствующих кнопок управления.";
    _helper = "Данный помощник будет ";

    getTextModule(id) {

        switch (id) {
            case "listAddress":
                return {
                    Header: "Адреса по списку",
                    HelpPopup: `${this._helper}переходить по списку адресов (ГИД). ГИДы ${this._idMove}`
                };

            case "editAddress":
                return {
                    Header: "Заявки по списку",
                    HelpPopup: `${this._helper}переходить по списку заявок. Заявки ${this._idMove}`,
                    AutoExecute: "Автоматически подтвердить"
                };

            case "delAddress":
                return {
                    Header: "Удалить по списку",
                    HelpPopup: `${this._helper}удалять по списку адресов (ГИД). ГИДы ${this._idMove}`,
                    AutoExecute: "Автоматически удалить"
                };

            case "decomAddress":
                return {
                    Header: "Удаленные по списку",
                    HelpPopup: `${this._helper}переходить по списку удаленных домов (ГИДы). ГИДы ${this._idMove}`,
                    AutoExecute: "Автоматически восстановить"
                };

            case "copyHelper":
                return {
                    Header: "Помощь в копировании",
                    HelpPopup: `${this._helper}вставлять поочередно данные из вашего списка. Данные вставляются в выбранное поле по комбинации Ctrl+ Alt + Z`
                };

            case "changeAddress":
                return {
                    Header: "Редактировать по списку",
                    HelpPopup: `${this._helper}редактировать по списку адресов (ГИД). ГИДы ${this._idMove}`
                };

            case "foundAddress":
                return {
                    Header: "Поиск по списку",
                    HelpPopup: `${this._helper} помогать искать адреса по списку адресов (ГИД)`
                };

            default:
                break;
        }
    }
}