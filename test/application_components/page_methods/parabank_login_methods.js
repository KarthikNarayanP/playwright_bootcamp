// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.ParaBankLoginPageMethods = class ParaBankLoginPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.txt_username = page.locator('input[name="username"]');
    this.txt_password = page.locator('input[name="password"]');
    this.btn_login = page.getByRole('button', { name: 'Log In' });
    this.section_login = page.locator('#loginPanel');
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  }

  async enterUserName(strValue) {
    await this.playwrightFactory.fill(this.txt_username, strValue);
  }

  async enterPassword(strValue) {
    await this.playwrightFactory.fill(this.txt_password, strValue);
  }

  async clickLogin() {
    await this.playwrightFactory.click(this.btn_login);
  }

  async login(strUserName, strPassword) {
    await this.enterUserName(strUserName);
    await this.enterPassword(strPassword);
    await this.clickLogin();
  }

  async verifyLoginSection() {
    await this.playwrightFactory.verifySnapshot(this.section_login);
  }
}