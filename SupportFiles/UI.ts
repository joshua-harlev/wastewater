export class UI {
    createMenu() {
        const ui = SpreadsheetApp.getUi();
        ui.createMenu("Wastewater Data Processor")
        .addItem("Process Single File", "processDefaultFile")
        .addItem("Set Default File", "setDefaultFile")
        .addItem("Set Data Folder ID", "setDataFolderId")
        .addToUi();
    }
    toast(message : string) {
        SpreadsheetApp.getActiveSpreadsheet().toast(message);
    }
    promptForNewColumn() : string {
        const ui = SpreadsheetApp.getUi();
        let response = ui.prompt("Which column would you like to default to pulling data from? (default: A)");
        return response.getResponseText();
    }
    promptForDataFolderId() : string {
        const ui = SpreadsheetApp.getUi();
        let response = ui.prompt("Please enter the ID of the Google Drive folder you'd like to save files to:");
        return response.getResponseText();
    }
}