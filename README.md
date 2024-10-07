# Wastewater Data Processor
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

How To Install:

1. Clone this repository.
1. Install [clasp](https://github.com/google/clasp).
1. Enable the [Google Apps Script API](https://script.google.com/home/usersettings); see clasp documentation for more.
1. Create a new Google Sheet.
1. Open Google Apps Script within the Google Sheet using Extensions -> Apps Script
1. Copy the script ID in the URL.
1. Open the repository in a terminal/shell. 
1. Run `clasp clone "yourScriptIDHere"`, putting your script's ID in quotes.
1. Delete Code.gs.
1. Run `npm i`
---
How to Develop:

* After editing a script file, type `clasp push`. Then, you can either open your apps script manually or type `clasp open`.
* Note: `clasp push --watch` can be used to automatically push changes; use carefully!
---
Notes:

- Clasp will automatically compile your ts code into a gs file, which will appear in the Apps Script editor. Be aware that seeing `// Compiled using undefined undefined (TypeScript 4.9.5)` is normal.