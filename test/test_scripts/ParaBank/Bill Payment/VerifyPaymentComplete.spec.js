// @ts-check
const { test, expect } = require('@playwright/test');
const { ParaBankLoginPageMethods } = require('../../../application_components/page_methods/parabank_login_methods');
const { ParaBankHomePageMethods } = require('../../../application_components/page_methods/parabank_home_methods');
const { ParaBankBillPaymentPageMethods } = require('../../../application_components/page_methods/parabank_billpayments_methods');
const { ParaBankRegistrationPageMethods } = require('../../../application_components/page_methods/parabank_registration_methods');
const { SupportFactory } = require('../../../utilities/support-factory');

const fs = require('fs');
let testParentIssueId = "ParaBank";


let jsonTestData_TC1 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_2.json', 'utf-8'));

test('[' + jsonTestData_TC1["Testcase"] + '] ' + ' - ' + jsonTestData_TC1["TestcaseDescription"] + ' - ' + jsonTestData_TC1["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC1;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  const paraBankHomePageMethods = new ParaBankHomePageMethods(page, test.info());
  const paraBankBillPaymentPageMethods = new ParaBankBillPaymentPageMethods(page, test.info());
  const paraBankRegistrationPageMethods = new ParaBankRegistrationPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  let randomUsername = await supportFactory.generateRandomAplhabets(12);
  testData["Username"] = randomUsername;
  await paraBankLoginPageMethods.goto();
  await paraBankHomePageMethods.clickRegister();
  await paraBankRegistrationPageMethods.register(testData);
  await paraBankRegistrationPageMethods.verifyRegistrationSuccess();
  await paraBankHomePageMethods.clickBillPay();
  await paraBankBillPaymentPageMethods.makeBillPayment(testData);
  await paraBankBillPaymentPageMethods.verifyPaymentComplete();
});
//page.getByRole('link', { name: 'Log Out' }).click();