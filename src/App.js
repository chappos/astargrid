import React, { useState, useEffect } from 'react'
import './App.css';
import Grid from './components/Grid.js'
import OptionBar from './components/OptionBar.js'

function App() {
  const gridSize = 10
  const placements = {
    START: 'START',
    END: 'END',
    CLEAR: 'CLEAR',
    BLOCKED: 'BLOCKED'
  }

  //Set up useStates
  const [gridData, setGridData] = useState(generateGridData())
  const [lastClickedCell, setClickedCell] = useState()
  const [currentPlacement, setCurrentPlacement] = useState(placements.START)

  //useEffect for changing lastClickedCell
  useEffect(()=>{
    console.log(lastClickedCell)
  }, [lastClickedCell])

  //Generates a "blank" grid dataset
  function generateGridData(){
    var output = []
    for(var i = 0; i < gridSize; i++){
      var row = []
      output.push(row)
      for(var j = 0; j < gridSize; j++){
        output[i].push({
          'x': i,
          'y': j,
          'f': null,
          'g': null,
          'h': null,
          'parent': null,
          'state' : placements.CLEAR
        })
      }
    }
    return output
  }

  return (
    <div className="App">
      <OptionBar
        placements={placements}
        setCurrentPlacement={setCurrentPlacement}
      />
      <Grid
        gridData={gridData}
        setClicked={setClickedCell}
      />
    </div>
  );
}

export default App;
