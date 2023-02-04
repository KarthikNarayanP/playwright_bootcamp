// playwright-dev-page.js
const { expect } = require('@playwright/test');
const fs = require('fs');
const AxeBuilder = require('@axe-core/playwright').default;


exports.PlaywrightFactoryActions = class PlaywrightFactoryActions {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  /*###################    BASIC ACTIONS     ####################*/

  async click(locator) {
    await locator.click();
  }

  async fill(locator, strValue) {
    await locator.fill(strValue);
  }

  async press(locator, strValue) {
    await locator.press(strValue);
  }

  async checkByLabel(strLabel) {
    await this.page.getByLabel(strLabel).check();
  }

  async verifyCheckedByLabel(strLabel) {
    expect(await this.page.getByLabel(strLabel).isChecked()).toBeTruthy()
  }
  
  async selectMultiple(locator, arrayOptionsValue) {
    await locator.selectOption(arrayOptionsValue);
  }

  async selectByVisibleText(locator, strValue) {
    await locator.selectOption({ label: strValue });
  }

  async selectByValue(locator, strValue) {
    await locator.selectOption(strValue);
  }

  /*###################    EXPLICIT WAITING COMPONENTS     ####################*/

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDomLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /*###################     VERIFICATION COMPONENETS     ####################*/

  async verifyVisible(locator, description) {
    await this.embedScreenshot(description + " VERIFY VISIBLE - VALIDATION SCREENSHOT");
    await expect(locator).toBeVisible();
  }

  async verifyHidden(locator, description) {
    await this.embedScreenshot(description + " VERIFY HIDDEN - VALIDATION SCREENSHOT");
    await expect(locator).toBeHidden();    
  }

  async verifyValue(locator, strExpectedValue, description) {
    await this.embedScreenshot(description + " VERIFY VALUE - VALIDATION SCREENSHOT");
    await expect(locator).toHaveValue(strExpectedValue);
  }

  async verifyDisabled(locator, description) {
    await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
    await expect(locator).not.toBeEditable();
  }
  
  async verifyEnabled(locator, description) {
    await this.embedScreenshot(description + " VERIFY ENABLED - VALIDATION SCREENSHOT");
    await expect(locator).toBeEditable();
  }
  
  async embedScreenshot(description) {
    const screenshot = await this.page.screenshot({fullPage: true });
    await this.testInfo.attach(description, { body: screenshot, contentType: 'image/png' });  
  }

  /*###################     VISUAL VALIDATION    ####################*/

  async verifySnapshot(locator) {
    await expect(locator).toHaveScreenshot();
    const screenshot = await locator.screenshot();
    await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", { body: screenshot, contentType: 'image/png' }); 
  }

  /*###################     MOCKING    ####################*/

  async mockApi(endpointURL, jsonPayload) {
     console.log(jsonPayload);
     await this.page.route(endpointURL, async route => {
     await route.fulfill(jsonPayload);
    });
  }

  /*###################     ACCESSIBILITY    ####################*/

  async validateAccessibility(strDescription){
    let currentPage = this.page;
     const accessibilityScanResults = await new AxeBuilder({ currentPage }).analyze();

      await testInfo.attach('accessibility-scan-results-'+strDescription, {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });

      expect(accessibilityScanResults.violations).toEqual([]);
  }

}