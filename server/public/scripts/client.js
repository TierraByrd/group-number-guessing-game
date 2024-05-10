

function onReady() {
  console.log("JavaScript is loaded!")
}


function submitGuess(event){
  event.preventDefault()
  console.log('submit works')


  let guessOne = document.getElementById('guessOne').value
  let guessTwo = document.getElementById('guessTwo').value

  
  
  console.log(guessOne, guessTwo)
  axios({
    method: 'POST',
    url: '/guess',
    data: {
      first: guessOne,
      second: guessTwo
    }
  })
  .then((response)=>{
    console.log('success')
    renderResults()
  })


}

function renderResults(){
  let renderDiv = document.getElementById('resultsDiv')

  axios({
    method: 'GET',
    url: '/guess'
  })
    .then((response)=>{
      console.log(response)

      let guessData = response.data
      console.log(guessData)
      renderDiv.innerHTML = ''
      for (let guess of guessData){
      renderDiv.innerHTML += `
      <div class='player1'> Player 1 Guess: ${guess.firstPlayerGuess} Results: ${guess.playerOneResults} </div>
      <div class='player2'> Player 2 Guess: ${guess.secondPlayerGuess} Results: ${guess.playerTwoResults} </div>`
      }

    })
}


onReady()