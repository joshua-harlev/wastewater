interface CSVOptions {

}
class CSVFile extends File {
    constructor(fileType: FileType, downloadLink : string, sheetName: string, options: CSVOptions) {
        super(fileType, downloadLink, sheetName, options);
    }
    exportToSheet(sheetName: string): void {
        // to implement
    }
}