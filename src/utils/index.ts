const messages = [
  "Great job!",
  "Looks great!",
  "Excellent!",
  "There it is!",
  "Nailed it!",
  "Way to go!",
  "Looks good!",
  "Got it!",
  "Nice!",
  "Well done!"
];

export function getRandomMessage() {
  const randomNumber = Math.floor(Math.random() * messages.length);
  return messages[randomNumber];
}

export function minify(str: string) {
  return str
    .trim()
    // strip out comments
    .replace(/\/\/[\s\S]*?\n/g, "")
    // strip out "use strict"
    .replace(/"use strict"|\\"use strict\\"|\s|;/g, "")
    .replace(/'/g, '"');
}