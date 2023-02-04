// @ts-check
const { test, expect } = require('@playwright/test');
const { ParaBankLoginPageMethods } = require('../../../application_components/page_methods/parabank_login_methods');
const { ParaBankHomePageMethods } = require('../../../application_components/page_methods/parabank_home_methods');
const { ParaBankRegistrationPageMethods } = require('../../../application_components/page_methods/parabank_registration_methods');
const { SupportFactory } = require('../../../utilities/support-factory');
const fs = require('fs');
let testParentIssueId = "ParaBank";


let jsonTestData_TC1 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_1.json', 'utf-8'));

test('[' + jsonTestData_TC1["Testcase"] + '] ' + ' - ' + jsonTestData_TC1["TestcaseDescription"] + ' - ' + jsonTestData_TC1["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC1;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  const paraBankHomePageMethods = new ParaBankHomePageMethods(page, test.info());
  const paraBankRegistrationPageMethods = new ParaBankRegistrationPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  let randomUsername = await supportFactory.generateRandomAplhabets(12);
  testData["Username"] = randomUsername;
  await paraBankLoginPageMethods.goto();
  await paraBankHomePageMethods.clickRegister();
  await paraBankRegistrationPageMethods.register(testData);
  await paraBankRegistrationPageMethods.verifyRegistrationSuccess();
  await paraBankHomePageMethods.clickLogout();
  await paraBankLoginPageMethods.login(testData["Username"],testData["Password"]);
  await paraBankHomePageMethods.verifyBillPayPresent();
});

let jsonTestData_TC3 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_3.json', 'utf-8'));

test('[' + jsonTestData_TC3["Testcase"] + '] ' + ' - ' + jsonTestData_TC3["TestcaseDescription"] + ' - ' + jsonTestData_TC3["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC3;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  await paraBankLoginPageMethods.goto();
  await paraBankLoginPageMethods.verifyLoginSection();
});


let jsonTestData_TC4 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_4.json', 'utf-8'));

test('[' + jsonTestData_TC4["Testcase"] + '] ' + ' - ' + jsonTestData_TC4["TestcaseDescription"] + ' - ' + jsonTestData_TC4["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC4;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  const paraBankHomePageMethods = new ParaBankHomePageMethods(page, test.info());
  const paraBankRegistrationPageMethods = new ParaBankRegistrationPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  let randomUsername = await supportFactory.generateRandomAplhabets(12);
  testData["Username"] = randomUsername;
  await paraBankLoginPageMethods.goto();
  await paraBankRegistrationPageMethods.mockAccounts();
  await paraBankHomePageMethods.clickRegister();
  await paraBankRegistrationPageMethods.register(testData);
  await paraBankRegistrationPageMethods.verifyRegistrationSuccess();
  await paraBankHomePageMethods.clickLogout();
  await paraBankLoginPageMethods.login(testData["Username"],testData["Password"]);
});


let jsonTestData_TC5 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_5.json', 'utf-8'));

test('[' + jsonTestData_TC5["Testcase"] + '] ' + ' - ' + jsonTestData_TC5["TestcaseDescription"] + ' - ' + jsonTestData_TC5["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC5;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  const paraBankHomePageMethods = new ParaBankHomePageMethods(page, test.info());
  const paraBankRegistrationPageMethods = new ParaBankRegistrationPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  let randomUsername = await supportFactory.generateRandomAplhabets(12);
  testData["Username"] = randomUsername;
  await paraBankLoginPageMethods.goto();
  await paraBankHomePageMethods.clickRegister();
  await paraBankRegistrationPageMethods.register(testData);
  await paraBankRegistrationPageMethods.verifyRegistrationSuccess();
  await paraBankHomePageMethods.clickLogout();
  await paraBankLoginPageMethods.login(testData["Username"],testData["Password"]);
  await paraBankHomePageMethods.verifyBillPayPresent();
});


let jsonTestData_TC6 = JSON.parse(fs.readFileSync('./test/data/' + testParentIssueId + '/TC_6.json', 'utf-8'));

test('[' + jsonTestData_TC6["Testcase"] + '] ' + ' - ' + jsonTestData_TC6["TestcaseDescription"] + ' - ' + jsonTestData_TC6["Tags"], async ({ page }) => {
  let testData = jsonTestData_TC6;
  const paraBankLoginPageMethods = new ParaBankLoginPageMethods(page, test.info());
  const paraBankHomePageMethods = new ParaBankHomePageMethods(page, test.info());
  const paraBankRegistrationPageMethods = new ParaBankRegistrationPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  let randomUsername = await supportFactory.generateRandomAplhabets(12);
  testData["Username"] = randomUsername;
  await paraBankLoginPageMethods.goto();
  await paraBankHomePageMethods.clickRegister();
  await paraBankRegistrationPageMethods.register(testData);
  await paraBankRegistrationPageMethods.verifyRegistrationSuccess();
  await paraBankHomePageMethods.clickLogout();
  await paraBankLoginPageMethods.login(testData["Username"],testData["Password"]);
  await paraBankHomePageMethods.verifyBillPayPresent();
});