// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.JIOMartSearchListerPageMethods = class JIOMartSearchListerPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.dyn_1_lnk_item_name = page.getByRole('link');
  }

  async clickProductByName(strProductName) {
    await this.playwrightFactory.click(this.dyn_1_lnk_item_name.filter({ hasText: strProductName}));
  }

}