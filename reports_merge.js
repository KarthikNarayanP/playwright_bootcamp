const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { mergeHTMLReports } = require("playwright-merge-html-reports");
let rootPath = "//home/runner/work/playwright_bootcamp/playwright_bootcamp/test/test-results/";
let pathToDirectory = rootPath;
let arrFilesPath  = [];
const directoriesInDIrectory = fs.readdirSync(pathToDirectory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

    directoriesInDIrectory.forEach(directory => {
        let framedPathForFile = rootPath+directory+"/playwright-html-report"
        arrFilesPath.push(framedPathForFile);
    });


mergeHTMLReports(arrFilesPath, {
    outputFolderName: "html-report",
});
