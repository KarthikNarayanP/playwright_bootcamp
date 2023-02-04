// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.ParaBankBillPaymentPageMethods = class ParaBankBillPaymentPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.txt_name = page.locator('input[name="payee\\.name"]');
    this.txt_street = page.locator('input[name="payee\\.address\\.street"]');
    this.txt_city = page.locator('input[name="payee\\.address\\.city"]');
    this.txt_state = page.locator('input[name="payee\\.address\\.state"]');
    this.txt_zipcode = page.locator('input[name="payee\\.address\\.zipCode"]');
    this.txt_phonenumber = page.locator('input[name="payee\\.phoneNumber"]');
    this.txt_accountnumber = page.locator('input[name="payee\\.accountNumber"]');
    this.txt_verifyaccount = page.locator('input[name="verifyAccount"]');
    this.txt_amount = page.locator('input[name="amount"]');
    this.lst_account = page.getByRole('combobox');
    this.btn_sendpayment = page.getByRole('button', { name: 'Send Payment' });
    this.emt_payment_verification = page.getByRole('heading', { name: 'Bill Payment Complete' });
  }

  async enterName(strValue) {
    await this.playwrightFactory.fill(this.txt_name, strValue);
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

  async enterAccountnumber(strValue) {
    await this.playwrightFactory.fill(this.txt_accountnumber, strValue);
  }

  async enterVerifyAccountnumber(strValue) {
    await this.playwrightFactory.fill(this.txt_verifyaccount, strValue);
  }

  async enterAmount(strValue) {
    await this.playwrightFactory.fill(this.txt_amount, strValue);
  }

  async selectAccountNum(strValue) {
    await this.playwrightFactory.fill(this.txt_amount, strValue);
  }

  async clickSendPayment() {
    await this.playwrightFactory.click(this.btn_sendpayment);
  }

  async verifyPaymentComplete() {
    await this.playwrightFactory.verifyVisible(this.emt_payment_verification, "Bill Payment Complete");
  }

  async makeBillPayment(jsonData) {
    await this.enterName(jsonData["Name"]);
    await this.enterCity(jsonData["City"]);
    await this.enterStreet(jsonData["Street"]);
    await this.enterState(jsonData["State"]);
    await this.enterZipcode(jsonData["Zipcode"]);
    await this.enterPhonenumber(jsonData["PhoneNumber"]);
    await this.enterAccountnumber(jsonData["Accountnumber"]);
    await this.enterVerifyAccountnumber(jsonData["VerificationAccountnumber"]);
    await this.enterAmount(jsonData["Amount"]);
    await this.clickSendPayment();
  }


}