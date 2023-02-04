// playwright-dev-page.js
const { expect } = require('@playwright/test');
const { PlaywrightFactoryActions } = require('../../utilities/playwright_factory_actions');

exports.JIOMartProductDetailsPageMethods = class JIOMartProductDetailsPageMethods {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */


  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.playwrightFactory = new PlaywrightFactoryActions(this.page, this.testInfo);
    this.btn_addToCart = page.locator('#center_col').getByRole('button', { name: 'Add to Cart' });
    this.btn_goToCart = page.locator('#minicart_btn');
  }


  async clickAddToCart() {
    await this.playwrightFactory.click(this.btn_addToCart);
  }

  async clickGoToCart() {
    await this.playwrightFactory.click(this.btn_goToCart);
  }
  

}