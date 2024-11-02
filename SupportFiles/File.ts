import { Constants } from "./Constants";

export enum FileType {
    CSV,
    JSON
}
export abstract class File {
    fileType: FileType;
    downloadLink: string;
    sheetName: string;
    options: JSONOptions | CSVOptions;
    file: GoogleAppsScript.Drive.File;

    constructor(fileType: FileType, downloadLink: string, sheetName: string, options: JSONOptions | CSVOptions) {
        this.fileType = fileType;
        this.link = downloadLink;
        this.sheetName = sheetName;
        this.options = options;
    }

    abstract exportToSheet() : void;

    getDataFile() : void {
        const data = UrlFetchApp.fetch(this.link).getAs("text/csv");
        this.file = DriveApp.getFolderById(Constants.prototype.DATA_FOLDER_ID).createFile(data);
    }

    // #region GettersAndSetters
    get link() {
        return this.downloadLink;
    }
    set link(link: string) {
        // regex src: https://jeffreyshen19.github.io/RegEx-Snippets/
        const linkRegex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
            let linkIsValid = linkRegex.test(link);
            if(linkIsValid) this.downloadLink = link;
            else console.log("Error: Link did not match regex. Please investigate.");
    }
    // #endregion
}

export interface CSVOptions {
    columnEqualities?: [columnName: string, value: string][],
    columnInequalities?: [columnName: string, value: string][],
    dateColumnName?: string
}
export class CSVFile extends File {
    constructor(fileType: FileType, downloadLink : string, sheetName: string, options: CSVOptions) {
        super(fileType, downloadLink, sheetName, options);
    }
    exportToSheet(): void {
        EnsureSheetExists(this.sheetName);
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.sheetName);
        ClearSheet(sheet);
        let csvData = UrlFetchApp.fetch(this.link);
        let dataForSheet = Utilities.parseCsv(csvData.getContentText());
        (this.options as CSVOptions).columnEqualities?.forEach((equality) => {
            const header = dataForSheet.shift();
            let equalityColumn = header.indexOf(equality[0].toString());
            dataForSheet = dataForSheet.filter((row) => {
                // console.log(`${row[equalityColumn]} | ${equality[1].toString()}`)
                return row[equalityColumn] == equality[1].toString();
            })
            dataForSheet.unshift(header);
        });
        // TODO impl. inequalities?
        // (this.options as CSVOptions).columnInequalities?.forEach((inequality) => {
        //     dataForSheet = dataForSheet.filter((row) => {
        //         return row[inequality[0].toString()] != inequality[1].toString();
        //     })
        // });
        const numRows = dataForSheet.length;
        const numCols = dataForSheet[0].length;
        sheet.getRange(1, 1, numRows, numCols).setValues(dataForSheet);
        sheet.setFrozenRows(1);
        if((this.options as CSVOptions)?.dateColumnName != undefined)
            sheet.sort(dataForSheet[0].indexOf((this.options as CSVOptions).dateColumnName)+1)
    }
}

export interface JSONOptions {

}
export class JSONFile extends File {
    exportToSheet(): void {
        // to implement
    }
}