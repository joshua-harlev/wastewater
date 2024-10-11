enum FileType {
    CSV,
    JSON
}
class File {
    fileType: FileType;
    downloadLink: string;
    sheetName: string;
    options: JSONOptions | CSVOptions;

    constructor(fileType: FileType, link: string, sheetName: string, options: JSONOptions | CSVOptions) {
        this.fileType = fileType;
        this.link = link;
        this.sheetName = sheetName;
        this.options = options;
    }

    // #region GettersAndSetters
    get link() {
        return this.downloadLink;
    }
    set link(link: string) {
        // regex src: https://jeffreyshen19.github.io/RegEx-Snippets/
        const linkRegex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
        if(linkRegex.test(link)) {
            this.downloadLink = link;
        } else {
            this.downloadLink = null;
            console.log("Error: Link did not match regex. Please investigate.");
        }
    }
    // #endregion
}