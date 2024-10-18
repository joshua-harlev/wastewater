enum FileType {
    CSV,
    JSON
}
abstract class File {
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

    abstract exportToSheet(sheetName: string) : void;

    getDataFile() : void {
        const data = UrlFetchApp.fetch(this.link).getAs("text/csv");
        this.file = DriveApp.getFolderById(dataFolderId).createFile(data);
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