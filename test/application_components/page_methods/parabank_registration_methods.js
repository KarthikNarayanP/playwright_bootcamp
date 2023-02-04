// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.ParaBankRegistrationPageMethods = class ParaBankRegistrationPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.txt_firstname = page.locator('[id="customer\\.firstName"]');
    this.txt_lastname = page.locator('[id="customer\\.lastName"]');
    this.txt_street = page.locator('[id="customer\\.address\\.street"]');
    this.txt_city = page.locator('[id="customer\\.address\\.city"]');
    this.txt_state = page.locator('[id="customer\\.address\\.state"]');
    this.txt_zipcode = page.locator('[id="customer\\.address\\.zipCode"]');
    this.txt_phonenumber = page.locator('[id="customer\\.phoneNumber"]');
    this.txt_ssn = page.locator('[id="customer\\.ssn"]');
    this.txt_username = page.locator('[id="customer\\.username"]');
    this.txt_password = page.locator('[id="customer\\.password"]');
    this.txt_confirmpassword = page.locator('#repeatedPassword');
    this.btn_register = page.getByRole('button', { name: 'Register' });
    this.emt_registration_success_verification = page.getByText('Your account was created successfully. You are now logged in.');
  }

  async verifyFirstNameVisible() {
    await this.playwrightFactory.verifyVisible(this.txt_firstname, "First Name");
  }

  async enterFirstName(strValue) {
    await this.playwrightFactory.fill(this.txt_firstname, strValue);
  }

  async enterLastName(strValue) {
    await this.playwrightFactory.fill(this.txt_lastname, strValue);
  }

  async enterStreet(strValue) {
    await this.playwrightFactory.fill(this.txt_street, strValue);
  }

  async enterCity(strValue) {
    await this.playwrightFactory.fill(this.txt_city, strValue);
  }

  async enterState(strValue) {
    await this.playwrightFactory.fill(this.txt_state, strValue);
  }

  async enterZipcode(strValue) {
    await this.playwrightFactory.fill(this.txt_zipcode, strValue);
  }

  async enterPhonenumber(strValue) {
    await this.playwrightFactory.fill(this.txt_phonenumber, strValue);
  }

  async enterSSN(strValue) {
    await this.playwrightFactory.fill(this.txt_ssn, strValue);
  }

  async enterUserName(strValue) {
    await this.playwrightFactory.fill(this.txt_username, strValue);
  }

  async enterPassword(strValue) {
    await this.playwrightFactory.fill(this.txt_password, strValue);
  }

  async enterVerificationPassword(strValue) {
    await this.playwrightFactory.fill(this.txt_confirmpassword, strValue);
  }

  async clickRegister() {
    await this.playwrightFactory.click(this.btn_register);
  }

  async verifyRegistrationSuccess() {
    await this.playwrightFactory.verifyVisible(this.emt_registration_success_verification, "Your account was created successfully. You are now logged in.");
  }

  async register(jsonData) {
    await this.verifyFirstNameVisible();
    await this.enterFirstName(jsonData["First Name"]);
    await this.enterLastName(jsonData["Last Name"]);
    await this.enterCity(jsonData["City"]);
    await this.enterStreet(jsonData["Street"]);
    await this.enterState(jsonData["State"]);
    await this.enterZipcode(jsonData["Zipcode"]);
    await this.enterPhonenumber(jsonData["PhoneNumber"]);
    await this.enterSSN(jsonData["SSN"]);
    await this.enterUserName(jsonData["Username"]);
    await this.enterPassword(jsonData["Password"]);
    await this.enterVerificationPassword(jsonData["VerifyPassword"]);
    await this.clickRegister();
  }

  async mockAccounts() {
    let jsonPayloadBody = [{"id":14232,"customerId":12989,"type":"CHECKING","balance":0.00},{"id":16341,"customerId":12989,"type":"SAVINGS","balance":100.00},{"id":16345,"customerId":12989,"type":"SAVINGS","balance":800.00},{"id":16346,"customerId":12989,"type":"SAVINGS","balance":400.00}];

    let jsonPayload =  {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(jsonPayloadBody)
    }

    await this.playwrightFactory.mockApi("**/accounts", jsonPayload);
  }

}