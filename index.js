const puppeteer = require("puppeteer");
var latestMessageNow = "null";
var latestMessagePrev = "null";
var messageToSend = "null";
async function lastMessage() {
  const LatestMessage = await page.evaluate(() => {
    let messageParent = document.querySelectorAll(".message-in");
    const b = [...messageParent];
    let c = b.map((h) => h.innerText);
    let lastmessageText = c[7];
    latestMessageNow = lastmessageText;
    console.log("LatestMessage run");
    
    return lastmessageText;
  });
  // latestMessageNow = "salam";
  // latestMessageNow = "end";
  latestMessageNow = "empty";
  latestMessageNow = LatestMessage;
  
  console.log("lastMessage run");
}
messageToSend = "nully";
async function messageSender(messageToSend2, amountOfMessages) {
  console.log("messageSender initiated");
  messageToSend = messageToSend2;
  console.log("messageToSend = messageToSend2");
  for (let i = 0; i < amountOfMessages; i++) {

    console.log("for loop initiated");
    messageToSend = messageToSend2;
    try {
      // var messageToSend2 = messageToSend;
      messageToSend = messageToSend2;
      console.log("try loop initiated");
      await page.evaluate((messageToSend2) => {
        // const messageToSend = messageToSend2;
        console.log("evaluate initiated");
        document.execCommand("insertText", false, `${messageToSend2}`);
        console.log("message sent");
      },messageToSend2 );
      await page.click("span[data-testid='send']");
      console.log("message sent");
      await delay(500);
    } catch (error) {
      const editor = await page.$(".DuUXI");
      await editor.focus();
      // console.log("message box selected");
      console.log(error);
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
    // const contactName = "والارمور گولیس(زن عنکبوت)";
    const contactName = "Danial Madmolil";
    await page.click(`span[title='${contactName}']`);
    console.log("contact selected");
    await page.waitForSelector("._2AuNk");

    //Finds the message bar and focuses on it
    const editor = await page.$(".DuUXI");
    await editor.focus();
    console.log("message box selected");

    //Amount of messages you want to send
    // messageSender("fuck you", 100);
    //Loops through cycle of sending message
    while (true) {
      

      if (latestMessageNow == latestMessagePrev) {
        await lastMessage();
        console.log(latestMessageNow);
        console.log("latestMessageNow == latestMessagePrev");
        await delay(5000);
      } else {
        console.log("latestMessageNow != latestMessagePrev");
        for (let i = 0; i < words.length; i++) {
// -------------------------------------HERE-----------------------------------------------
          if (latestMessageNow === words[i].BadWord) {
            console.log("bad word found: "+ words[i].Response);
            // let dd = words[i].Response;
            let dd = "danial";
            await messageSender(words[i].Response, 3);
            console.log("sending response succesful");
            break;
          } else {
            console.log("no bad word");
          }
        }
        
        latestMessagePrev = latestMessageNow;
        await delay(5000);
      }
    }
    await lastMessage();
    console.log(latestMessageNow);
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

var words = [
  {
    "BadWord": "سلام",
    "Response": "سلام"
  },
  {
    "BadWord": "چتوری",
    "Response": "خوبم"
  },
  {
    "BadWord": "کجایی",
    "Response": "خونه"
  },
  {
    "BadWord": "چکار میکنی",
    "Response": "پای کامپیوتر"
  },
  {
    "BadWord": "چکار میکنی؟",
    "Response": "پای کامپیوتر"
  },
  {
    "BadWord": "کجایی؟",
    "Response": "خونه"
  },
  {
    "BadWord": "گمشو",
    "Response": "دانیال"
  },
  {
    "BadWord": "دانیال",
    "Response": "کونیه"
  },
  {
    "BadWord": "ارسلان",
    "Response": "خایه ماله"
  },
];
