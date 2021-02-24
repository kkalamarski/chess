import fs, { createWriteStream } from "fs";

const GAMES_PER_FILE = 50000;

const data = fs.readFileSync("database.pgn", "utf-8");

const games = data
  .split(",")
  .map((game) => game.replace(/\'/g, ""))
  .map((game) => game.replace(/\n/g, " "))
  //   Remove results
  .map((game) => game.replace("0-1", ""))
  .map((game) => game.replace("1-0", ""))
  .map((game) => game.replace("1/2-1/2", ""))
  // max 15 moves
  .map((game) => game.replace(/16\..*/s, ""))
  .map((game) => game.trim())
  .filter((game) => game.length > 150);

let index = 0;

while (index * GAMES_PER_FILE < games.length) {
  const batch = games.slice(
    index * GAMES_PER_FILE,
    (index + 1) * GAMES_PER_FILE
  );

  fs.writeFile(
    `opening_book${index + 1}.json`,
    JSON.stringify(batch),
    function (err) {
      if (err) return console.log(err);
      console.log("Written games to JSON file!");
    }
  );

  index++;
}
