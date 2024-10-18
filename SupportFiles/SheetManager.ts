function EnsureSheetExists(sheetName: string) {
    const activeSS = SpreadsheetApp.getActiveSpreadsheet();
    if(activeSS.getSheetByName(sheetName) != null) {
        return;
    }
    const sheetIndex = 1;
    // inserting at index 1, since 0 is assumed to be the dashboard
    activeSS.insertSheet(sheetName, sheetIndex);
}

function ClearSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet | string) {
    if(typeof sheet == "string") {
        ClearSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet));
        return;
    }
    sheet.clear();
}

function ResizeSheetCols(sheet: GoogleAppsScript.Spreadsheet.Sheet | string, bound: number) {
    if(typeof sheet == "string") {
        ResizeSheetCols(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet), bound);
        return;
    }
    sheet.autoResizeColumns(1, bound);
    Logger.log("Resized columns from 1 to " + bound + " in sheet " + sheet.getSheetName());
}