// playwright-dev-page.js
const { expect } = require('@playwright/test');
const fs = require('fs');
const AxeBuilder = require('@axe-core/playwright').default;


exports.PlaywrightFactory = class PlaywrightFactory {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  async click(filePath, locatorName) {
    let locator = await this.getLocator(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.click(locator.locators[0]);
    await this.testInfo.attach(locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
}

async clickDynamic(filePath, locatorName, parameterValue1) {
  let locator = await this.getLocator(filePath, locatorName);
  locator.locators[0] = locator.locators[0].replace("${parameter1}",parameterValue1)
  await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
  await this.page.click(locator.locators[0]);
  await this.testInfo.attach(locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
}

async clickAllIfExists(filePath, locatorName) {
  let locator = await this.getLocator(filePath, locatorName);
  let falgBoolean = await this.page.locator(locator.locators[0]).count();

  while (falgBoolean > 0) {
    await this.page.click(locator.locators[0]);
    falgBoolean = await this.page.locator(locator.locators[0]).count();
  }
  await this.testInfo.attach("All "+locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
}


async sendkeys(filePath, locatorName, strValue) {
  let locator = await this.getLocator(filePath, locatorName);
  await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
  await this.page.fill(locator.locators[0], strValue);
  await this.testInfo.attach(locator.description + " is entered with "+strValue, { body: locator.description + " is entered with "+strValue , contentType: 'text/plain' });
  
}

async presskey(filePath, locatorName, strValue) {
  let locator = await this.getLocator(filePath, locatorName);
  await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
  await this.page.press(locator.locators[0], strValue);
  await this.testInfo.attach(locator.description + " is pressed with "+strValue, { body: locator.description + " is pressed with "+strValue , contentType: 'text/plain' });
  
}

async selectRadio(filePath, locatorName, strValue) {
  let locator = await this.getLocator(filePath, locatorName);
  let locatorToClick = await locator.locators[0].replace('${Value}',strValue);
  await this.page.click(locatorToClick);
  await this.testInfo.attach(locator.description + " is selected with "+strValue, { body: locator.description + " is selected with "+strValue , contentType: 'text/plain' });
  
}

async selectByVisibleText(filePath, locatorName, strValue) {
  let locator = await this.getLocator(filePath, locatorName);
  await this.page.selectOption(locator.locators[0], { label: strValue });
  await this.testInfo.attach(locator.description + " is selected with "+strValue, { body: locator.description + " is selected with "+strValue , contentType: 'text/plain' });
  
}
async selectByValue(filePath, locatorName, strValue) {
  let locator = await this.getLocator(filePath, locatorName);
  await this.page.selectOption(locator.locators[0], strValue);
  await this.testInfo.attach(locator.description + " is selected with "+strValue, { body: locator.description + " is selected with "+strValue , contentType: 'text/plain' });
  
}
  
async getLocator(filePath, locatorName) {
    let rawdata = fs.readFileSync('test/application_components/page_objects/'+filePath+'.json');
    let data  = JSON.parse(rawdata);
    return data.locators[locatorName];   
  }

  async embedScreenshot(description) {
    const screenshot = await this.page.screenshot({fullPage: true });
    await this.testInfo.attach(description, { body: screenshot, contentType: 'image/png' });  
  }


  async verifyHidden(filePath, locatorName) {
    let locator = await this.getLocator(filePath, locatorName);
    let falgBoolean = await this.page.isHidden(locator.locators[0]);
    if(falgBoolean == true){
      await this.embedScreenshot(locator.description + " is Hidden as Expected - Screenshot");
      await this.testInfo.attach(locator.description + " is Hidden as Expected", { body: locator.description + " is Hidden as Expected" , contentType: 'text/plain' });
    }else{
      await this.embedScreenshot(locator.description + " is NOT Hidden - FAILURE");
      await this.testInfo.attach(locator.description + " is NOT Hidden - FAILURE", { body: locator.description + " is NOT Hidden - FAILURE" , contentType: 'text/plain' });
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeHidden();
  }

  async verifyVisible(filePath, locatorName) {
    let locator = await this.getLocator(filePath, locatorName);
    let falgBoolean = await this.page.isVisible(locator.locators[0]);
    if(falgBoolean == true){
      await this.embedScreenshot(locator.description + " is Visible as Expected - Screenshot");
      await this.testInfo.attach(locator.description + " is Visible as Expected", { body: locator.description + " is Visible as Expected" , contentType: 'text/plain' });
    }else{
      await this.embedScreenshot(locator.description + " is NOT Visible - FAILURE");
      await this.testInfo.attach(locator.description + " is NOT Visible - FAILURE", { body: locator.description + " is NOT Visible - FAILURE" , contentType: 'text/plain' });
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeVisible();
  }
  
  
  async verifyValue(filePath, locatorName, strExpectedValue) {
    let locator = await this.getLocator(filePath, locatorName);
    let actualValue = await this.page.inputValue(locator.locators[0]);
    if(strExpectedValue == actualValue){
      await this.embedScreenshot(locator.description + " value is displayed as expected = "+strExpectedValue + " ; actual = "+actualValue );
      await this.testInfo.attach(locator.description + " value is displayed as expected = "+strExpectedValue + " ; actual = "+actualValue, { body: locator.description + " value is displayed as expected = "+strExpectedValue + " ; actual = "+actualValue , contentType: 'text/plain' });
    }else{
      await this.embedScreenshot("FAILURE - "+locator.description + " value is NOT displayed as expected = "+strExpectedValue + " ; actual = "+actualValue );
      await this.testInfo.attach("FAILURE - "+locator.description + " value is NOT displayed as expected = "+strExpectedValue + " ; actual = "+actualValue, { body: locator.description + " value is NOT displayed as expected = "+strExpectedValue + " ; actual = "+actualValue , contentType: 'text/plain' });
      
    }
    await expect.soft(this.page.locator(locator.locators[0])).toHaveValue(strExpectedValue);
  }

  
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDomLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  
  async verifyDisabled(filePath, locatorName) {
    let locator = await this.getLocator(filePath, locatorName);
    let falgBoolean = await this.page.isEditable(locator.locators[0]);
    if(falgBoolean == false){
      await this.embedScreenshot(locator.description + " is Disabled as Expected - Screenshot");
      await this.testInfo.attach(locator.description + " is Disabled as Expected", { body: locator.description + " is Disabled as Expected" , contentType: 'text/plain' });
    }else{
      await this.embedScreenshot(locator.description + " is NOT Disabled - FAILURE");
      await this.testInfo.attach(locator.description + " is NOT Disabled - FAILURE", { body: locator.description + " is NOT Disabled - FAILURE" , contentType: 'text/plain' });
    }
    await expect.soft(this.page.locator(locator.locators[0])).not.toBeEditable();
  }

  
  async verifyEnabled(filePath, locatorName) {
    let locator = await this.getLocator(filePath, locatorName);
    let falgBoolean = await this.page.isEditable(locator.locators[0]);
    if(falgBoolean == true){
      await this.embedScreenshot(locator.description + " is Enabled as Expected - Screenshot");
      await this.testInfo.attach(locator.description + " is Enabled as Expected", { body: locator.description + " is Enabled as Expected" , contentType: 'text/plain' });
    }else{
      await this.embedScreenshot(locator.description + " is NOT Enabled - FAILURE");
      await this.testInfo.attach(locator.description + " is NOT Enabled - FAILURE", { body: locator.description + " is NOT Enabled - FAILURE" , contentType: 'text/plain' });
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeEditable();
  }

  async verifySnapshot(filePath, locatorName, screenshotPath) {
    let locator = await this.getLocator(filePath, locatorName);
    await expect.soft(this.page.locator(locator.locators[0])).toHaveScreenshot(screenshotPath);
    const screenshot = await this.page.locator(locator.locators[0]).screenshot();
    await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", { body: screenshot, contentType: 'image/png' }); 
    
  }

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