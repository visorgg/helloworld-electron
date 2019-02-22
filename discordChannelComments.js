const https = require('https');
const fs = require('fs');

const MAX_LOOP_COUNT = 2;

var myArgs = process.argv.slice(2);

const DISCORD_CHANNEL_ID = myArgs[0];
const DISCORD_AUTH_TOKEN = myArgs[1];

function formatMessage(messageFromResponse) {
  return {
    messageId: messageFromResponse.id,
    discordName: messageFromResponse.author.username,
    body: messageFromResponse.content,
  }
}

async function getMessagesFromChannel(channelId, messageId) {
  const options = {
    hostname: "discordapp.com",
    path: !messageId ? `/api/v6/channels/${channelId}/messages` : `/api/v6/channels/${channelId}/messages?before=${messageId}`,
    headers: {
        authorization: DISCORD_AUTH_TOKEN
    }
  }

  return await new Promise(function(resolve, reject) {
    https.get(options, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          const realData = JSON.parse(data);

          if (realData && realData.message && realData.message.includes("401")) {
            reject("Unauthorized!!!");
          } else {
            resolve(JSON.parse(data));
          }
        });

      }).on("error", (err) => {
        reject("Error: " + err.message);
      });
  });
}

async function getAllMessagesFromChannel(channelId) {
  let endReached = false;
  let iter = 0;
  let lastMessageId = null;
  let result = [];

  while(!endReached && iter < MAX_LOOP_COUNT) {
    console.log("Fetching next page of 50...");

    const messages = await getMessagesFromChannel(channelId, lastMessageId);

    if (messages.length) {
      const formattedMessages = messages.map(formatMessage);
      lastMessageId = messages[messages.length - 1].id;

      result = result.concat(formattedMessages);
    } else {
      endReached = true;
    }
    iter++;
  }

  return result;
}

async function run(channelId) {
  let results = [];

  try {
      results = await getAllMessagesFromChannel(channelId);

      const resultAsCSV = results.map(item => `${item.discordName}, ${item.body}`).join("\n");
        fs.writeFile("./discord-messages.csv", resultAsCSV, function(err) {
          if (err) {
              return console.log(err);
          }

          console.log("The file was saved as discord-messages.csv!");
      });
    } catch (error) {
      console.error(error);
      console.error("Please provide your auth token for discord. Found in headers. Use the webapp version and chrome inspector to find this.")
      console.error("Then run: sudo node discordChannelComments.js CHANNEL_ID AUTH_TOKEN")
    }
}

// Input should be channel id
run(DISCORD_CHANNEL_ID);
