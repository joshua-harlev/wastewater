enum FileType {
    CSV,
    JSON
}
abstract class File {
    fileType: FileType;
    downloadLinks: string[];
    sheetName: string;
    options: JSONOptions | CSVOptions;

    constructor(fileType: FileType, links: string[], sheetName: string, options: JSONOptions | CSVOptions) {
        this.fileType = fileType;
        this.links = links;
        this.sheetName = sheetName;
        this.options = options;
    }

    abstract exportToSheet(sheetName: string) : void;

    getDataFiles() : void {

    }

    // #region GettersAndSetters
    get links() {
        return this.downloadLinks;
    }
    set links(links: string[]) {
        // regex src: https://jeffreyshen19.github.io/RegEx-Snippets/
        const linkRegex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
        links.forEach((link) => {
            let linkIsValid = linkRegex.test(link);
            if(linkIsValid) this.downloadLinks.push(link);
            else console.log("Error: Link did not match regex. Please investigate.");
        });
    }
    // #endregion
}