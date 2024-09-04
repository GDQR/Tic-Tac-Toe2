import { useState } from 'react'
import crossImage from './assets/cross.png';
import circleImage from './assets/circle.png';
import './App.css'

let player = 1;
let winner = -1;
let gridState = [9];
let countGrid = [0, 0];
let gridPos = [2];

for (let i = 0; i < 2; i++) {
  gridPos[i] = new Array(3);
}

let enumPlayerState = {
  null: 0,
  cross: 1,
  circle: 2
};

for (let i = 0; i < 9; i++) {
  gridState[i] = enumPlayerState.null;
}

function Grid({ value, image, classImg, isVisible, onGridClick }) {
  return (
    <button className='btn-grid' onClick={onGridClick}>
      <img src={image === 0 ? crossImage : circleImage} className={classImg === 0 ? "shapeImage" : classImg === 1? "shapeImageDeleting": "shapeWin"} value={value} alt={image === 0 ? "Cross" : "Circle"} style={{ visibility: isVisible === false ? "hidden" : "visible" }} />
    </button>
  );
}

function PlayerUI({ player1, player2 }) {
  return (
    <div id='playerUI'>
      <div id={player1}>
        Player 1
      </div>
      <div id={player2}>
        Player 2
      </div>
    </div>
  );
}

function finishGame(setPlayer1, setPlayer2,classImages, setClassImages, setResetButton) {
  const winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winPosition.length; i++) {
    const [a, b, c] = winPosition[i];
    if (gridState[a] && gridState[a] === gridState[b] && gridState[a] === gridState[c]) {
      winner = player;
      console.log("winner is " + winner);
      if (winner === 1) {
        setPlayer1("winner");
        setPlayer2("loser");
      } else {
        setPlayer1("loser");
        setPlayer2("winner");
      }

      setClassImages(classImages.map((element, index) =>
        index === a || index === b || index === c ? 2:element
      ));

      
      setResetButton(true);
      
      break;
    }
  }
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
}

function Reset(isVisible, classImages, setVisible, setClassImages, setPlayer1, setPlayer2,setResetButton){
  winner = -1;
  player = 1;
  for (let i = 0; i < 9; i++) {
    gridState[i] = enumPlayerState.null;
  }
  countGrid[0] = 0;
  countGrid[1] = 0;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      gridPos[i][j] = 0;
    }
  }

  setPlayer1("myTurn");
  setPlayer2("stopTurn");

  setClassImages(classImages.map((element) => 0
  ));

  setVisible(isVisible.map((element) =>false));

  setResetButton(false);
}

function App() {
  const [player1, setPlayer1] = useState("myTurn");
  const [player2, setPlayer2] = useState("stopTurn");
  const [showResetButton, setResetButton] = useState(false);
  const [isVisible, setVisible] = useState(Array(9).fill(false));
  const [images, setImage] = useState(Array(9).fill(0));
  const [classImages, setClassImages] = useState(Array(9).fill(0));

  function handleClick(value) {

    if (winner !== -1 || gridState[value] !== enumPlayerState.null) {
      console.log("no soy un grid null");
      return;
    }

    let deleteGrid = -1;
    let actualPLayer = player - 1;

    if (countGrid[actualPLayer] === 3) {
      deleteGrid = gridPos[actualPLayer].shift();
      console.log("player: " + player + " quitar pos: " + deleteGrid);
      gridState[deleteGrid] = enumPlayerState.null;
      countGrid[actualPLayer]--;
    }

    if (player === 1) {
      setImage(images.map((element, index) =>
        index === value ? 0 : element
      ));
      gridState[value] = enumPlayerState.cross;

      setPlayer2("myTurn");
      setPlayer1("stopTurn");
    } else if (player === 2) {
      setImage(images.map((element, index) =>
        index === value ? 1 : element
      ));
      gridState[value] = enumPlayerState.circle;

      setPlayer1("myTurn");
      setPlayer2("stopTurn");
    }

    if (countGrid[actualPLayer] < 3) {
      gridPos[actualPLayer][countGrid[actualPLayer]] = value;
      countGrid[actualPLayer]++;
      console.log("player: " + (actualPLayer + 1) + " count " + countGrid[actualPLayer]);

    }

    setVisible(isVisible.map((element, index) =>
      index === value || index === deleteGrid ? (
        element === false ? true : false
      ) : element
    ));

    finishGame(setPlayer1, setPlayer2,classImages,setClassImages,setResetButton);
    
    if (countGrid[player-1] === 3 && winner === -1) {
      // console.log("pase player:"+player);
      setClassImages(classImages.map((element, index) =>
        index === gridPos[player-1][0] ? 1: 0
      ));
    }
  }

  return (
    <>
      <div id="Title">
        <h1>Tic-Tac-Toe 2</h1> 
      </div>
      <PlayerUI player1={player1} player2={player2}></PlayerUI>
      <Grid value={0} image={images[0]} classImg={classImages[0]} isVisible={isVisible[0]} onGridClick={() => handleClick(0)}></Grid>
      <Grid value={1} image={images[1]} classImg={classImages[1]} isVisible={isVisible[1]} onGridClick={() => handleClick(1)}></Grid>
      <Grid value={2} image={images[2]} classImg={classImages[2]} isVisible={isVisible[2]} onGridClick={() => handleClick(2)}></Grid>
      <br></br>
      <Grid value={3} image={images[3]} classImg={classImages[3]} isVisible={isVisible[3]} onGridClick={() => handleClick(3)}></Grid>
      <Grid value={4} image={images[4]} classImg={classImages[4]} isVisible={isVisible[4]} onGridClick={() => handleClick(4)}></Grid>
      <Grid value={5} image={images[5]} classImg={classImages[5]} isVisible={isVisible[5]} onGridClick={() => handleClick(5)}></Grid>
      <br></br>
      <Grid value={6} image={images[6]} classImg={classImages[6]} isVisible={isVisible[6]} onGridClick={() => handleClick(6)}></Grid>
      <Grid value={7} image={images[7]} classImg={classImages[7]} isVisible={isVisible[7]} onGridClick={() => handleClick(7)}></Grid>
      <Grid value={8} image={images[8]} classImg={classImages[8]} isVisible={isVisible[8]} onGridClick={() => handleClick(8)}></Grid>
      <br />
      <button id="resetButton" onClick={() => Reset(isVisible, classImages, setVisible, setClassImages, setPlayer1, setPlayer2, setResetButton)} style={{ visibility: showResetButton === false? "hidden":"visible"} }>Reset</button>
    </>
  );
}

export default App
