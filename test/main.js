var module1 = '<section class="sectionHeader">    <p class="headerText noneSelect"><b>Помощь в копировании</b></p>    <i class="openHelp fa fa-question"></i>    <div class="popup">        <span class="popuptext">Данный помощник будет вставлять поочередно данные из вашего списка.            Данные вставляются в выбранное поле по комбинации Ctrl+Alt+Z</span>    </div></section><section class="bodyHelper">    <div class="divSectionBodyModule">        <a title="Формат данных: Данные в 1 столбец" class="loadData data-field-link noneSelect">Загрузить список</a>        /        <a title="Формат данных: Данные в 1 столбец" class="clipboardData data-field-link noneSelect">Из буфера</a>    </div>    <div class="divSectionBodyModule">        <a title="Выбрать предыдущий элемент" class="backwardData buttonHelperWindow">            <i style="color:black" class="fa fa-step-backward"></i></a>        <a title="Следующий элемент" class="forwardData buttonHelperWindow">            <i style="color:black;" class="fa fa-step-forward"></i></a>    </div>    <div class="divSectionBodyModule">        Всего элементов: <span class="countElement">0</span>        <br>Осталось: <span class="countLeftElement">0</span>        <br>Следующий элемент: <span class="nextElement"></span>    </div></section>';
var module2 = '<section class="sectionHeader">    <p class="headerText noneSelect"><b>Адреса по списку</b></p>    <i class="openHelp fa fa-question"></i>    <div class="popup">        <span class="popuptext">Данный помощник будет переходить по списку адресов (ГИД).            ГИДы перебираются по комбинации Ctrl+Alt+Z или нажатием соответствующих кнопок управления</span>    </div></section><section class="bodyHelper">    <div class="divSectionBodyModule">        <a title="Формат данных: Данные ГИДы в 1 столбец" class="loadData data-field-link noneSelect">Загрузить список</a>        /        <a title="Формат данных: Данные в 1 столбец" class="clipboardData data-field-link noneSelect">Из буфера</a>    </div>    <div class="divSectionBodyModule">        <a title="Предыдущий элемент" class="backwardData buttonHelperWindow">            <i style="color:black" class="fa fa-step-backward"></i></a>        <a title="Следующий элемент" class="forwardData buttonHelperWindow">            <i style="color:black;" class="fa fa-step-forward"></i></a>    </div>    <div class="divSectionBodyModule">        Всего элементов: <span class="countElement">0</span>        <br>Осталось: <span class="countLeftElement">0</span>        <br>Следующий элемент: <span class="nextElement"></span>    </div></section>';
var module3 = '<section class="sectionHeader">    <i title="Не запущено" class="fa fa-circle fa-fw statusIcon"></i>    <p class="headerText noneSelect"><b>Синхронизация списка адресов</b></p>    <i class="openHelp fa fa-question"></i>    <div class="popup">        <span class="popuptext">Данный помощник будет синхронизировать адреса (ГИДы) по списку с выбранной            системой. Система указывается или в данных: "ГИД;Система" или на странице адреса при запуске помощника.</span>    </div></section><section class="bodyHelper">    <div class="divSectionBodyModule">        <a title="Формат данных: ГИД;Идентификатор системы" class="loadData data-field-link">Загрузить список</a>        /        <a title="Формат данных: Данные в 1 столбец" class="clipboardData data-field-link noneSelect">Из буфера</a>    </div>    <div class="divSectionBodyModule">        <a title="Предыдущий элемент" class="backwardData buttonHelperWindow">            <i style="color:black" class="fa fa-step-backward"></i></a>        <a title="Запустить помощника" class="startSync buttonHelperWindow">            <i style="color:green;" class="fa fa-play"></i></a>        <a title="Следующий элемент" class="forwardData buttonHelperWindow">            <i style="color:black;" class="fa fa-step-forward"></i></a>        <a title="Остановить помощника" class="stopSync buttonHelperWindow">            <i style="color:red;" class="fa fa-stop"></i></a>    </div>    <div class="divSectionBodyModule">        Всего элементов: <span class="countElement">0</span>        <br>Осталось: <span class="countLeftElement">0</span>        <br>Следующий элемент: <span class="nextElement"></span>    </div></section>';
var module4 = '<section class="sectionHeader">    <p class="headerText noneSelect"><b>Копировать адрес</b></p>    <i class="openHelp fa fa-question"></i>    <div class="popup">        <span class="popuptext">Данный помощник позволяет копировать данные о адресе одним нажатием или комбинацией Ctrl+Alt+Z</span>    </div></section><section class="bodyHelper">    <div class="divSectionBodyModule">        <a title="Скопировать адрес и ГИД" class="copyData data-field-link noneSelect" style="margin: 5px;">Скопировать адрес и ГИД</a>    </div></section>';
var html = '<style type="text/css">    #helperFloatingWindow {        position: fixed;        z-index: 9;        background-color: rgb(255, 255, 255);        border: 1px solid rgb(66, 139, 202);        text-align: center;        width: 250px;    }    #helperFloatingWindowHeader {        padding: 10px;        z-index: 10;        background-color: rgb(66, 139, 202);        color: rgb(255, 255, 255);    }    #openBodyHelper {        position: absolute;        cursor: pointer;        left: 215px;    }    .sectionHeader {        cursor: pointer;        display: flex;        height: 50px;        border-top: 1px solid rgb(66, 139, 202);        border-bottom: 1px solid rgb(66, 139, 202);    }    .sectionHeader:hover {        color: #fff;        background-color: #428bca;    }    .headerText {        margin: auto;        text-align: center;    }    .popuptext {        width: 200px;        background-color: #555;        color: #fff;        border-radius: 6px;        padding: 8px 5px;        position: absolute;        z-index: 1;        left: 254px;    }    .popuptext::after {        content: "";        position: absolute;        top: 20%;        left: -2%;        margin-left: -5px;        border-width: 5px;        border-style: solid;        border-color: #555 transparent transparent transparent;        transform: rotate(90deg);    }    .bodyHelper {        display: none;    }    .showElement {        visibility: visible;    }    .showModule {        display: block;    }    .rotate180 {        transform: rotate(180deg);    }    .noneSelect {        user-select: none;    }    .buttonHelperWindow {        padding: 10px 15px;        border: 1px solid #ccc;        border-radius: 10%;        user-select: none;    }    .openHelp {        margin-right: 10px;        margin-top: 5px;    }    .buttonHelperWindow:hover {        color: #fff;        background-color: #428bca;        border: 1px solid #428bca;    }    .statusIcon {        color: red;        margin-left: 5px;        margin-top: 18px;    }    .divSectionBodyModule {        padding: 10px;    }    .nextElement {        color: red;        font-size: large;    }    .popup {        visibility: hidden;    }    .openHelp:hover+.popup {        visibility: visible;    }</style><div id="helperFloatingWindowHeader" class="noneSelect">Помощник ОРПОН<i id="openBodyHelper" class="fa fa-angle-down">V</i></div><div id="helperFloatingWindowBody" class="bodyHelper"></div>';

var htmlMap = '<style type="text/css">    .rootMapDiv {        background-color: fff;        width: 700px;        height: 500px;    }        .buttonClose {        margin-left: 90%;        margin-top: 5px;        padding: 5px;    }        #map {        height: 92%;        width: 98%;        margin: 0 auto;    }</style><div class="rootMapDiv">    <div class="buttonClose"><a id="closeMap" class="btn btn-secondary-a btn-second">Закрыть</a></div>    <div id="map"></div></div>';

startMap();

start(html);

function startMap() {
    const b = document.querySelector("#showMap");
    b.onclick = () => {
        const map = new Map(htmlMap);
    }
}

function start(html) {
    const hfw = new HelperFloatingWindow({
        model: new HelperFloatingWindowModel(),
        view: new HelperFloatingWindowView({
            top: "100px",
            left: "100px",
            html: html
        }),
    });

    let m = new ModuleFloatingWindow({
        id: "copyHelper",
        model: new ModuleFloatingWindowModel(),
        view: new CopyHelpModuleView({ id: "copyHelper", html: module1 })
    });

    hfw.addModule(m);

    m = new ModuleFloatingWindow({
        id: "listAddress",
        model: new ModuleFloatingWindowModel(),
        view: new ListAddressModuleView({ id: "listAddress", html: module2 })
    });

    hfw.addModule(m);

    m = new SyncListAddressModule({
        id: "syncListAddress",
        model: new ModuleFloatingWindowModel(),
        view: new SyncListAddressModuleView({ id: "syncListAddress", html: module3 })
    });

    hfw.addModule(m);

    m = new CopyAddressModule({
        id: "syncListAddress",
        model: null,
        view: new CopyAddressModuleView({ id: "syncListAddress", html: module4 })
    });

    hfw.addModule(m);
}