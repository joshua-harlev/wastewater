import { File, CSVFile, CSVOptions, JSONFile, JSONOptions } from "./File";
import { FileType } from "./File";

export class Constants {
    DATA_FOLDER_ID : string;
    VAR_SHEET : GoogleAppsScript.Spreadsheet.Sheet;
    URL : string;
    SHEET_NAME : string;
    MAIN_FILE_OPTIONS : CSVOptions;

    ensureVariablesSet() {
        const DocumentProperties = PropertiesService.getDocumentProperties();
        const columnLetter = DocumentProperties.getProperty("variableColumn");
        this.DATA_FOLDER_ID = DocumentProperties.getProperty("dataFolderId");
        this.VAR_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Variables");
        this.URL = this.VAR_SHEET.getRange(`${columnLetter}1`).getValue();
        this.SHEET_NAME = this.VAR_SHEET.getRange(`${columnLetter}2`).getValue();
        if(this.SHEET_NAME == "CAGovData") {
            this.MAIN_FILE_OPTIONS  = {
                columnEqualities: [
                    ["wwtp_name", "OCSD_P1"],
                    ["pcr_gene_target", "n1"]
                ],
                columnInequalities: [
                    ["pcr_target_avg_conc", "0"]
                ]
            }
        } else if(this.SHEET_NAME == "CDPHDashboard") {
            this.MAIN_FILE_OPTIONS = {
                columnEqualities: [
                    ["Wwtp Name", "Orange"],
                    ["ten rollC", ""]
                ],
                dateColumnName: "Sample Date"
            }
        }
    }

    getMainFile() : File {
        this.ensureVariablesSet();
        let MAIN_FILE : File = new CSVFile(FileType.CSV, this.URL, this.SHEET_NAME, this.MAIN_FILE_OPTIONS);
        return MAIN_FILE;
    }
}

