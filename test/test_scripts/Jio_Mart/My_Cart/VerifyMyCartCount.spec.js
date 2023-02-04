// @ts-check
const { test, expect } = require('@playwright/test');
const { JIOMartPageMethods } = require('../../../application_components/page_methods/jiomart_home_methods');
const { JIOMartSearchListerPageMethods } = require('../../../application_components/page_methods/jiomart_searchlister_methods');
const { JIOMartProductDetailsPageMethods } = require('../../../application_components/page_methods/jiomart_productdetails_methods');
const fs = require('fs');
let testParentIssueId = "My_Cart";


let jsonTestData_TC1 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_1.json', 'utf-8'));

test('[' + jsonTestData_TC1["Testcase"] + '] ' + ' - ' + jsonTestData_TC1["TestcaseDescription"] + ' - ' + jsonTestData_TC1["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC1;
  const jioMartPageMethods = new JIOMartPageMethods(page, test.info());
  const jioMartSearchListerPageMethods = new JIOMartSearchListerPageMethods(page, test.info());
  const jioMartProductDetailsPageMethods = new JIOMartProductDetailsPageMethods(page, test.info());

  await jioMartPageMethods.goto();
  await jioMartPageMethods.enterSearch("Cadbury Dairy Milk Chocolate");
  await jioMartSearchListerPageMethods.clickProductByName("Cadbury Dairy Milk Chocolate 24 g");
  await jioMartProductDetailsPageMethods.clickAddToCart();
  await jioMartProductDetailsPageMethods.clickGoToCart();
});
