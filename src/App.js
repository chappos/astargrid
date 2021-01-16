import React, { useState, useEffect } from 'react'
import './App.css';
import Grid from './components/Grid.js'

function App() {
  const gridSize = 10
  const [gridData, setGridData] = useState(generateGridData())
  const [lastClickedCell, setClickedCell] = useState()

  //UseEffect for changing lastClickedCell
  useEffect(()=>{
    console.log(lastClickedCell)
  }, [lastClickedCell])

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
          'state' : "CLEAR"
        })
      }
    }
    return output
  }

  return (
    <div className="App">
      <Grid
        gridData={gridData}
        setClicked={setClickedCell}
      />
    </div>
  );
}

export default App;
