import puppeteer from 'puppeteer';

export class BrowserUseTool {
  public name = 'browser_use';
  public description = 'Use browser to access web content';

  async execute(url: string): Promise<string> {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(url);
      const content = await page.content();
      return content;
    } finally {
      await browser.close();
    }
  }
}