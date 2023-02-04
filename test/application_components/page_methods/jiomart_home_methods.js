// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.JIOMartPageMethods = class JIOMartPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.txt_search = page.getByPlaceholder('Search essentials, groceries, and more …');
  }

  async goto() {
    await this.page.goto('https://www.jiomart.com');
  }

  async enterSearch(strValue) {
    await this.playwrightFactory.fill(this.txt_search, strValue);
    await this.playwrightFactory.press(this.txt_search, 'Enter');
  }

}