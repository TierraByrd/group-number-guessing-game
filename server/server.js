const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));

// GET & POST Routes go here
let randomNumber = Math.random() * (25 - 1) + 1;
let winningNumber = randomNumber.toFixed(0);
let guesses = [];
console.log(winningNumber)

function checkGuess(guessInput) {
  let roundGuesses = {};
  roundGuesses.firstPlayerGuess = guessInput.first;
  roundGuesses.secondPlayerGuess = guessInput.second;

  if (guessInput.first == winningNumber) {
    roundGuesses.playerOneResults = "Winner";
  } else if (Number(guessInput.first) > winningNumber) {
    roundGuesses.playerOneResults = "No dice, too high";
  } else if (Number(guessInput.first) < winningNumber) {
    roundGuesses.playerOneResults = "Too low, try again";
  }
  if (guessInput.second == winningNumber) {
    roundGuesses.playerTwoResults = "Winner";
  } else if (Number(guessInput.second) > winningNumber) {
    roundGuesses.playerTwoResults = "No dice, too high";
  } else if (Number(guessInput.second) < winningNumber) {
    roundGuesses.playerTwoResults = "Too low, try again";
  }
  guesses.push(roundGuesses);
}

app.get("/random", (req, res) => {
  let randomNumber = Math.random() * (25 - 1) + 1;
  let winningNumber = randomNumber.toFixed(0);

  res.send(winningNumber)
});

app.get("/guess", (req, res) => {
  res.send(guesses);
});

app.post("/guess", (req, res) => {
  let guessInput = req.body;

  console.log("Got a POST request", guessInput);
  console.log("array guesses", guesses);

  checkGuess(guessInput);

  console.log("array guesses after pushing roundGuesses", guesses);

  res.sendStatus(201);
});

// app.get('/random', (req, res)=>){
//   console.log('in/random')
//   res.send(randomData)
// }

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
