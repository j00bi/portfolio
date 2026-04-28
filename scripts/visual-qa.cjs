const { chromium } = require("playwright");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const root = "C:\\Users\\User\\OneDrive\\Documents\\Claude\\Claude\\projects\\portfolio";

(async () => {
  const browser = await chromium.launch({ executablePath: edge, headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto("http://127.0.0.1:4178/?v=web", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${root}\\remotion-portfolio-mobile.png`, fullPage: false });

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${root}\\remotion-portfolio-projects.png`, fullPage: false });

  const metrics = await page.evaluate(() => ({
    bodyWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
    title: document.querySelector("h1")?.textContent,
    projectsText: document.querySelector("#projects")?.textContent?.slice(0, 120),
  }));

  console.log(JSON.stringify(metrics));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
