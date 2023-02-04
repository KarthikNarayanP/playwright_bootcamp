// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.ParaBankHomePageMethods = class ParaBankHomePageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.lnk_billpay =  page.getByRole('link', { name: 'Bill Pay' });
    this.lnk_logout =  page.getByRole('link', { name: 'Log Out' });
    this.lnk_register =  page.getByRole('link', { name: 'Register' });
  }

  async clickBillPay() {
    await this.playwrightFactory.click(this.lnk_billpay);
  }

  async verifyBillPayPresent() {
    await this.playwrightFactory.verifyVisible(this.lnk_billpay, "Bill Pay");
  }

  async clickLogout() {
    await this.playwrightFactory.click(this.lnk_logout);
  }

  async clickRegister() {
    await this.playwrightFactory.click(this.lnk_register);
  }

}