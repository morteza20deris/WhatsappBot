const puppeteer = require("puppeteer");

// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");
    console.log("whatsapp Launched");
    // //Searches person by title
    await page.waitForSelector("._3LtPa");
    console.log("whatsapp Loaded");
    await delay(5000);

    //Change to contact you want to send messages to
    const contactName = "والارمور گولیس(زن عنکبوت)";
    await page.click(`span[title='${contactName}']`);
    console.log("contact selected");
    await page.waitForSelector("._2AuNk");

    //Finds the message bar and focuses on it
    const editor = await page.$(".DuUXI");
    await editor.focus();
    console.log("message box selected");

    //Amount of messages you want to send
    const amountOfMessages = 500;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      try {
        await page.evaluate(() => {
          const message = "fuck you";
          document.execCommand("insertText", false, message);
        });
        await page.click("span[data-testid='send']");
        console.log("message sent");
        await delay(500);
      } catch (error) {
        const editor = await page.$(".DuUXI");
        await editor.focus();
        console.log("message box selected");
      }
    }
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
