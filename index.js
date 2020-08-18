const tmi = require("tmi.js");
const fs = require("fs");
const options = require("./options");

// Cooldown

let block = false;

//Connect to twitch server
const client = new tmi.client(options);
client.connect();

// client.on("connected", (address, port) => {
//   client.action("nnnicolez", "Hello fellow humans, your emperor is here.");
// });

client.on("message", onMessageHandler);

// setInterval(say_msg, sayInterval * 1000);

function onMessageHandler(channel, userstate, message, self) {
  // Ignore messages from bots
  if (self) {
    return;
  }

  if (userstate.username === "nightbot") {
    return;
  }

  if (userstate.username === "pretzelrocks") {
    return;
  }

  // Create a txt file with chat messages
  var logger = fs.createWriteStream("log.txt", {
    flags: "a", // 'a' means appending (old data will be preserved)
  });

  logger.write(`${message} \n`);

  // Remove whitespace from chat message
  const commandName = message.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = rollDice();
    client.say(channel, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }
  //  else {
  //   console.log(`* Unknown command ${commandName}`);
  // }

  // nnnicobot <3
  if (message === "nnnicobot") {
    client.say(channel, `Yes, @${userstate.username}?`);
  }

  // Party!
  if (message === "!party") {
    client.say(
      channel,
      "ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD ppJedi pepeD "
    );
  }

  // Win chance
  if (message === "!odds") {
    client.say(
      channel,
      `The current odds of nnnicolez win is ${Math.floor(
        Math.random() * 101
      )} % ppJedi`
    );
  }

  // Timeout for links

  if (
    message.includes("http") ||
    message.includes("https") ||
    message.includes("http")
  ) {
    client.say(
      channel,
      `Links are not allowed ${userstate.username}, ask a mod for more info.`
    );
  }

  // Emote repeater
  if (message === "catJAM") {
    client.say(channel, "catJAM");
  }

  if (message === "KEKW") {
    client.say(channel, "KEKW");
  }

  if (message === "poop") {
    client.say(channel, "poop Clap");
  }

  if (message === "pepeLaugh") {
    client.say(channel, "Don't tell her pepeLaugh");
  }

  // Markov
  function say_msg() {
    let msg = randomTextArr();
    console.log(msg);
    return msg;
  }

  if (message === "!nnnicobot") {
    if (!block) {
      client.say(channel, say_msg());
      block = true;
      setTimeout(() => {
        block = false;
      }, 30 * 1000);
    }

    // if (block) {
    //   client.say(
    //     channel,
    //     `Markov is resting, try again later ${userstate.username} ppJedi`
    //   );
    // }
  }

  // Greeting
  if (
    message.includes("Hello ") ||
    message.includes("Hey ") ||
    message.includes("Hi ")
  ) {
    client.say(channel, `Hello @${userstate.username} catJAM`);
  }

  // 8Ball
  if (message.includes("!8ball")) {
    client.say(channel, eightBall());
  }

  // Poo
  if (message === "!poo") {
    client.say(channel, `peepoFinger @${userstate.username}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// 8Ball Function
function eightBall() {
  const eightBallArray = [
    "Most likely catJAM",
    "Nope KEKW",
    "Of course widepeepoHappy",
    "Sure...sure... OMEGALUL",
  ];

  return eightBallArray[Math.floor(Math.random() * eightBallArray.length)];
}

// Markov Function
let text = fs.readFileSync("./log.txt", "utf-8");

let textArr = text.split("\n");

function randomTextArr() {
  let randomTextArray = [];

  for (let i = 1; i < 10; i++) {
    randomTextArray.push(textArr[Math.floor(Math.random() * textArr.length)]);
  }

  let randomTextStr = randomTextArray.join(" ");

  let randomTextStrFormatted = randomTextStr
    .trim()
    .replace(/!chain/g, "")
    .replace(/!8ball/g, "")
    .replace(/!dice/g, "")
    .replace(/!pee/g, "")
    .replace(/nnnicobot/g, "")
    .replace(/!chin/g, "")
    .replace(/!chai/g, "")
    .replace(/!chan/g, "")
    .replace(/!poo/g, "")
    .replace(/!odds/g, "")
    .replace(/!merch/g, "")
    .replace(/!ban/g, "")
    .replace(/nnnicolez is now live! Streaming/g, "")
    .replace(/moon2/g, "")
    .replace(/FINAL_STATE/g, "")
    .replace(/now playing/g, "");

  return randomTextStrFormatted;
}
