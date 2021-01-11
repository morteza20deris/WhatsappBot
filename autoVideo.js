var randGifs = null;
var lqVideo = null;
var hqVideo = null;

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
    let gifvidlinks = "hqVideo: " + hqVideo + "\n" + "lqVideo: " + lqVideo;
    // } catch (error) {}
  
    return gifvidlinks;
  }