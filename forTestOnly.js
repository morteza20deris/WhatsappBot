var latestMessageNo;
async function lastMessage() {
    const LatestMessage = await page.evaluate(() => {
        latestMessageNow = "Hello World";
    });
    var latestMessageNow = "Hello World";
    
    console.log(latestMessageNow)
}
lastMessage();


// latestMessageNow = latestMessageNow.replace(/[0-9]/g, "");
  // latestMessageNow = latestMessageNow.replace(/[a-zA-z]/g, "");
  // latestMessageNow = latestMessageNow.replace(/[&\/\-\#,+()$~%.'":*?<>{}]/g,"");