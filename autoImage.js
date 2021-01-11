const puppeteer = require("puppeteer");
var randImgs = null;
var randGifs = null;
var lqVideo = null;
var hqVideo = null;

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
  "RileyReid",
  "AlettaOcean",
  "MadisonIvy",
  "abelladanger",
  "valentinanappi",
  "LenaPaul",
  "ElsaJean",
  "GabbieCarter",
  "MollyStewart",
  "SkylarVox",
  "lanarhoades",
  "AlinaLopez",
  "StellaCox",
  "LiyaSilver",
  "TessaLane",
  "leahgotti",
  "MiaMalkova",
  "SybilA",
  "BrooklynChase",
  "AdrianaChechik",
  "EvaElfie",
];
async function getRandomImage() {
  randImgs = [];
  randGifs = [];
  // var randImgs2 = [];
  async function nextrun() {
    const browser2 = await puppeteer.launch({ headless: true });
    const page2 = await browser2.newPage();
    const redPage = redditPages[getRandomNumbers(redditPages.length - 1)];
    // const redPage = redditPages[14];
    console.log(redPage);
    await page2.goto("http://inline-reddit.com/feed/?subreddit=" + redPage);
    // var imgs = null;
    // var i = 0;
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
      for (let i1 = 0; i1 < LatestMessage2.length; i1++) {
        const element = LatestMessage2[i1];
        if (element.includes(".jpg") || element.includes(".png")) {
          randImgs.push(element);
          //   console.log("randImgs: " + randImgs);
        } else if (element.includes("redgifs.com")) {
          randGifs.push(element);
        }
      }
      console.log("randImgs: " + randImgs.length);
      console.log("randGifs: " + randGifs.length);
      // randImgs2 = randImgs;
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

function getRandomNumbers(end) {
  return Math.floor(Math.random() * end) + 1;
}
async function getRandomImages() {
  await getRandomImage();
  console.log(randImgs[getRandomNumbers(randImgs.length - 1)]);
  return randImgs[getRandomNumbers(randImgs.length - 1)];
}

async function getRedGifLink(redGiflink) {
  try {
    const redGifBrowser = await puppeteer.launch();
    const redGifPage = await redGifBrowser.newPage();
    await redGifPage.setDefaultNavigationTimeout(0);
    let linktoPagered = redGiflink;
    // await redGifPage.goto("");
    console.log("redPage launched");
    redGifPage.goto(redGiflink);
    // await delay(10000);
    await redGifPage.waitForSelector(".video");
    console.log("redPage Loaded");
    let redGifPageContent;
    // try {
    redGifPageContent = await redGifPage.evaluate(() => {
      try {
        // console.log("redPage evaluated");
        let videolinks = [];
        const videoSource = document.querySelectorAll(
          "source[type='video/mp4']"
        );
        // console.log("videoSource Loaded");
        for (let i = 0; i < videoSource.length; i++) {
          const element2 = videoSource[i].src;
          // const element = videoSource[i];
          // console.log("element Loaded:" + element2);

          videolinks.push(element2);
        }
        return videolinks;
      } catch (error) {}
    });
    // } catch (error) {}
    // console.log("hqLink: " + redGifPageContent);
    for (let i = 0; i < redGifPageContent.length; i++) {
      const element = redGifPageContent[i];
      if (element.includes("mobile")) {
        lqVideo = element;
      } else if (!element.includes("mobile")) {
        hqVideo = element;
      }
      if (hqVideo != null && lqVideo != null) {
        console.log("lqVideo: " + lqVideo + "\n" + "hqVideo: " + hqVideo);

        break;
      }
    }
    // await delay(30000);
    redGifBrowser.close();
  } catch (error) {}
}

async function getRandomGifs() {
  // try {
  await getRandomImage();
  var somss2 = randGifs;
  await getRedGifLink(somss2[getRandomNumbers(somss2.length - 1)]);
  // console.log("hqVideo: " + hqVideo + "\n" + "lqVideo: " + lqVideo);
  let gifvidlinks = "HQVideo: " + hqVideo + "\n" + "LQVideo: " + lqVideo;
  // } catch (error) {}

  return gifvidlinks;
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
// (async function main() {
//   await getRandomGifs();
//   // await getRandomImages();
// })();
module.exports = { getRandomImages, getRandomGifs };
