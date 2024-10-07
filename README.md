# Wastewater Data Processor

How To Install:

1. Clone this repository.
2. Install [clasp](https://github.com/google/clasp).
3. Create a new Google Sheet.
4. Open Google Apps Script within the Google Sheet using Extensions -> Apps Script
5. Copy the script ID in the URL.
6. Open the repository in a terminal/shell. 
7. Run `clasp clone "yourScriptIDHere"`, putting your script's ID in quotes.
8. Delete Code.gs.
9. Run `npm i`
---
How to Develop:

* After editing a script file, type `clasp push`. Then, you can either open your apps script manually or type `clasp open`.
* Note: `clasp push --watch` can be used to automatically push changes; use carefully!
---
Notes:

- Clasp will automatically compile your ts code into a gs file, which will appear in the Apps Script editor. Be aware that seeing `// Compiled using undefined undefined (TypeScript 4.9.5)` is normal.