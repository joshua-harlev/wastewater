import { Constants } from "./SupportFiles/Constants";
import { UI } from "./SupportFiles/UI";

function onOpen(e) {
    UI.prototype.createMenu();
    const DocumentProperties = PropertiesService.getDocumentProperties();
    if(!DocumentProperties.getProperty("variableColumn")) DocumentProperties.setProperty("variableColumn", "A");
    if(!DocumentProperties.getProperty("dataFolderId")) {
        setDataFolderId();
    }
}

function processDefaultFile() {
    Constants.prototype.getMainFile().exportToSheet();
}

function setDefaultFile() {
    const DocumentProperties = PropertiesService.getDocumentProperties();
    let newColumn = UI.prototype.promptForNewColumn();
    if(newColumn.length > 0) {
        DocumentProperties.setProperty("variableColumn", newColumn);
        UI.prototype.toast("New column has been set: " + newColumn);
    } else {
        UI.prototype.toast("Column not set successfully. Please try again.")
    }
}

function setDataFolderId() {
    const DocumentProperties = PropertiesService.getDocumentProperties();
    let id = UI.prototype.promptForDataFolderId();
    if(id.length > 0) {
        DocumentProperties.setProperty("dataFolderId", id);
        UI.prototype.toast("New data folder ID has been set: " + id);
    } else {
        UI.prototype.toast("ID not set successfully. Please reload and try again.")
    }
}