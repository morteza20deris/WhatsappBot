const puppeteer = require("puppeteer");

function autoImages() {
  const autoImage = require("./autoImage");

  return autoImage.getRandomImage();
}

// const autoImage = require("autoImage");
var latestMessageNow = "null";
var latestMessagePrev = "null";
var messageToSend = "null";
async function lastMessage() {
  const LatestMessage = await page.evaluate((latestMessageNow) => {
    let messageParent = document.querySelectorAll(".message-in");
    const b = [...messageParent];
    let c = b.map((h) => h.innerText);
    let lastmessageText = c[c.length - 1];
    latestMessageNow = lastmessageText;
    // console.log("LatestMessage run");
    console.log("latestMessageNow: " + latestMessageNow);
    console.log("lastmessageText: " + lastmessageText);

    return lastmessageText;
  }, latestMessageNow);
  latestMessageNow = LatestMessage;

  // console.log("lastMessage run");
  console.log("LatestMessage: " + LatestMessage);
}
// messageToSend = "nully";
async function messageSender(messageToSend2, amountOfMessages) {
  // console.log("messageSender initiated");
  messageToSend = messageToSend2;
  // console.log("messageToSend = messageToSend2");
  for (let i = 0; i < amountOfMessages; i++) {
    // console.log("for loop initiated");
    messageToSend = messageToSend2;
    try {
      // var messageToSend2 = messageToSend;
      messageToSend = messageToSend2;
      // console.log("try loop initiated");
      await page.evaluate((messageToSend2) => {
        // const messageToSend = messageToSend2;
        // console.log("evaluate initiated");
        document.execCommand("insertText", false, `${messageToSend2}`);
        console.log("message sent");
      }, messageToSend2);
      await page.click("span[data-testid='send']");
      console.log("message sent");
      await delay(500);
    } catch (error) {
      const editor = await page.$(".DuUXI");
      await editor.focus();
      // console.log("message box selected");
      console.log("-----error-----: " + error);
      await delay(5000);
    }
  }
}
// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    var browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");
    console.log("whatsapp Launched");
    // console.log(words[1].BadWord + " : "+ words[1].Response);
    // //Searches person by title
    // await delay(60000);
    let loadeds = false;
    while (!loadeds) {
      try {
        await page.waitForSelector("._3LtPa");
        loadeds = true;
      } catch (error) {
        loadeds = false;
      }
    }

    console.log("whatsapp Loaded");
    await delay(5000);

    //Change to contact you want to send messages to
    const contactName = "والارمورگولیس(زن عنکبوتی)";
    // const contactName = "Danial Madmolil";
    clicked = false;
    await page.click(`span[title='${contactName}']`);
    checkContact();

    // console.log("contact selected");
    await page.waitForSelector("._2AuNk");

    //Finds the message bar and focuses on it
    const editor = await page.$(".DuUXI");
    await editor.focus();
    console.log("message box selected");
    await delay(5000);

    //Amount of messages you want to send
    // messageSender("fuck you", 100);
    //Loops through cycle of sending message
    while (true) {
      if (latestMessageNow == latestMessagePrev) {
        await lastMessage();
        console.log("latestMessageNow: " + latestMessageNow);
        // console.log("latestMessageNow == latestMessagePrev");
        await delay(1000);
      } else {
        // console.log("latestMessageNow != latestMessagePrev");
        await lastMessage();
        console.log("latestMessageNow: " + latestMessageNow);
        const words = words2();
        words221 = "عکس";
        for (let i = 0; i < words.length; i++) {
          // -------------------------------------HERE-----------------------------------------------
          if (
            latestMessageNow != null &&
            latestMessageNow.includes(words[i].BadWord)
          ) {
            console.log("bad word found: " + words[i].Response);
            // let dd = words[i].Response;
            // let dd = "danial";
            await messageSender(words[i].Response, 1);
            console.log("sending response succesful");
            latestMessagePrev = latestMessageNow;
            await delay(1000);
            break;
          } else if (latestMessageNow.includes(words221)) {
            let newImage = await autoImages();
            await messageSender(
              newImage[getRandomNumbers(newImage.length) - 1],
              1
            );
            console.log("sending response succesful");
            i = words.length - 1;
            latestMessagePrev = latestMessageNow;
          } else {
            // console.log("no bad word");
            // await delay(5000);
          }
        }
      }
      await delay(1000);
      console.log("reCheck");
    }
    await lastMessage();
    console.log("latestMessageNow2: " + latestMessageNow);
  } catch (e) {
    console.error("error mine", e);
  }

  
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function checkContact(){
  while (true) {
    let checkContacts = page.document.querySelectorAll(
      `span[title='${contactName}']`
    );
    if (checkContacts.length < 2) {
      await page.click(`span[title='${contactName}']`);
      console.log("Contact selected");
      // await delay(5000);
    } else {
      // await delay(5000);
    }
    await delay(60000);
  }
}

function words2() {
  let wordssss = require("./words.json");
  return wordssss;
}

function getRandomNumbers(end) {
  return Math.floor(Math.random() * end) + 1;
}

async function getQRImage() {
  var qrLink = document
    .querySelector('canvas[aria-label="Scan me!"]')
    .toDataURL();
  return qrLink;
}
