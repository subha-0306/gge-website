import { chromium } from "playwright";

async function run() {
  console.log("Launching headless browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("console", (msg) => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.error(`[BROWSER ERROR]:`, err.message);
    if (err.stack) {
      console.error(err.stack);
    }
  });

  try {
    console.log("Navigating to http://localhost:5174/blog...");
    await page.goto("http://localhost:5174/blog", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Page loaded. Title:", await page.title());
    
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    console.log("Body HTML length:", bodyContent.length);
    console.log("First 300 chars of body HTML:", bodyContent.substring(0, 300));
  } catch (err) {
    console.error("Navigation/Load error:", err);
  } finally {
    await browser.close();
    console.log("Browser closed.");
  }
}

run();
