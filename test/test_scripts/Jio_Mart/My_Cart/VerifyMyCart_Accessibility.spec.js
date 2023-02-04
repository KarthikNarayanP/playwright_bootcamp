// @ts-check
const { test, expect } = require('@playwright/test');
const { JIOMartPageMethods } = require('../../../application_components/page_methods/jiomart_home_methods');
const { JIOMartSearchListerPageMethods } = require('../../../application_components/page_methods/jiomart_searchlister_methods');
const { JIOMartProductDetailsPageMethods } = require('../../../application_components/page_methods/jiomart_productdetails_methods');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
let testParentIssueId = "My_Cart";


let jsonTestData_TC5 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_5.json', 'utf-8'));

test('[' + jsonTestData_TC5["Testcase"] + '] ' + ' - ' + jsonTestData_TC5["TestcaseDescription"] + ' - ' + jsonTestData_TC5["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC5;
  const jioMartPageMethods = new JIOMartPageMethods(page, test.info());
  const jioMartSearchListerPageMethods = new JIOMartSearchListerPageMethods(page, test.info());
  const jioMartProductDetailsPageMethods = new JIOMartProductDetailsPageMethods(page, test.info());

  await jioMartPageMethods.goto();
  await jioMartPageMethods.enterSearch("Cadbury Dairy Milk Chocolate");
  await jioMartSearchListerPageMethods.clickProductByName("Cadbury Dairy Milk Chocolate 24 g");
  await jioMartProductDetailsPageMethods.clickAddToCart();
  await jioMartProductDetailsPageMethods.clickGoToCart();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  await test.info().attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json'
  });
  expect(accessibilityScanResults.violations).toEqual([]);
});
