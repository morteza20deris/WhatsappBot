const puppeteer = require("puppeteer");
var randImgs = null;
var redditPages = [
  "rule34",
  "TruKaitx",
  "lucypinder",
  "KristenLanae",
  "nekane",
  "KaylaKayden",
  "ellealexandra",
  "Ashlynn_Brooke",
  "karleegrey",
  "Payton_Preslee",
  "EvaElfie",
];
async function getRandomImage() {
  randImgs = [];
  var randImgs2 = [];
  async function nextrun() {
    const browser2 = await puppeteer.launch({ headless: true });
    const page2 = await browser2.newPage();
    const redPage = redditPages[getRandomNumbers(redditPages.length - 1)];
    console.log(redPage);
    await page2.goto("http://inline-reddit.com/feed/?subreddit=" + redPage);
    var imgs = null;
    var i = 0;
    // Get the "viewport" of the page, as reported by the page.
    async function lastMessage2() {
      const LatestMessage2 = await page2.evaluate(() => {
        let messageParent2 = document.getElementsByTagName("link");
        const b = [...messageParent2];
        let c = b.map((h) => h.innerHTML);
        let lastmessageText2 = c;
        console.log("LatestMessage run");
        //   console.log("latestMessageNow: " + latestMessageNow);
        console.log("lastmessageText: " + lastmessageText2);

        return lastmessageText2;
      });

      // console.log();
      for (let i = 0; i < LatestMessage2.length; i++) {
        const element = LatestMessage2[i];
        if (element.includes(".jpg") || element.includes(".png")) {
          randImgs.push(element);
          //   console.log("randImgs: " + randImgs);
        }
      }
      console.log("LatestMessage: " + randImgs.length);
      randImgs2 = randImgs;
      browser2.close();
    }

    await lastMessage2();
  }

  await nextrun();
  //   await delay(100);
  //   await randImgs;
  //   console.log(randImgs.length);
  //   console.log("LatestMessage2: " + randImgs2.length);
  return randImgs;
}

// (async function main() {
//   var somss = await getRandomImage();
//   console.log("image: " + somss[getRandomNumbers(somss.length - 1)]);
// })();

function getRandomNumbers(end) {
  return Math.floor(Math.random() * end) + 1;
}

module.exports = { getRandomImage };
