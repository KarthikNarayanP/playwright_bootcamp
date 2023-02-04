const fs = require('fs');
const moment = require('moment');
const { expect } = require('@playwright/test');


exports.SupportFactory = class SupportFactory {

    /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async addDaysToCurrentDate(addDays) {
        let date = moment().add(addDays,'d').toDate();
        let formattedDate = moment(date).format('DD-MMM-YYYY');
        return formattedDate;
    }

    
    async addAnnotations(jsonData) {
        this.testInfo.annotations.push({ type: 'test_id', description: jsonData["Testcase"] });
        this.testInfo.annotations.push({ type: 'test_key', description: jsonData["TestKey"] });
        this.testInfo.annotations.push({ type: 'test_summary', description: jsonData["TestSummary"] });
        this.testInfo.annotations.push({ type: 'test_description', description: jsonData["TestcaseDescription"] });
    }

    async generateRandomAplhabets(length) {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}